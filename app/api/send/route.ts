import EmailTemplate from '../../../components/emailReserves.jsx';
import { Resend } from 'resend';



export async function handleReservationEmail(formData: any) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [formData.email],
      subject: 'Hello world',
      react: EmailTemplate(formData), // Llama a la función EmailTemplate y pasa los datos directamente
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
