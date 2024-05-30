'use client'
import { useState } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUser } from '../api/auth/auth.js';
import Image from 'next/image'

export default function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const { data: session } = useSession();
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

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
        // Validar campos de usuario y contraseña
        if (!username) {
            setErrorMessage('Usuario requerido');
            return;
        }
        if (!password) {
            setErrorMessage('Contraseña requerida');
            return;
        }
        if (password.length < 6) {
            setErrorMessage('La contraseña debe tener al menos 6 caracteres');
            return;

        }
        try {
            //await loginRequest(formData);


            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });
            console.log(result)
            if (result.error) {

                const error = JSON.parse(result.error);
                setErrorMessage(error.message);

            } else {
                setFormData({ username: '', password: '' });
                setErrorMessage('');

                
            }
        } catch (error) {
            setErrorMessage('Error inesperado al iniciar sesión, por favor intenta nuevamente');
        }
    };



    if (session) {

        //fix 
         const userRole = session?.user?.role;
         console.log(session); // Imprime el objeto de sesión completo

          if (userRole === 'admin') {
              router.push('/admin');
          } else if (userRole === 'user') {
              router.push('/');
          } else {
              router.push('/'); 
          }

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
        <div className="bg-gray-100 min-h-screen flex items-center justify-center pb-4" style={{ backgroundImage: "url('/img/burger_background.jpg')"}}>
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
                        Iniciar Sesión
                    </button>
                </form>

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
                    Iniciar Sesión con Google
                </button>
                <br />
                <p>
                    <Link href="/requestResetPassword" className="text-blue-500 underline">¿Olvidaste tu contraseña?</Link>
                </p>
                <p>
                    ¿No tienes cuenta? <Link href="/register" className="text-blue-500 underline">Regístrate</Link>
                </p>
            </div>
        </div>
    );
}