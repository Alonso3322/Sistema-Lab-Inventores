'use client';

import { useState } from 'react';
import Link from 'next/link';

// Definimos los tipos para los datos
type Impresion = {
  id: number;
  usuario: string;
  archivo: string;
  fecha: string;
  estado: 'Completada' | 'En progreso' | 'Fallida';
};

type Usuario = {
  id: number;
  nombre: string;
  codigo: string;
  email: string;
  rol: string;
  estado: 'Activo' | 'Inactivo';
};



// Props del componente
interface AdminDashboardProps {
  impresiones: Impresion[];
  usuarios: Usuario[];
  userName: string;
}

export default function AdminDashboard({ impresiones, usuarios, userName }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="https://icaro.inventores.org/build/assets/images/Inventores.png" 
                alt="Icono" 
                className="w-16 h-14"
              />
              <h1 className="text-2xl font-bold">Klipper_Web</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setActiveSection('dashboard')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'dashboard' ? 'bg-white text-indigo-900 font-bold' : 'hover:bg-indigo-800'}`}>
                <i className="fas fa-user mr-2"></i>Perfil
              </button>
              <button 
                onClick={() => setActiveSection('imprimir')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'imprimir' ? 'bg-white text-indigo-900 font-bold' : 'hover:bg-indigo-800'}`}>
                <i className="fas fa-print mr-2"></i>Imprimir
              </button>
              <button 
                onClick={() => setActiveSection('usuarios')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'usuarios' ? 'bg-white text-indigo-900 font-bold' : 'hover:bg-indigo-800'}`}>
                <i className="fas fa-users mr-2"></i>Usuarios
              </button>
              

              <div className="relative group">
                <button className="px-4 py-2 rounded-lg hover:bg-indigo-800 transition-all duration-300">
                  <i className="fas fa-cogs mr-2"></i>Configuración
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link href="/perfil_encargado" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-t-lg">
                    <i className="fas fa-user-cog mr-2"></i>Cambiar Perfil
                  </Link>
                  <Link href="/cambiar" className="block px-4 py-3 text-gray-800 hover:bg-gray-100">
                    <i className="fas fa-key mr-2"></i>Cambiar Contraseña
                  </Link>
                  <Link href="/api/logout" className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-b-lg">
                    <i className="fas fa-sign-out-alt mr-2"></i>Cerrar Sesión
                  </Link>
                </div>
              </div>
            </nav>

            <button className="md:hidden text-2xl">☰</button>
          </div>
        </div>
      </header>

      <div className="pt-32 pb-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Panel de Administrador</h1>
          <p className="text-xl opacity-90">Bienvenido, {userName}</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'dashboard' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Lista de Impresiones Realizadas</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left">Usuario</th>
                    <th className="px-4 py-3 text-left">Archivo</th>
                    <th className="px-4 py-3 text-left">Fecha</th>
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {impresiones.map((impresion) => (
                    <tr key={impresion.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{impresion.usuario}</td>
                      <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{impresion.archivo}</span></td>
                      <td className="px-4 py-3">{impresion.fecha}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-sm ${impresion.estado === 'Completada' ? 'bg-green-100 text-green-800' : impresion.estado === 'En progreso' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{impresion.estado}</span></td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 mr-2"><i className="fas fa-eye"></i></button>
                        <button className="text-red-600 hover:text-red-800"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'imprimir' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Gestión de Impresiones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <i className="fas fa-upload text-4xl text-blue-600 mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Subir Archivo</h3>
                <p className="text-gray-600 mb-4">Sube tus archivos .stl o .gcode</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Seleccionar Archivo</button>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <i className="fas fa-list text-4xl text-green-600 mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Cola de Impresión</h3>
                <p className="text-gray-600 mb-4">Gestiona las impresiones en espera</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Ver Cola</button>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <i className="fas fa-history text-4xl text-purple-600 mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Historial</h3>
                <p className="text-gray-600 mb-4">Revisa impresiones anteriores</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Ver Historial</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'usuarios' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Gestión de Usuarios</h2>
            <div className="mb-6 flex justify-between items-center">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"><i className="fas fa-plus mr-2"></i>Agregar Usuario</button>
              <div className="relative">
                <input type="text" placeholder="Buscar usuario..." className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Código</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Rol</th>
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{usuario.nombre}</td>
                      <td className="px-4 py-3">{usuario.codigo}</td>
                      <td className="px-4 py-3">{usuario.email}</td>
                      <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{usuario.rol}</span></td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-sm ${usuario.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{usuario.estado}</span></td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 mr-2"><i className="fas fa-edit"></i></button>
                        <button className="text-red-600 hover:text-red-800"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        
      </main>

      <footer className="bg-indigo-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Laboratorio Inventores. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}