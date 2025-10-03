// src/components/Header.js
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-gray-800 text-white p-5 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://icaro.inventores.org/build/assets/images/Inventores.png" 
            alt="Icono" 
            className="w-16 h-14 mr-3"
          />
          <h1 className="text-xl font-bold">Klipper_Web</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <button 
            onClick={() => scrollToSection('home')} 
            className="hover:text-amber-300 transition-colors"
          >
            Inicio
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="hover:text-amber-300 transition-colors"
          >
            Acerca de
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-amber-300 transition-colors"
          >
            Contacto
          </button>
          <Link 
            href="/login" 
            className="bg-red-600 px-4 py-2 rounded-full font-bold hover:bg-red-700 transition-colors"
          >
            INICIAR SESIÓN
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 bg-gray-700 p-4 rounded-lg">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => {
                scrollToSection('home');
                setIsMenuOpen(false);
              }} 
              className="hover:text-amber-300 transition-colors py-2"
            >
              Inicio
            </button>
            <button 
              onClick={() => {
                scrollToSection('about');
                setIsMenuOpen(false);
              }} 
              className="hover:text-amber-300 transition-colors py-2"
            >
              Acerca de
            </button>
            <button 
              onClick={() => {
                scrollToSection('contact');
                setIsMenuOpen(false);
              }} 
              className="hover:text-amber-300 transition-colors py-2"
            >
              Contacto
            </button>
            <Link 
              href="/login" 
              className="bg-red-600 px-4 py-2 rounded-full font-bold hover:bg-red-700 transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              INICIAR SESIÓN
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}