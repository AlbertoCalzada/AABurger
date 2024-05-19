import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../../server/models/user.model';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../../server/db';

const handler = NextAuth({
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }), CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            username: { label: "Username", type: "text", placeholder: "Usuario" },
            password: { label: "Password", type: "password" , placeholder: "Contraseña"}
        },
        async authorize(credentials, req) {
            try {

                 // Conectar a la base de datos
                 await connectDB();
                 
                // Buscar al usuario en la base de datos por su nombre de usuario
                const user = await User.findOne({ username: credentials.username });
                console.log(user)
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
    ]
})

export { handler as GET, handler as POST }

