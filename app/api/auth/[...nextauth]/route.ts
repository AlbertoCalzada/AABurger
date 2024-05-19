import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../../server/models/user.model';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../../server/db';



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
                try {
                    // Conectar a la base de datos
                    await connectDB();
                    
                    // Buscar al usuario en la base de datos por su nombre de usuario
                    const user = await User.findOne({ username: credentials.username });
                    
                    if (!user) {
                        throw new Error('Usuario no encontrado');
                    }
            
                    // Verificar la contraseña
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            
                    if (!isPasswordValid) {
                        throw new Error('Contraseña incorrecta');
                    }
            
                    // Si las credenciales son válidas, devolver los datos del usuario
                    return {
                        id: user._id,
                        name: user.username,
                        email: user.email
                    };
                } catch (error) {
                    // Manejar errores de autenticación
                    console.error('Error en la autenticación:', error.message);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({user}) {
            try {
                // Verificar si el usuario ya existe en la base de datos
                await connectDB();

                const existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    
                    await new User({
                        email: user.email,
                       
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