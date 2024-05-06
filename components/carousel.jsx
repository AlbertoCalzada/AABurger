'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    /*const images = [
        '/images/carrusel/foto3.jpg',
        '/images/carrusel/foto1.webp',
        '/images/carrusel/foto2.webp'
    ];*/
    const images = [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
        '/images/carrusel/foto1.webp',
        '/images/carrusel/foto2.webp'
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
            <div className="overflow-hidden rounded-lg">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`w-full h-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                       style={{
                            objectFit: 'contain', 
                            maxHeight: '80vh', 
                            maxWidth: '100%', 
                            margin: 'auto' 
                        }}
                    />
                ))}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 flex justify-center w-full">
                <button className="px-4 py-2 bg-black bg-opacity-50 text-white hover:bg-orange-300 rounded" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                    Ver Carta
                </button>
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
