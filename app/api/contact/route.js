import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer';


export async function POST(request) {
    try {
      const body = await request.json();
      //console.log("body", body);
  
      const { email, name, message } = body;
  

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


      let mailOptions = {
        from: `"A&A Burguer" <${process.env.SMTP_USER}>`, 
        to: 'albertosburguer@gmail.com', 
        subject: 'Consultas A&A Burguer', 
        html: `
          <div>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Correo:</strong> ${email}</p>
            <p><strong>Mensaje:</strong> ${message}</p>
          </div>
        `, 
      };
  
      let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ message: 'Email Successfully Sent!' });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: 'Error al enviar el correo electrónico' });
  }
}