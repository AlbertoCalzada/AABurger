import EmailTemplate from '../../../components/emailReserves.jsx';
import { Resend } from 'resend';
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("body", body)

    const { email, name, time, date, peopleCount } = body;

    const data = await resend.emails.send({
      from: 'A&A Burguer <onboarding@resend.dev>',
      to: email,
      subject: '¡Tu reserva ha sido confirmada!',
      react: EmailTemplate({ name, time, date, peopleCount }),

    });

    if (data.status === 'success') {
      return NextResponse.json({ message: 'Email Successfully Sent!' })
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log('error', error)

  }
}
