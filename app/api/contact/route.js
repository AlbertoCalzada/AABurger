import { Resend } from 'resend';
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(request) {
    try {
      const body = await request.json();
      //console.log("body", body);
  
      const { email, name, message } = body;
  
      const data = await resend.emails.send({
        from: 'A&A Burguer <noreply@albertosburguer.com>',
        to: 'albertocalzadaglez97@gmail.com', 
        subject: 'Consultas A&A Burguer',
        react: (
          <div>
            <p><strong>Nombre:</strong> {name}</p>
            <p><strong>Correo:</strong> {email}</p>
            <p><strong>Mensaje:</strong> {message}</p>
          </div>
        ),
      });
  
      if (data.status === 'success') {
        return NextResponse.json({ message: 'Email Successfully Sent!' });
      }
  
      return NextResponse.json(data);
    } catch (error) {
      console.log('error', error);
      return NextResponse.json({ error: 'Error al enviar el correo electrónico' });
    }
  }