import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Menu() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">ENTRANTES</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">El inicio perfecto para una experiencia única</p>
        </div>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/alitas_bbq.jpg" alt="alitas-bbq" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Alitas BBQ</h2>
                <p className="mb-4">Cocinadas a baja temperatura durante 12 horas para que se desagan en tu boca.</p>
                <h3 className="mb-2 italic">8.90 €</h3>             
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/nachos.jpg" alt="nachos" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Nachetes</h2>
                <p className="mb-4">Totopos caseros, pico de gallo, guacamole, crema agria y nuestra jugoso pull-pork.</p>
                <h3 className="mb-2 italic">9.50 €</h3>                  
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/aros_cebolla.jpg" alt="aros-de-cebolla" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Aros de Cebolla</h2>
                <p className="mb-4">La perfección hecha aro rebozado, crujientes y dorados.</p>   
                <h3 className="mb-2 italic">7.90 €</h3>               
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/steak_tartar.jpg" alt="steak-tartar" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Steak Tartar</h2>
                <p className="mb-4">Cuando estas tan orgullo de la carne de tu burger que eres capaz de servirlo en tartar de entrante</p>     
                <h3 className="mb-2 italic">10.90 €</h3>             
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
                 <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">BURGERS</h1>
                 <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Donde la magía se hace realidad en cada bocado</p>
            </div>
            <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/cuarto_libra.jpg" alt="cuarto-libra" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Cuarto de mi vida</h2>
                <p className="mb-4">La versión mejorada de la mítica cheeseburger: Queso, pepinillo, cebolla cruda, ketchup y mostaza.</p> 
                <h3 className="mb-2 italic">10.90 €</h3>               
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/pullpork_crispy.jpg" alt="Pullpork-Crispy" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Pullpork Crispy</h2>
                <p className="mb-4">Crujiente sabor en cada bocado, para los amantes del cerdo: Cebolla crispy, queso, cebolla morada, pullpork, carne, lechuga y mayonesa.</p> 
                <h3 className="mb-2 italic">11.90 €</h3>                
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/rib_burger.jpg" alt="Costilla-Burger" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Costi-Burger</h2>
                <p className="mb-4">Amantes de las costillas estais de suerte: Nuestra salsa BBQ, bacon y costilla deshuesada marinada.</p>     
                <h3 className="mb-2 italic">13.90 €</h3>            
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/onionring_burger.jpg" alt="OnionRing-Burger" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Onion Rings Burger</h2>
                <p className="mb-4">Solo te puedo decir: Jugosos aros de cebollas junto con nuestra salsa BBQ y salsa de mayo chipotle.</p> 
                <h3 className="mb-2 italic">12.90 €</h3>                
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/royaldeluxe.jpg" alt="Royal-Deluxe" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Royal Deluxe</h2>
                <p className="mb-4">Perfecta a la par que sencilla: Tomate, queso, bacon, lechuga y salsa mayonesa</p>     
                <h3 className="mb-2 italic">10.90 €</h3>            
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/ladelmes.jpg" alt="La-del-mes" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">La del MES</h2>
                <p className="mb-4">Burger sorpresa cada mes, para descubrirla tendras que mirar en nuestras redes sociales.</p> 
                <h3 className="mb-2 italic">11.50 €</h3>                
              </div>
            </div>
          </div>
          </div>
          <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">POSTRES</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">El final feliz mas dulce</p>
        </div>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/tarta_queso.jpg" alt="tarta-queso" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Tarta de Queso</h2>
                <p className="mb-4">Tarta de queso con mermelada de fresa.</p>
                <h3 className="mb-2 italic">4.90 €</h3>             
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <Image className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="/img/menu/tarta_pistacho.jpg" alt="tarta-pistacho" width={400} height={300} />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">Tarta de Pistacho</h2>
                <p className="mb-4">Tarta de pistacho.</p>
                <h3 className="mb-2 italic">4.90 €</h3>                  
              </div>
            </div>
          </div>
          </div>
          </div>
      </div>
    </section>
  );
}
