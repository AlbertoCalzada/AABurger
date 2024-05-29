"use client";

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: '¿Cuál es el horario de atención?',
    answer: 'Estamos abiertos de lunes a domingo de 13 a 16 horas en horario de comida y 20 a 24 horas en turno de cenas.',
  },
  {
    question: '¿Dónde están ubicados?',
    answer: 'Nuestra tienda principal está ubicada en la Gta. de Bilbao, 4, Chamberí, 28004 Madrid.',
  },
  {
    question: '¿Ofrecen servicio de entrega a domicilio?',
    answer: 'Sí, ofrecemos servicio de entrega a domicilio en un radio de 10 km desde nuestra ubicación.',
  },
  {
    question: '¿Cómo puedo hacer una reserva?',
    answer: 'Puedes hacer una reserva a través de nuestro sitio web o llamándonos al 608 08 07 06.',
  },
  {
    question: '¿Cómo puedo reservar "La Guarida"?',
    answer: 'Para poder disfrutar de nuestro espacio VIP se tiene que reservar por teléfono, dispondrás durante todo el turno de comida o cena, para un máximo de 10 personas y un coste de reserva de 150€ que de descontarán luego del ticket.',
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
          <div className="bg-gray-600 bg-opacity-40 rounded-lg p-8">
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
                <h2 className="text-lg font-medium text-gray-600 font-bold">{faq.question}</h2>
                <div>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-gray-600" />
                  ) : (
                    <FaChevronDown className="text-gray-600" />
                  )}
                </div>
              </div>
              {activeIndex === index && (
                <div className="mt-2 text-gray-100 font-bold italic">
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

