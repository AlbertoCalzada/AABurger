import { NextResponse } from 'next/server';
import { connectDB } from '../../../../server/db';
import User from '../../../../server/models/user.model';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { token, password } = await request.json();
        console.log('Received token and password:', token, password);

        await connectDB();

        const user = await User.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            console.log('Invalid or expired token');
            return NextResponse.json({ message: 'El token de restablecimiento de contraseña es inválido o ha expirado.' }, { status: 400 });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return NextResponse.json({ message: 'Contraseña restablecida exitosamente.' });
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.json({ message: 'Ha ocurrido un error, por favor intente nuevamente.' }, { status: 500 });
    }
}
