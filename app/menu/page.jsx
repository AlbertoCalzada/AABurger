import React from 'react';
import Image from 'next/image';

const MenuSection = ({ title, description, items }) => (
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-10">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 tracking-widest">{title}</h1>
      <p className="text-lg text-gray-700 mb-8">{description}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <div key={item.id} className="relative overflow-hidden rounded-lg group">
            <div className="w-full h-full relative overflow-hidden" style={{ paddingBottom: '75%' }}>
            <Image
              className="object-cover object-center w-full h-full transition-transform duration-300 transform group-hover:scale-105"
              src={`/img/menu/${item.image}`}
              alt={item.alt}
              fill
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            </div>
          </div>
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-gray-900 to-transparent p-4 w-full opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-white">
              <p className="text-lg font-medium mb-1">{item.name}</p>
              <p className="text-sm mb-2">{item.description}</p>
              <p className="text-lg font-bold italic">{item.price.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


export default function Menu() { 
  const Entrantes = [
    {
      id: 1,
      image: 'alitas_bbq.jpg',
      alt: 'alitas-bbq',
      name: 'Alitas BBQ',
      description: 'Cocinadas a baja temperatura durante 12 horas para que se desagan en tu boca.',
      price: 8.90,
    },
    {
      id: 2,
      image: 'nachos.jpg',
      alt: 'nachos',
      name: 'Nachetes',
      description: 'Totopos caseros, pico de gallo, guacamole, crema agria y nuestra jugoso pull-pork.',
      price: 9.50,
    },
    {
      id: 3,
      image: 'aros_cebolla.jpg',
      alt: 'aros-de-cebolla',
      name: 'Aros de Cebolla',
      description: 'La perfección hecha aro rebozado, crujientes y dorados.',
      price: 7.90,
    },
  ];
  
  const Burgers = [
    {
      id: 5,
      image: 'cuarto_libra.jpg',
      alt: 'cuarto-libra',
      name: 'Cuarto de mi vida',
      description: 'La versión mejorada de la mítica cheeseburger: Queso, pepinillo, cebolla cruda, ketchup y mostaza.',
      price: 10.90,
    },
    {
      id: 6,
      image: 'pullpork_crispy.jpg',
      alt: 'Pullpork-Crispy',
      name: 'Pullpork Crispy',
      description: 'Crujiente sabor en cada bocado, para los amantes del cerdo: Cebolla crispy, queso, cebolla morada, pullpork, carne, lechuga y mayonesa.',
      price: 11.90,
    },
    {
      id: 7,
      image: 'rib_burger.jpg',
      alt: 'Costilla-Burger',
      name: 'Costi-Burger',
      description: 'Amantes de las costillas estais de suerte: Nuestra salsa BBQ, bacon y costilla deshuesada marinada.',
      price: 13.90,
    },
    {
      id: 8,
      image: 'onionring_burger.jpg',
      alt: 'OnionRing-Burger',
      name: 'Onion Rings Burger',
      description: 'Solo te puedo decir: Jugosos aros de cebollas junto con nuestra salsa BBQ y salsa de mayo chipotle.',
      price: 12.90,
    },
    {
      id: 9,
      image: 'royaldeluxe.jpg',
      alt: 'Royal-Deluxe',
      name: 'Royal Deluxe',
      description: 'Perfecta a la par que sencilla: Tomate, queso, bacon, lechuga y salsa mayonesa',
      price: 10.90,
    },
    {
      id: 10,
      image: 'ladelmes.jpg',
      alt: 'La-del-mes',
      name: 'La del MES',
      description: 'Burger sorpresa cada mes, para descubrirla tendras que mirar en nuestras redes sociales.',
      price: 11.50,
    },
  ];
  
  const Postres = [
    {
      id: 11,
      image: 'tarta_queso.jpg',
      alt: 'tarta-queso',
      name: 'Tarta de Queso',
      description: 'Tarta de queso con mermelada de fresa.',
      price: 4.90,
    },
    {
      id: 12,
      image: 'tarta_pistacho.jpg',
      alt: 'tarta-pistacho',
      name: 'Tarta de Pistacho',
      description: 'Tarta de pistacho.',
      price: 4.90,
    },
    {
      id: 13,
      image: 'tarta_chocolate.jpg',
      alt: 'tarta-chocolate',
      name: 'Tarta de Chocolate',
      description: 'Tarta de chocolate.',
      price: 4.90,
    },
  ];
  return (
    <section className="text-gray-600 body-font relative" style={{ backgroundImage: "url('/img/burger_background.jpg')" }}>
      <MenuSection title="ENTRANTES" description="El inicio perfecto para una experiencia única" items={Entrantes} />
      <MenuSection title="BURGERS" description="Donde la magia se hace realidad en cada bocado" items={Burgers} />
      <MenuSection title="POSTRES" description="El final feliz mas dulce" items={Postres} />
    </section>
  );
}