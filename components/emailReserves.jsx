import React from 'react';

const EmailTemplate = ({ name, time, date, peopleCount }) => {
  return (
    <div>
      <h1 style={{color: 'black'}}>Muchas gracias por tu reserva, {name}!</h1>
      <p>Tu reserva:</p>
      <p><span style={{color: 'black'}}>Fecha:</span> {date}</p>
      <p><span style={{color: 'black'}}>Hora:</span> {time}</p>
      <p><span style={{color: 'black'}}>Número de personas:</span> {peopleCount}</p>
      <p><span style={{color: 'black'}}>¡Esperamos verte pronto!</span></p>
    </div>
  );
};


export default EmailTemplate;
