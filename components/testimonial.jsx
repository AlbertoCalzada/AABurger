import React from 'react';
import Image from 'next/image';
import testimonial1 from '../public/img/testimonial-1.jpg';
import testimonial2 from '../public/img/testimonial-2.jpg';
import testimonial3 from '../public/img/testimonial-3.jpg';
import testimonial4 from '../public/img/testimonial-4.jpg';

export default function TestimonialCarousel() {
    return (
        <div className="bg-gradient-to-b from-gray-200 to-gray-100 py-14 mt-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-10 bg-white rounded-lg shadow-lg transform hover:scale-105 duration-300">
                            <span className="absolute top-0 right-0 bg-yellow-500 text-white py-1 px-2 rounded-full">Cliente Satisfecho</span>
                            <div className="w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full border-4 border-gray-300 relative">
                                <Image src={testimonial.image} alt={`Testimonial ${index + 1}`} width={160} height={160} />
                            </div>
                            <p className="text-gray-700 mb-4">{testimonial.text}</p>
                            <h2 className="text-xl font-semibold mb-2">{testimonial.name}</h2>
                            <p className="text-gray-500 mb-6">{testimonial.profession}</p>
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
        text: "La calidad de la carne en las hamburguesas es excepcional; jugosa, tierna y con el punto exacto de cocción. Sin duda, el mejor lugar para satisfacer mi antojo de hamburguesas",
        name: "Olivia",
        profession: "Crítica gastronómica"
    },
    {
        image: testimonial2,
        text: "Nunca he probado unas hamburguesas tan deliciosas y bien sazonadas como las que sirven aquí. ¡Definitivamente volveré por más!",
        name: "Juan Pérez",
        profession: "Amante de la buena comida"
    },
    {
        image: testimonial3,
        text: "Las hamburguesas estaban tan jugosas y llenas de sabor que cada bocado era una explosión de felicidad en mi boca.",
        name: "Paula",
        profession: "Entusiasta de la comida rápida"
    }
];
