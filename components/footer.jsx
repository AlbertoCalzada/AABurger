import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="text-gray-600 body-font bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-opacity-90">
            <div className="container px-5 py-8 mx-auto flex items-center justify-center sm:flex-row flex-col">
                <Link href="/">
                    <span className="flex items-center text-gray-900 mb-4 md:mb-0">
                        <Image src="/img/icon.svg" alt="Logo Web" width={250} height={250}/>
                    </span>
                </Link>
                <p className="text-sm text-black mt-4">
                    © {currentYear} - Todos los derechos reservados
                </p>
                <div className="flex flex-col sm:flex-row mt-4">
                    <input type="email" placeholder="Correo electrónico" className="w-full sm:w-auto bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"/>
                    <p className="text-sm text-black mt-4 sm:ml-4">Todas nuestras novedades</p>
                    <button className="mt-2 sm:mt-0 sm:ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Suscribirse
                    </button>
                </div>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <span className="mr-3">
                        <Link href="https://www.facebook.com/" target="_blank">
                            <Image src="/img/facebook-icon.svg" alt="Facebook" width={32} height={32} />
                        </Link>
                    </span>
                    <span className="mr-3">
                        <Link href="https://twitter.com/" target="_blank">
                            <Image src="/img/twitter-icon.svg" alt="Twitter" width={32} height={32} />
                        </Link>
                    </span>
                    <span className="mr-3">
                        <Link href="https://www.instagram.com/" target="_blank">
                            <Image src="/img/instagram-icon.svg" alt="Instagram" width={32} height={32} />
                        </Link>
                    </span>
                    <span>
                        <Link href="https://www.linkedin.com/" target="_blank">
                            <Image src="/img/linkedin-icon.svg" alt="LinkedIn" width={32} height={32} />
                        </Link>
                    </span>
                </span>
            </div>
        </footer>
    );
}
