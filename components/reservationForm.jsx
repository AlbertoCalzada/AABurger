'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import {handleReservationAPI} from '../app/api/reservation/reservation.js'
function ReservationForm() {
    const [peopleCount, setPeopleCount] = useState(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedTurn, setSelectedTurn] = useState('lunch');

    const availableTimes = {
        lunch: [
            '13:00', '13:15', '13:30', '13:45',
            '14:00', '14:15', '14:30', '14:45',
            '15:00', '15:15', '15:30', '15:45',
            '16:00'
        ],
        dinner: [
            '20:00', '20:15', '20:30',
            '20:45', '21:00', '21:15', '21:30',
            '21:45', '22:00', '22:15', '22:30',
            '22:45', '23:00'
        ]
    };

    const handleReservation = () => {
        const formData = {
            peopleCount,
            date,
            time,
            selectedTurn
        };

        handleReservationAPI(formData);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center lg:justify-start">
                <div className="w-full lg:w-1/2 lg:pr-4 mb-4 lg:mb-0">
                    <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">Realizar Reserva</h2>
                    <div className="flex justify-center mb-6">
                        <button
                            className={`mr-4 px-6 py-3 rounded-lg transition-colors ${selectedTurn === 'lunch' ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            onClick={() => setSelectedTurn('lunch')}
                        >
                            Turno de Comida
                        </button>
                        <button
                            className={`px-6 py-3 rounded-lg transition-colors ${selectedTurn === 'dinner' ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            onClick={() => setSelectedTurn('dinner')}
                        >
                            Turno de Cena
                        </button>
                    </div>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="peopleCount">
                                Cantidad de Personas:
                            </label>
                            <select
                                id="peopleCount"
                                value={peopleCount}
                                onChange={(e) => setPeopleCount(parseInt(e.target.value))}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {[...Array(8).keys()].map((index) => (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                Fecha:
                            </label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                                Hora:
                            </label>
                            <select
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {availableTimes[selectedTurn].map((timeOption) => (
                                    <option key={timeOption} value={timeOption}>
                                        {timeOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={handleReservation}
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out hover:from-yellow-600 hover:to-yellow-700"
                        >
                            Reservar
                        </button>

                    </form>
                </div>
                <div className="w-full lg:w-1/2">
                    <Image src="/images/fotoRestaurante.jpg" alt="Foto del restaurante" width={500} height={300} className="w-full h-auto rounded-lg hover:opacity-90 transition-opacity" />
                </div>
            </div>
        </div>
    );
}

export default ReservationForm;
