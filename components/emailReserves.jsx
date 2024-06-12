import React from 'react';

const EmailTemplate = ({ name, time, date, peopleCount }) => {
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <h1 style="color: #ff6347; text-align: center;">¡Muchas gracias por tu reserva, ${name}!</h1>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <p style="font-size: 18px; color: #333;">Tu reserva:</p>
        <p style="font-size: 16px; color: #333;"><strong>Fecha:</strong> ${date}</p>
        <p style="font-size: 16px; color: #333;"><strong>Hora:</strong> ${time}</p>
        <p style="font-size: 16px; color: #333;"><strong>Número de personas:</strong> ${peopleCount}</p>
        <p style="font-size: 16px; color: #333;">¡Esperamos verte pronto!</p>
      </div>
    </div>
  `;

  return emailContent;
};


export default EmailTemplate;
