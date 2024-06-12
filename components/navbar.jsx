'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const handleReserveClick = (e) => {
    e.preventDefault();
    const reserveElement = document.getElementById('reserve');
    if (reserveElement) {
      reserveElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#reserve';
    }
  };

  const { data: session } = useSession(); // Obtén la sesión actual


  return (
    <>
      <header className="text-gray-600 body-font shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-opacity-90">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image src="/img/icon.svg" alt="Logo Web" width={250} height={250} />
          </Link>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/menu" className="mr-5 font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200">Carta</Link>
            <Link href="/findus" className="mr-5 font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200">¿Dónde estamos?</Link>
            <Link href="/aboutus" className="mr-5 font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200">Nuestra historia</Link>
            <Link href="/contact" className="mr-5 font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200">Contacto</Link>
            <Link href="/faq" className="mr-5 font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200">FAQ</Link>
          </nav>
          <Link href='/order'>
            <button className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded-full text-lg mt-4 md:mt-0">Pedir</button>
          </Link>
          <Link href="#" onClick={handleReserveClick}>
            <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded-full text-lg mt-4 md:mt-0 mx-2">Reservar
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
          {session && (
            <div className="flex items-center ml-2">
             <Link href='/profile'><span className="mr-2 text-gray-300">Hola, {session.user.name}</span></Link>
              {session.user.role === 'admin' && ( // Mostrar el botón solo si el usuario es admin
                <Link href="/admin">
                  <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded-full text-lg mt-4 md:mt-0 mx-2">
                    Admin
                  </button>
                </Link>
              )}
              
              <button
                onClick={() => signOut()}
                className="inline-flex items-center bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded-md text-white text-base mt-4 md:mt-0"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="w-full h-5 bg-orange-500"></div>
    </>
  );
}
