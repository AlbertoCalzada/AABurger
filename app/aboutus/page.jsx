import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <section className="text-gray-600 body-font relative" style={{ backgroundImage: "url('/img/burger_background.jpg')" }}>
      <div className="container px-5 py-24 mx-auto flex md:flex-row flex-col items-center">
        <div className="lg:w-1/2 lg:pr-12 md:w-full mb-10 md:mb-0">
          <div className="bg-gray-800 bg-opacity-40 rounded-lg p-8">
            <h2 className="text-gray-100 text-4xl mb-4 font-bold title-font">
              ¿Quiénes somos?
            </h2>
            <div className="text-gray-100 text-lg leading-relaxed text-justify mb-8">
              <p className="mb-4">
                Había una vez dos amigos llamados Alberto, ambos apasionados por la comida, en particular por las hamburguesas. Desde que eran jóvenes, compartían la misma fascinación por este plato tan versátil y delicioso. Juntos, recorrieron gran parte del mundo, desde los bulliciosos puestos callejeros de Nueva York hasta los restaurantes boutique de Tokio, probando cada variante y buscando la hamburguesa perfecta.
              </p>
              <p className="mb-4">
                Después de años de exploración gastronómica, los dos Albertos regresaron a su ciudad natal, Madrid, con una misión clara en mente: abrir su propia hamburguesería. Estaban decididos a compartir su pasión por las hamburguesas con su comunidad y ofrecer la mejor calidad posible.
              </p>
              <p className="mb-4">
                Con meticulosidad y dedicación, los dos amigos empezaron a planificar su negocio. Investigaron a fondo cada aspecto, desde la selección de ingredientes frescos y locales hasta el diseño del menú que reflejara su amor por la comida. Se comprometieron a utilizar solo los mejores cortes de carne, combinados con ingredientes frescos y salsas caseras para crear sabores únicos y deliciosos.
              </p>
              <p className="mb-4">
                Después de meses de arduo trabajo y planificación, finalmente abrieron las puertas de su hamburguesería en el corazón de Madrid. El lugar estaba decorado con un estilo moderno y acogedor, con detalles que recordaban a sus viajes culinarios alrededor del mundo.
              </p>
              <p>
                ¡Te invitamos a seguir las próximas aventuras culinarias en nuestras redes sociales!
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full mt-10 md:mt-0">
          <div className="relative h-96 w-full rounded-lg shadow-xl overflow-hidden">
            <Image
              alt="albertos"
              src="/img/aboutus_profile.jpg"
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
