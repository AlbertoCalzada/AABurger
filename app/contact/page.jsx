"use client";
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
   

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre es obligatorio.';
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido.';
    }
    if (!formData.message) newErrors.message = 'El mensaje es obligatorio.';
    return newErrors;
  };

  const handleEmailReservation = async (emailData) => {
    try {
      const response = await fetch('/api/contact', {
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

   const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const emailResponse = await handleEmailReservation(formData);
      console.log(emailResponse)
      if (emailResponse.error) {
        setErrors({ general: emailResponse.error });
      } else {
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        setSuccessMessage('Consulta enviada con éxito, será respondida lo antes posible.');
        setErrors({});
      }
    } else {
      setErrors(validationErrors);
      setSuccessMessage('Ha ocurrido un error, intentalo de nuevo');
    }
  };

  return (
    <section className="text-gray-600 body-font" style={{ backgroundImage: "url('/img/burger_background.jpg')" }}>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contacto</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Para cualquier consulta o feedback, por favor complete el siguiente formulario.
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full bg-gray-100 bg-opacity-50 rounded border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full bg-gray-100 bg-opacity-50 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full bg-gray-100 bg-opacity-50 rounded border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                onClick={handleSubmit}
                className="flex mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg border border-transparent rounded-full"
              >
                Enviar
              </button>
            </div>
            {successMessage && (
              <div className="p-2 w-full">
                <p className="text-green-700 text-center mt-4">{successMessage}</p>
              </div>
            )}
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <a href="mailto:info@a&aburger.com" className="text-indigo-500">info@a&aburger.com</a>
              <p className="leading-normal my-5">
                Horario de apertura:<br />Lunes a Domingo<br />13h-16h y 20h-24h
              </p>
              <p className="leading-normal my-5">
                Gta. de Bilbao, 4, Chamberí<br />28004 Madrid
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}