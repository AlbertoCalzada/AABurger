import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-1/2 lg:pr-10 md:w-full">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            ¿Quiénes somos?
          </h2>
          <div className="text-gray-600 body-font mb-6" style={{ textAlign: "justify" }}>
            <p className="mb-6">
              Había una vez dos amigos llamados Alberto, ambos apasionados por la comida, en particular por las hamburguesas. Desde que eran jóvenes, compartían la misma fascinación por este plato tan versátil y delicioso. Juntos, recorrieron gran parte del mundo, desde los bulliciosos puestos callejeros de Nueva York hasta los restaurantes boutique de Tokio, probando cada variante y buscando la hamburguesa perfecta.
            </p>
            <p className="mb-6">
              Después de años de exploración gastronómica, los dos Albertos regresaron a su ciudad natal, Madrid, con una misión clara en mente: abrir su propia hamburguesería. Estaban decididos a compartir su pasión por las hamburguesas con su comunidad y ofrecer la mejor calidad posible.
            </p>
            <p className="mb-6">
              Con meticulosidad y dedicación, los dos amigos empezaron a planificar su negocio. Investigaron a fondo cada aspecto, desde la selección de ingredientes frescos y locales hasta el diseño del menú que reflejara su amor por la comida. Se comprometieron a utilizar solo los mejores cortes de carne, combinados con ingredientes frescos y salsas caseras para crear sabores únicos y deliciosos.
            </p>
            <p className="mb-6">
              Después de meses de arduo trabajo y planificación, finalmente abrieron las puertas de su hamburguesería en el corazón de Madrid. El lugar estaba decorado con un estilo moderno y acogedor, con detalles que recordaban a sus viajes culinarios alrededor del mundo.
            </p>
            <p>
              ¡Te invitamos a seguir las próximas aventuras culinarias en nuestras redes sociales!
            </p>
          </div>
        </div> 
        <div className="lg:w-1/2 lg:h-auto h-64 relative">
          <Image alt="albertos" src="/img/aboutus_profile.jpg" width={500} height={500}  />
        </div>
      </div>
    </section>
  );
}
