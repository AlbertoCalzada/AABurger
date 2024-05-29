import React from 'react';
import Image from 'next/image';
import testimonial1 from '../public/img/testimonial-1.jpg';
import testimonial2 from '../public/img/testimonial-2.jpg';
import testimonial3 from '../public/img/testimonial-3.jpg';

export default function TestimonialCarousel() {
    return (
        <div className="bg-gradient-to-b from-gray-200 to-gray-100 py-14 mt-8" style={{ backgroundImage: "url('/img/burger_background.jpg')" }}>
            <div className="container mx-auto px-6 lg:px-12">
                <h2 className="text-3xl lg:text-4xl font-bold italic text-center text-gray-700 mb-12">Lo que dicen nuestros clientes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="relative p-10 bg-white rounded-lg shadow-lg transform hover:scale-105 duration-300">
                            <div className="w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full border-4 border-gray-300 relative">
                                <Image src={testimonial.image} alt={`Testimonial ${index + 1}`} width={160} height={160} className="object-cover"/>
                            </div>
                            <p className="text-gray-700 mb-4 italic">{`"${testimonial.text}"`}</p>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{testimonial.name}</h2>
                            <p className="text-gray-500">{testimonial.profession}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const testimonials = [
    {
        image: testimonial1,
        text: "La calidad de la carne en las hamburguesas es excepcional; jugosa, tierna y con el punto exacto de cocción. Sin duda, el mejor lugar para satisfacer mi antojo de hamburguesas.",
        name: "Pablo",
        profession: "Crítico gastronómico"
    },
    {
        image: testimonial2,
        text: "Nunca he probado unas hamburguesas tan deliciosas y bien sazonadas como las que sirven aquí. ¡Definitivamente volveré por más!",
        name: "Raquel",
        profession: "Amante de la buena comida"
    },
    {
        image: testimonial3,
        text: "Las hamburguesas estaban tan jugosas y llenas de sabor que cada bocado era una explosión de felicidad en mi boca.",
        name: "Juan",
        profession: "Entusiasta de la comida rápida"
    }
];
