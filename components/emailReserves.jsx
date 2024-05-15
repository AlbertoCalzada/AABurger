import React from 'react';

const EmailTemplate = ({ name, time, date, peopleCount }) => {
  return (
    <div>
      <h1>Muchas gracias por tu reserva, {name}!</h1>
      <p>Tu reserva:</p>
      <p>Fecha: {date}</p>
      <p>Hora: {time}</p>
      <p>Número de personas: {peopleCount}</p>
      <p>¡Esperamos verte pronto!</p>
    </div>
  );
};

export default EmailTemplate;
