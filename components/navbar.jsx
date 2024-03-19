import React from 'react';
import Link from 'next/link';


export default function Navbar() {
  return (
    <div>
      <nav className='text-3xl'>
        <h1>Navbar de prueba</h1>
        <ul>
          <li>
            <Link href="/">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Hello world
              </button>
            </Link>
          </li>
          <li>
            <Link href="/">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Tienda
              </button>
            </Link>
          </li>
          <li>
            <Link href="/">
              <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                Reseñas
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
