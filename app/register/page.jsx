'use client'
import { useState } from 'react';
import { registerRequest } from '../api/auth/auth.js'
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';
import Image from 'next/image'

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const { data: session } = useSession();
    const [errorMessage, setErrorMessage] = useState('')
    const [registrationSuccess, setRegistrationSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = formData;
        if (!username || !email || !password) {
            alert('Por favor completa todos los campos')
            return;
        }
        try {
            // Enviar los datos del formulario al servidor
            const peticion = await registerRequest(formData)
            console.log("esta es la peticion " + peticion)
            // Si la solicitud es exitosa, limpiar el formulario
            setFormData({
                username: '',
                email: '',
                password: '',
            });
            setRegistrationSuccess(true)
            setErrorMessage('')
        } catch (error) {
            console.log('Error al registrar:', error)
            if (error.response && error.response.data) {
                // Si el error tiene un mensaje definido en el servidor, mostrarlo
                const errorMessage = error.response.data.message || error.response.data.error.join('\n')
                // Mostrar el mensaje de error en rojo
                setErrorMessage(errorMessage)
            } else {
                // Para otros errores, mostrar un mensaje genérico
                setErrorMessage('Error inesperado al registrar, por favor intenta nuevamente')
            }
        }


    };

    if (session) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center pb-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">Bienvenido {session.user.name || session.user.email}</h2>
                    <button
                        onClick={() => signOut()}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors mt-4"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center pb-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Registro</h2>
                {errorMessage && (
                    <div className="text-red-500 mb-4">{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Escribe tu usuario"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Escribe tu email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Escribe tu contraseña"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Registrarse
                    </button>

                    {!session && (
                    <button
                        onClick={() => signIn('google')}
                        className="w-full bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors mt-4 flex items-center justify-center"
                    >
                        <Image
                            src="/img/google-icon-logo.svg"
                            alt="Google Logo"
                            className="w-5 h-5 mr-2"
                            width={20}
    height={20}
                        />
                        Registrate con Google
                    </button>
                )}
                    {registrationSuccess && (
                        <div className="relative mt-4">
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Registro completado!</strong>
                                <span className="block sm:inline"> Tu cuenta ha sido creada con éxito.</span>
                            </div>
                            <button
                                className="absolute top-0 right-0 mt-1 mr-1"
                                onClick={() => setRegistrationSuccess(false)}
                            >
                                <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.359 5.652a.5.5 0 1 0-.707.707L9.293 10l-3.64 3.641a.5.5 0 0 0 .707.707L10 10.707l3.641 3.64a.5.5 0 0 0 .707-.707L10.707 10l3.641-3.641a.5.5 0 0 0 0-.707z" /></svg>
                            </button>
                        </div>
                    )}

                </form>
                <br/>
                <p>¿Ya tienes una cuenta? <Link href='/login' style={{ color: 'blue', textDecoration: 'underline' }}>Inicia sesión</Link></p>
            </div>
        </div>
    );
}
