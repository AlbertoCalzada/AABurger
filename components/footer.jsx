import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="w-full h-5 bg-orange-500"></div>
      <footer className="text-gray-700 body-font bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-opacity-90">
        <div className="container px-5 py-8 mx-auto flex items-center justify-center sm:flex-row flex-col">
          <Link href="/">
            <span className="flex items-center text-gray-900 mb-4 md:mb-0">
              <Image src="/img/icon.svg" alt="Logo Web" width={250} height={250} />
            </span>
          </Link>
          <p className="mr-5 font-bold text-black-700 hover:text-gray-900 transition-colors duration-200">
            © {currentYear} - Todos los derechos reservados
          </p>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/menu" className="mr-5 font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200">Carta</Link>
            <Link href="/findus" className="mr-5 font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200">¿Dónde estamos?</Link>
            <Link href="/aboutus" className="mr-5 font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200">Nuestra historia</Link>
            <Link href="/contact" className="mr-5 font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200">Contacto</Link>
            <Link href="/faq" className="mr-5 font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200">FAQ</Link>
          </nav>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <span className="mr-3">
              <Link href="https://www.facebook.com/" target="_blank">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </Link>
            </span>
            <span className="mr-3">
              <Link href="https://twitter.com/" target="_blank">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </Link>
            </span>
            <span className="mr-3">
              <Link href="https://www.instagram.com/" target="_blank">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </Link>
            </span>
            <span>
              <Link href="https://www.linkedin.com/" target="_blank">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 00-12 0v8a6 6 0 0012 0V8zm-1.5 7.5h-2V12a1.5 1.5 0 00-3 0v3.5h-2V12a3.5 3.5 0 017 0v3.5z"></path>
                  <path d="M4.5 8h-3V6.5h3V8zm0 1.5h-3V10h3v-0.5zM3 14h3v-0.5H3V14zM3 15h3v-0.5H3V15z"></path>
                </svg>
              </Link>
            </span>
          </span>
        </div>
      </footer>
    </>
  );
}
