'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define types for user
interface User {
  nombre: string;
  rol: string;
}

export default function Perfil() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const router = useRouter();

  // Verificar autenticación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        
        if (!response.ok) {
          router.push('/login');
          return;
        }
        
        setUser(data.user);
      } catch (error) {
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#d90f0f]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f4f4] text-[#333] font-sans">
      {/* Header */}
      <header className="bg-[#11034a] text-white py-4 text-center shadow-lg">
        <img src="https://icaro.inventores.org/build/assets/images/Inventores.png" alt="Icono" className="w-24 h-20 mx-auto"/>
        <h1 className="text-2xl font-bold">Klipper_Web</h1>
        <nav className="flex justify-center items-center mt-2 gap-4">
          <Link href="/perfil" className="relative text-white font-bold py-3 px-5 mx-4 rounded-md transition-all duration-300 ease-in-out hover:text-[#d90f0f] hover:-translate-y-0.5">
            <i className="fas fa-user"></i> Perfil
          </Link>
          <Link href="/impresora_3D" className="relative text-white font-bold py-3 px-5 mx-4 rounded-md transition-all duration-300 ease-in-out hover:text-[#d90f0f] hover:-translate-y-0.5">
            <i className="fas fa-print"></i> Imprimir
          </Link>
          {(user?.rol === 'ADMIN' || user?.rol === 'Coordinador') && (
            <>
              <Link href="/perfil_admin" className="relative text-white font-bold py-3 px-5 mx-4 rounded-md transition-all duration-300 ease-in-out hover:text-[#d90f0f] hover:-translate-y-0.5">
                <i className="fas fa-users"></i> Admin
              </Link>
            </>
          )}
          <div className="relative inline-block">
            <button onClick={() => setShowConfig(!showConfig)} className="relative text-white font-bold py-3 px-5 mx-4 rounded-md transition-all duration-300 ease-in-out hover:text-[#d90f0f] hover:-translate-y-0.5 cursor-pointer">
              <i className="fas fa-cogs"></i> Configuración
            </button>
            {showConfig && (
              <div className="absolute right-0 mt-2 w-48 bg-[#333] rounded-md shadow-lg z-10">
                <Link href="/cambiar" className="block text-white px-4 py-3 hover:bg-[#d90f0f]">
                  <i className="fas fa-key"></i> Cambiar Contraseña
                </Link>
                <button onClick={handleLogout} className="block w-full text-left text-white px-4 py-3 hover:bg-[#d90f0f]">
                  <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Banner */}
      <div className="h-64 flex justify-center items-center text-black text-center animate-fadeIn">
        <h1 className="text-6xl font-bold" style={{textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'}}>Perfil de Usuario</h1>
      </div>

      {/* Contenido Principal */}
      <div className="p-5">
        <div className="my-5 p-5 bg-white rounded-lg shadow-xl animate-fadeInUp">
          <h2 className="text-center mt-0 text-[#061860] text-2xl font-bold">¡Bienvenido, {user?.nombre}!</h2>
          <div className="text-center">
            <p>Rol: {user?.rol}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center p-5 bg-[#061860] text-white text-sm">
        <p>&copy; 2024 Laboratorio Inventores. Todos los derechos reservados.</p>
      </footer>
      
      {/* Script para FontAwesome */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"></script>
    </div>
  );
}
