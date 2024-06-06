'use client'
import React from 'react';
import Menu from '../../components/menu';

export default function MenuVisible() { 

  return (
    <section className="text-gray-600 body-font relative" style={{ backgroundImage: "url('/img/burger_background.jpg')" }}>
      <Menu />
    </section>
  );
}