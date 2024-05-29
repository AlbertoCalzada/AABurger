import EmailTemplate from '../../../components/emailReserves.jsx';
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer';



export async function POST(request) {
  try {
    const body = await request.json();
    console.log("body", body)

    const { email, name, time, date, peopleCount } = body;

    // Configuración del transportador SMTP
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465', 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailContent = EmailTemplate({ name, time, date, peopleCount });

    let mailOptions = {
      from: `"A&A Burguer" <${process.env.SMTP_USER}>`, 
      to: email, 
      subject: '¡Tu reserva ha sido confirmada!',
      html: emailContent, 
    };

    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ message: 'Email Successfully Sent!' });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: 'Error al enviar el correo electrónico' });
  }
}
