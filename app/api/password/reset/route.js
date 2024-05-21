import { NextResponse } from 'next/server';
import { connectDB } from '../../../../server/db';
import User from '../../../../server/models/user.model';
import ResetToken from '../../../../server/models/resetToken.model.js';
import bcrypt from 'bcryptjs';
export async function POST(request) {
    try {
        const { token, password } = await request.json();
        console.log('Received token and password:', token, password);

        await connectDB();

        // Busca el token de restablecimiento en la base de datos
        const resetToken = await ResetToken.findOne({ 
            token: token,
            expiresAt: { $gt: new Date() } // Verifica si el token no ha expirado
        });

        if (!resetToken) {
            console.log('Invalid or expired token');
            return NextResponse.json({ message: 'El token de restablecimiento de contraseña es inválido o ha expirado.' }, { status: 400 });
        }

        // Encuentra el usuario asociado al token
        const user = await User.findById(resetToken.userId);
        if (!user) {
            console.log('User not found');
            return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
        }

        // Actualiza la contraseña del usuario y elimina el token de restablecimiento de la base de datos
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        await ResetToken.deleteOne({ _id: resetToken._id });

        return NextResponse.json({ message: 'Contraseña restablecida exitosamente.' });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Ha ocurrido un error, por favor intente nuevamente.' }, { status: 500 });
    }
}