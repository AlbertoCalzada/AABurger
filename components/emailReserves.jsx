import React from 'react';

const EmailTemplate = ({ name, time, date, peopleCount }) => {
    return (
      <div>
        <h1>Muchas gracias por tu reserva, {name}!</h1>
        <p>Your reservation details:</p>
        <p>Date: {time}</p>
        <p>Time: {date}</p>
        <p>Number of People: {peopleCount}</p>
        <p>We look forward to seeing you!</p>
      </div>
    );
  };
  
  export default EmailTemplate;
  
