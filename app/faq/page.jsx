"use client";

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: '¿Cuál es el horario de atención?',
    answer: 'Estamos abiertos de lunes a viernes de 9:00 a 18:00 y los sábados de 10:00 a 14:00.',
  },
  {
    question: '¿Dónde están ubicados?',
    answer: 'Nuestra tienda principal está ubicada en la Calle Falsa 123, Ciudad Ejemplo.',
  },
  {
    question: '¿Ofrecen servicio de entrega a domicilio?',
    answer: 'Sí, ofrecemos servicio de entrega a domicilio en un radio de 10 km desde nuestra ubicación.',
  },
  {
    question: '¿Cómo puedo hacer una reserva?',
    answer: 'Puedes hacer una reserva a través de nuestro sitio web o llamándonos al 555-1234.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito, débito, PayPal y pagos en efectivo.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="text-gray-600 body-font relative"
      style={{ backgroundImage: "url('/img/burger_background.jpg')" }}
    >
      <div className="container px-5 py-24 mx-auto flex md:flex-row flex-col items-center">
        <div className="lg:pr-12 md:w-full mb-10 md:mb-0">
          <div className="bg-gray-800 bg-opacity-40 rounded-lg p-8">
            <h2 className="text-gray-100 text-4xl mb-4 font-bold title-font text-center">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-100 lg:w-2/3 mx-auto leading-relaxed text-center">
              Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros servicios.
            </p>
            <div className="lg:w-2/3 w-full mx-auto px-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b-2 border-gray-200 py-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h2 className="text-lg font-medium text-gray-600">{faq.question}</h2>
                <div>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-gray-600" />
                  ) : (
                    <FaChevronDown className="text-gray-600" />
                  )}
                </div>
              </div>
              {activeIndex === index && (
                <div className="mt-2 text-gray-100">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default FAQ;

