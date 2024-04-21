'use client'
import { useState } from 'react';
import { loginRequest } from '../api/auth/auth.js'
import { signIn , useSession} from 'next-auth/react'; //para el login con google
import { use } from 'express/lib/router/index.js';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;
        if (!username || !password) {
            alert('Por favor completa todos los campos');
            return;
        }
        try {
            // Enviar los datos del formulario al servidor
            const peticion = await loginRequest(formData);
            console.log("esta es la peticion " + peticion)
            // Si la solicitud es exitosa, limpiar el formulario
            setFormData({
                username: '',
                password: '',
            });

            setErrorMessage('');
        } catch (error) {
            console.log('Error al registrar:', error);
            if (error.response && error.response.data) {
                // Si el error tiene un mensaje definido en el servidor, mostrarlo
                const errorMessage = error.response.data.message || error.response.data.error.join('\n');
                // Mostrar el mensaje de error en rojo
                setErrorMessage(errorMessage);
            } else {
                // Para otros errores, mostrar un mensaje genérico
                setErrorMessage('Error inesperado al registrar, por favor intenta nuevamente');
            }
        }


    };

    const handleGoogleSignIn = () => {
        signIn('google');
    };

    const { data: session } = useSession()
    console.log(session)
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center pb-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Inicio de Sesión</h2>
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
                        Iniciar Sesion
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors mt-4 flex items-center justify-center"
                    >
                        <img
                            src="/img/google-icon-logo.svg"
                            alt="Google Logo"
                            className="w-5 h-5 mr-2"
                        />
                        Iniciar Sesión con Google
                    </button>

                </form>
            </div>
        </div>
    );
}
