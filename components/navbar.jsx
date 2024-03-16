import React from 'react'
import Link from 'next/link'

export default function navbar() {
  return (
    <div>

    <nav className='text-3xl'>
      <h1>Navbar de prueba</h1>
      <ul>
        <li><Link href="/">Hello world</Link></li>
        <li><Link href="/">Tienda</Link></li>
        <li><Link href="/">Reseñas</Link></li>
      </ul>
    </nav>
    
    </div>
  )
}
