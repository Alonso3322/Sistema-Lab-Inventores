'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define types for user and impresion
interface User {
  nombre: string;
  rol: string;
}

interface Impresion {
  id: number;
  archivo: string;
  usuario: string;
  impresora: string;
  fecha: string;
  estado: 'Completado' | 'En progreso' | 'Fallido';
}


export default function PerfilAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [impresiones, setImpresiones] = useState<Impresion[]>([]);
  const [showConfig, setShowConfig] = useState(false);
  const router = useRouter();

  // Verificar autenticación y rol
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        const rol = data.rol || data.user?.rol;

        if (!response.ok || rol?.toUpperCase() !== "ADMIN") {
            router.push('/login');
            return;
          }
        
        setUser(data);
        loadImpresiones();
      } catch (error) {
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const loadImpresiones = async () => {
    try {
      const response = await fetch('/api/impresiones');
      const data = await response.json();
      if (response.ok) {
        setImpresiones(data);
      }
    } catch (error) {
      console.error('Error cargando impresiones:', error);
    }
  };

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="https://icaro.inventores.org/build/assets/images/Inventores.png" 
                alt="Icono" 
                className="w-16 h-14 mr-3"
              />
              <h1 className="text-2xl font-bold">ADMINISTRADOR</h1>
            </div>

            <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
              <Link href="/perfil_admin" className="flex items-center px-3 py-2 rounded-lg bg-indigo-800 hover:bg-indigo-700 transition-colors">
                <i className="fas fa-user mr-2"></i> Perfil
              </Link>
              
              <Link href="/impresora_3D" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-800 transition-colors">
                <i className="fas fa-print mr-2"></i> Imprimir
              </Link>
              
              <Link href="/lista_usuarios" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-800 transition-colors">
                <i className="fas fa-users mr-2"></i> Usuarios
              </Link>
              
              

              {/* Menú de Configuración */}
              <div className="relative">
                <button 
                  onClick={() => setShowConfig(!showConfig)}
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-800 transition-colors"
                >
                  <i className="fas fa-cogs mr-2"></i> Configuración
                  <i className={`fas fa-chevron-${showConfig ? 'up' : 'down'} ml-2`}></i>
                </button>

                {showConfig && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 animate-fadeIn">
                    <Link href="/perfil" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                      <i className="fas fa-user-cog mr-2"></i> Cambiar Perfil
                    </Link>
                    <Link href="/cambiar" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                      <i className="fas fa-key mr-2"></i> Cambiar Contraseña
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="pt-32 pb-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">Administrador</h1>
          <p className="text-xl opacity-90">Panel de control del sistema</p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Bienvenida */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fadeInUp">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Bienvenido, {user?.nombre}!
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <i className="fas fa-users text-blue-600 text-3xl mb-2"></i>
              <h3 className="font-semibold text-gray-800">Total Usuarios</h3>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <i className="fas fa-print text-green-600 text-3xl mb-2"></i>
              <h3 className="font-semibold text-gray-800">Impresiones Hoy</h3>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <i className="fas fa-cogs text-purple-600 text-3xl mb-2"></i>
              <h3 className="font-semibold text-gray-800">Impresoras Activas</h3>
              <p className="text-2xl font-bold text-purple-600">5/6</p>
            </div>
          </div>
        </div>

        {/* Lista de Impresiones */}
        <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeInUp">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Historial de Impresiones
            </h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <i className="fas fa-download mr-2"></i> Exportar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Archivo</th>
                  <th className="px-4 py-3">Usuario</th>
                  <th className="px-4 py-3">Impresora</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {impresiones.map((impresion, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      <div className="flex items-center">
                        <i className="fas fa-file text-blue-600 mr-2"></i>
                        {impresion.archivo}
                      </div>
                    </td>
                    <td className="px-4 py-3">{impresion.usuario}</td>
                    <td className="px-4 py-3">{impresion.impresora}</td>
                    <td className="px-4 py-3">{impresion.fecha}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        impresion.estado === 'Completado' ? 'bg-green-100 text-green-800' :
                        impresion.estado === 'En progreso' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {impresion.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="text-green-600 hover:text-green-800 transition-colors">
                          <i className="fas fa-download"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800 transition-colors">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {impresiones.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <i className="fas fa-print text-4xl mb-4 text-gray-300"></i>
              <p>No hay impresiones registradas</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Laboratorio Inventores. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Script para FontAwesome */}
      <script src="https://kit.fontawesome.com/your-fontawesome-kit.js" crossOrigin="anonymous"></script>
    </div>
  );
}