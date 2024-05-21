import { NextResponse } from 'next/server';
import { connectDB } from '../../../../server/db';
import User from '../../../../server/models/user.model';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { email } = await request.json();

        await connectDB();

        // Validar que req.body.email existe
        if (!email) {
            return NextResponse.json({ message: 'Correo electrónico requerido.' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Correo electrónico no encontrado.' }, { status: 404 });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

        await user.save();

        const resetUrl = `${process.env.NEXTAUTH_URL}/resetPassword?token=${token}`;


        const htmlContent = `
            <p>Hola,</p>
            <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <p><a href="${resetUrl}">Restablecer contraseña</a></p>
            <p>Si no solicitaste esto, ignora este correo.</p>
        `;

        await resend.emails.send({
            from: 'A&A Burguer <onboarding@resend.dev>',
            to: email,
            subject: 'Restablecimiento de contraseña',
           html: htmlContent 
        });

        return NextResponse.json({ message: 'Correo de restablecimiento enviado.' });
    } catch (error) {
        console.error('Error processing password reset request:', error);
        return NextResponse.json({ message: 'Ha ocurrido un error, por favor inténtelo de nuevo.' }, { status: 500 });
    }
}
