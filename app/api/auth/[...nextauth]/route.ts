import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../../server/models/user.model';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../../server/db';
import { v4 as uuidv4 } from 'uuid'; // Para generar un UUID único

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            // The name to display on the sign in form
            name: "credentials",
            // Credentials form fields
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Usuario" },
                password: { label: "Password", type: "password", placeholder: "Contraseña" }
            },
            async authorize(credentials, req) {
                
                    // Conectar a la base de datos
                    await connectDB();
                    
                    // Buscar al usuario en la base de datos por su nombre de usuario
                    const user = await User.findOne({ username: credentials.username });
                    
                    if (!user) {
                        throw new Error(JSON.stringify({ statusCode: 404, message: 'Usuario no encontrado' }));
                    }
            
                    // Verificar la contraseña
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            
                    if (!isPasswordValid) {
                        throw new Error(JSON.stringify({ statusCode: 401, message: 'Contraseña incorrecta' }));
                    }
            
                    // Si las credenciales son válidas, devolver los datos del usuario
                    return {
                        id: user._id,
                        name: user.username,
                        email: user.email
                    };
                
            }
        })
    ],
    callbacks: {
        async signIn({user}) {
            try {
                // Verificar si el usuario ya existe en la base de datos
                await connectDB();

                let existingUser = await User.findOne({ email: user.email });
                
                if (!existingUser) {
                    const username = user.email.split('@')[0]; // Usar la parte antes de @ como nombre de usuario
                    const password = uuidv4(); // Generar una contraseña aleatoria

                    existingUser = await new User({
                        email: user.email,
                        username: username,
                        password: await bcrypt.hash(password, 10), // Encriptar la contraseña generada
                        role: "user"
                    }).save();
                }
                return true; 
            } catch (error) {
                console.error('Error al crear el usuario:', error.message);
                return false; // Denegar 
            }
        }
    }
});

export { handler as GET, handler as POST };