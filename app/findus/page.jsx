import React from "react";

export default function FindUs() {
  return (
    <section className="text-gray-600 body-font relative" style={{ backgroundImage: "url('/img/burger_background.jpg')" }}>
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.071368515844!2d-3.7045633248492864!3d40.42941855486839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42288a134ba483%3A0xbe3f43fb322d5875!2sGta.%20de%20Bilbao%2C%204%2C%20Chamber%C3%AD%2C%2028004%20Madrid!5e0!3m2!1ses!2ses!4v1715013766383!5m2!1ses!2ses"
            width="100%"
            height="100%"
            className="absolute inset-0"
            title="map"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="bg-white bg-opacity-75 relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                DIRECCIÓN
              </h2>
              <p className="mt-1">
                Gta. de Bilbao, 4, Chamberí, 28004 Madrid
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                EMAIL
              </h2>
              <a
                href="mailto:info@a&aburger.com"
                className="text-indigo-500 leading-relaxed"
              >
                info@a&aburger.com
              </a>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                TELÉFONO
              </h2>
              <p className="leading-relaxed">608 08 07 06</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 bg-white bg-gray-800 bg-opacity-40 rounded-lg p-8 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-8 rounded-lg">
          <h2 className="text-gray-100 text-2xl mb-4 font-bold title-font">
            ¿Dónde nos puedes encontrar?
          </h2>
          <div className="relative mb-4">
            <div className="text-gray-100 text-lg leading-relaxed text-justify mb-8">
              <p className="mb-6">
                ¡Bienvenidos a nuestro local de hamburguesas en Madrid!
              </p>
              <p className="mb-6">
                Ubicado estratégicamente en el corazón de la capital española, en la Glorieta de Bilbao, 4, nos encontramos en una zona central y vibrante de la ciudad. En este barrio lleno de vida, nuestro restaurante es un oasis para los amantes de las hamburguesas y la buena comida.
              </p>
              <p className="mb-6">
                Nuestra ubicación no solo ofrece comodidad y accesibilidad, sino que también permite a nuestros clientes sumergirse en la energía única de Madrid mientras disfrutan de una deliciosa comida.
              </p>
              <p className="mb-6">
                Con una sala principal espaciosa que abarca 140 metros cuadrados, ofrecemos un ambiente acogedor y relajado para que te sientas como en casa mientras saboreas nuestras hamburguesas artesanales y otras delicias de nuestro menú.
              </p>
              <p className="mb-6">
                Además, contamos con un espacio exclusivo: La Guarida. Esta sala privada ofrece un ambiente íntimo y exclusivo para grupos de hasta 10 comensales. Perfecta para celebraciones especiales o reuniones privadas, La Guarida garantiza una experiencia gastronómica inolvidable en un entorno único.
              </p>
              <p className="mb-6">
                En nuestro local de hamburguesas, nos esforzamos por ofrecer no solo excelencia en comida, sino también un ambiente cálido y acogedor donde cada cliente se sienta bienvenido y atendido.
              </p>
              <p>
                ¡Te invitamos a vivir una experiencia única en nuestro local de hamburguesas en Madrid!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
