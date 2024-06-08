import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getDishesAPI } from '../app/api/dish/dish';

const MenuSection = ({ title, description, items }) => (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 tracking-widest">{title}</h1>
        <p className="text-lg text-gray-700 mb-8">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="relative overflow-hidden rounded-lg group">
              <div className="w-full h-full relative overflow-hidden" style={{ paddingBottom: '75%' }}>
              <Image
                className="object-cover object-center w-full h-full transition-transform duration-300 transform group-hover:scale-105"
                src={`/img/menu/${item.image}`}
                alt={item.alt}
                fill
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              </div>
            </div>
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-gray-900 to-transparent p-4 w-full opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white">
                <p className="text-lg font-medium mb-1">{item.name}</p>
                <p className="text-sm mb-2">{item.description}</p>
                <p className="text-lg font-bold italic">{item.price.toFixed(2)} €</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Menu = () => {
    const [cart, setCart] = useState({});
    const [entrantes, setEntrantes] = useState([]);
    const [burgers, setBurgers] = useState([]);
    const [postres, setPostres] = useState([]);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await getDishesAPI();
                const data = response.data;
                const entrantesData = data.filter(dish => dish.type === 'entrante' && dish.isInMenu);
                const burgersData = data.filter(dish => dish.type === 'principal' && dish.isInMenu);
                const postresData = data.filter(dish => dish.type === 'postre' && dish.isInMenu);
                setEntrantes(entrantesData);
                setBurgers(burgersData);
                setPostres(postresData);
            } catch (error) {
                console.error('Error al obtener los platos:', error);
            }
        };

        fetchDishes();
    }, []);


    return (
        <div>
            <MenuSection title="Entrantes" description="¡Disfruta de nuestros deliciosos entrantes!" items={entrantes} />
            <MenuSection title="Burgers" description="Prueba nuestras hamburguesas artesanales" items={burgers} />
            <MenuSection title="Postres" description="Dulces y postres para cerrar con broche de oro" items={postres} />
        </div>
    );
};

export default Menu;