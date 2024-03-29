'use client'

import React, { useState } from 'react';

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        '/images/carrusel/foto3.jpg',
        '/images/carrusel/foto1.webp',
        '/images/carrusel/foto2.webp'
    ];

    const handlePrev = () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = images.length - 1;
        }
        setCurrentIndex(newIndex);
        console.log('Prev Index:', newIndex);
    };
    
    const handleNext = () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= images.length) {
            newIndex = 0;
        }
        setCurrentIndex(newIndex);
        console.log('Next Index:', newIndex);
    };

    console.log('Current Index:', currentIndex);
    console.log('Current Image:', images[currentIndex]);

    return (
        <div className="relative w-full max-w-screen-lg">
            <div className="overflow-hidden rounded-lg" style={{ height: '500px' }}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`w-full h-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 flex">
                <button type="button" className="px-4 py-2 bg-black bg-opacity-50 text-white mr-4" onClick={handlePrev}>Previous</button>
                <button type="button" className="px-4 py-2 bg-black bg-opacity-50 text-white" onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

