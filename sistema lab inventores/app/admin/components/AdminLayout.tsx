// app/admin/components/AdminLayout.tsx
'use client';
import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ user, children }: { user: any, children: ReactNode }) {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="https://icaro.inventores.org/build/assets/images/Inventores.png" 
                alt="Icono" 
                className="w-12 h-12"
              />
              <h1 className="text-2xl font-bold">Klipper_Web</h1>
            </div>

            {/* Navegación */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                href="/admin" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-user w-4"></i>
                <span>Perfil</span>
              </Link>

              <Link 
                href="/impresora_3D" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                <i className="fas fa-print w-4"></i>
                <span>Imprimir</span>
              </Link>

              <Link 
                href="/Usuarios" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                <i className="fas fa-users w-4"></i>
                <span>Usuarios</span>
              </Link>

              

              {/* Menú de Configuración */}
              <div className="relative">
                <button 
                  onClick={() => setIsConfigOpen(!isConfigOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <i className="fas fa-cogs w-4"></i>
                  <span>Configuración</span>
                  <i className={`fas fa-chevron-${isConfigOpen ? 'up' : 'down'} text-sm`}></i>
                </button>

                {isConfigOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                    <Link 
                      href="/perfil_encargado" 
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsConfigOpen(false)}
                    >
                      <i className="fas fa-user-cog w-4"></i>
                      <span>Cambiar Perfil</span>
                    </Link>
                    
                    <Link 
                      href="/cambiar" 
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsConfigOpen(false)}
                    >
                      <i className="fas fa-key w-4"></i>
                      <span>Cambiar Contraseña</span>
                    </Link>
                    
                    <button 
                      onClick={() => {
                        setIsConfigOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
                    >
                      <i className="fas fa-sign-out-alt w-4"></i>
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Menú móvil */}
            <div className="md:hidden">
              <button className="text-2xl">
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Laboratorio Inventores. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
