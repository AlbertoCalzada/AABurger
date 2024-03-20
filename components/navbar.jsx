import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Image src="/img/icon.svg" alt="Logo Web" width={2000/10} height={2000/10}/>
          {/*<span className="ml-3 text-xl">A&A Burger</span>*/}
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/menu" className="mr-5 hover:text-gray-900">Carta</Link>
          <Link href="/findus" className="mr-5 hover:text-gray-900">¿Dónde estamos?</Link>
          <Link href="/aboutus" className="mr-5 hover:text-gray-900">Nuestra historia</Link>
          <Link href="/contact" className="mr-5 hover:text-gray-900">Contacto</Link>
        </nav>
        <Link href='/order'>
          <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">Pedir</button>
        </Link>
        <Link href='/reserve'>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mx-2">Reservar
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </Link>
      </div>
    </header>
  );
}
