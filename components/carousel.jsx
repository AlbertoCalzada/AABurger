"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const images = [
        '/img/carrusel/carrousel_1.jpg',
        '/img/carrusel/carrousel_2.jpg',
        '/img/carrusel/carrousel_3.jpg',
        '/img/carrusel/carrousel_4.jpg'
    ];

    useEffect(() => {
        let intervalId;
        if (autoplay) {
            intervalId = setInterval(() => {
                handleNext();
            }, 5000); // Cambiar de imagen cada 5 segundos
        }
        return () => clearInterval(intervalId);
    }, [autoplay, currentIndex]);

    const handlePrev = () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = images.length - 1;
        }
        setCurrentIndex(newIndex);
    };
    
    const handleNext = () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= images.length) {
            newIndex = 0;
        }
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full h-screen">
            <div className="overflow-hidden rounded-lg h-full">
                {images.map((image, index) => (
                    <div 
                        key={index}
                        className={`w-full h-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={image}
                            alt={`Slide ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                        />
                    </div>
                ))}
            </div>
            <div className="absolute top-4 right-4 flex space-x-4">
                <Link href="/register">
                    <button className="px-6 py-3 rounded-full text-lg mt-4 md:mt-0 transition-colors bg-yellow-500 text-white hover:bg-yellow-600">
                        Registrate
                    </button>
                </Link>
                <Link href="/login">
                    <button className="px-6 py-3 rounded-full text-lg mt-4 md:mt-0 transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300">
                        Inicio de Sesión
                    </button>
                </Link>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 flex justify-center w-full">
                <Link href="/menu">
                    <button className="px-4 py-2 bg-black bg-opacity-50 text-white hover:bg-orange-300 rounded">
                        Ver Carta
                    </button>
                </Link>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-4 h-4 rounded-full ${index === currentIndex ? 'bg-black' : 'bg-gray-300'}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}
