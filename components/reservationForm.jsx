'use client'

import React, { useState , useEffect} from 'react';
import Image from 'next/image';
import { handleReservationAPI } from '../app/api/reservation/reservation.js';
import EmailTemplate from './emailReserves.jsx';
import CountrySelector from './countrySelector.jsx';
import { PhoneNumberUtil } from 'google-libphonenumber';;

function ReservationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [peopleCount, setPeopleCount] = useState(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedTurn, setSelectedTurn] = useState('lunch');

    const [selectedCountry, setSelectedCountry] = useState('ES');
    
    const [phonePrefix, setPhonePrefix] = useState('+34'); // Default prefix 
    const [phoneSuffix, setPhoneSuffix] = useState('');

    const phoneNumberUtil = PhoneNumberUtil.getInstance();

    useEffect(() => {
        const countryCode = phoneNumberUtil.getCountryCodeForRegion(selectedCountry.toUpperCase());
        setPhonePrefix(`+${countryCode} `);
    }, [selectedCountry]);

    const handleCountrySelect = (code) => {
        setSelectedCountry(code);
    };

    const handlePhoneChange = (e) => {
        const inputPhone = e.target.value;
        if (inputPhone.startsWith(phonePrefix)) {
            setPhoneSuffix(inputPhone.substring(phonePrefix.length));
            setPhone(inputPhone);
        } else {
            setPhoneSuffix(phoneSuffix);
            setPhone(phone);
        }
    };

    // Estados para mensajes de error
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [dateError, setDateError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [peopleError, setPeopleCountError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        const spanishPhoneNumberRegex = /^\d{9}$/;
        return spanishPhoneNumberRegex.test(phone);
    };

    const validatePhoneNumber = () => {
        const regionCode = selectedCountry.toUpperCase();
        const fullPhoneNumber = phonePrefix.trim() + phoneSuffix.trim();

        try {
            const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(fullPhoneNumber, regionCode);
            if (!phoneNumberUtil.isValidNumber(parsedPhoneNumber)) {
                setPhoneError("Número de teléfono no válido para el país seleccionado.");
                return false;
            }
        } catch (error) {
            setPhoneError("Número de teléfono no válido.");
            return false;
        }

        setPhoneError("");
        return true;
    };

    
    const clearForm = () => {
        setName('');
        setEmail('');
        setPhone(`+${phoneNumberUtil.getCountryCodeForRegion(selectedCountry.toUpperCase())}`); // Reset phone with current country code
        setPeopleCount(1);
        setDate('');
        setTime('');
        setSelectedTurn('lunch');
        setNameError('');
        setEmailError('');
        setPhoneError('');
        setDateError('');
        setGeneralError('');
        setPeopleCountError('');
        setTimeError('');
        setPhoneSuffix('');
    };

    const handleReservation = async () => {
        // Reiniciar mensajes de error
        setNameError('');
        setEmailError('');
        setPhoneError('');
        setDateError('');
        setGeneralError('');
        setPeopleCountError('');
        setTimeError('');
        setSuccessMessage('');

        // Verificar que los campos obligatorios no estén vacíos
        if (!name || !isValidEmail(email)  || !phone || !peopleCount || !date || !time || !selectedTurn) {
            
            if (!name) {
                setNameError('Por favor ingresa tu nombre.');
            }
            if (!phone) {
                setPhoneError('Por favor ingresa tu tlf.');
            }
            if (!isValidEmail(email)) {
                setEmailError('Por favor ingresa un correo electrónico válido.');
            }
            
            if (!peopleCount) {
                setPeopleCountError('Por favor ingresa la cantidad de personas.');
            }
            if (!date) {
                setDateError('Por favor selecciona una fecha.');
            }
            if (!time) {
                setTimeError('Por favor selecciona una hora.');
            }
            return;
        }

        // Validar que la fecha no sea anterior a hoy
        const selectedDate = new Date(date);
        const today = new Date();
        if (selectedDate < today) {
            setDateError('Elige una fecha posterior a hoy.');
            return;
        }

        if (!validatePhoneNumber()) {
            // Si la validación del número de teléfono falla, la función ya habrá establecido el mensaje de error apropiado.
            return;
        }

        const formData = {
            name,
            email,
            phone,
            peopleCount,
            date,
            time,
            selectedTurn
        };

        console.log('Form Data:', formData);

        try {
            const response = await handleReservationAPI(formData);
            console.log(response.data);
            if (response && response.data && response.data.success) {

                const emailData = {
                    name,
                    email,
                    time,
                    date,
                    peopleCount
                };

                const emailResponse = await handleEmailReservation(emailData);
                //console.log(emailResponse);

                setSuccessMessage('Reserva realizada con éxito.');
                clearForm();
            } else {
                setGeneralError('No se pudo completar la reserva.');
            }
        } catch (error) {
            console.error('Error al hacer la reserva:', error);
            setGeneralError('Ocurrió un error al procesar la reserva. Por favor, inténtalo de nuevo.');
        }
    };

    const handleEmailReservation = async (emailData) => {
        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            return await response.json();
        } catch (error) {
            console.error('Error al enviar el correo electrónico de reserva:', error);

            return { error: 'Error al enviar el correo electrónico de reserva.' };
        }
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
                        <div className="w-full lg:w-1/2 flex justify-center">
                            {successMessage && <p className="text-green-500">{successMessage}</p>}
                            {generalError && <p className="text-red-500">{generalError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {nameError && <p className="text-red-500">{nameError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Correo Electrónico:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {emailError && <p className="text-red-500">{emailError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Teléfono:
                            </label>
                            <div className='flex items-center'>
                                <CountrySelector onSelect={handleCountrySelect} />
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phonePrefix + phoneSuffix} 
                                    onChange={handlePhoneChange}
                                    className="ml-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            {phoneError && <p className="text-red-500">{phoneError}</p>}
                        </div>
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
                            {peopleError && <p className="text-red-500">{peopleError}</p>}
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
                            {dateError && <p className="text-red-500">{dateError}</p>}
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
                            {timeError && <p className="text-red-500">{timeError}</p>}
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
