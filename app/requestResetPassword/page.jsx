'use client'
import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageOk, setMessageOk] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageOk('');
        try {
            console.log("Submitting password reset request...");
            const response = await axios.post('/api/password/request', { email });
            console.log("Response from server:", response);

            if (response.status === 200) {
                console.log("Password reset email sent successfully!");
                setMessageOk('Se ha enviado un correo electrónico para restablecer la contraseña.');
            } else {
                console.log("Error sending password reset email:", response.statusText);
                setMessage('Ha ocurrido un error, por favor intente nuevamente. 2');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Error:', error);

            if (error.response && error.response.status === 404) {
                setMessage('Correo electrónico no encontrado.');
            } else {
                setMessage('Ha ocurrido un error, por favor intente nuevamente. 3');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ backgroundImage: "url('/img/burger_background.jpg')"}}>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Olvidé mi contraseña</h2>
                {message && <div className="text-red-500 mb-4">{message}</div>}
                {messageOk && <div className="text-green-500 mb-4">{messageOk}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Escribe tu correo electrónico"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Solicitar restablecimiento
                    </button>
                </form>
            </div>
        </div>
    );
}
