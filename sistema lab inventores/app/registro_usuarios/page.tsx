// app/registro/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegistroUsuarios() {
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    telefono: '',
    email: '',
    rol: '',
    carrera: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false); 
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!formData.nombre || !formData.codigo || !formData.email || !formData.rol || !formData.password || !formData.carrera) {
      setError('Por favor, completa todos los campos obligatorios');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/registro_usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registro exitoso.');
        setTimeout(() => {
          router.push('/lista_usuarios');
        }, 2000);
      } else {
        setError(data.message || 'Error en el registro');
      }
    } catch (error) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/vector-gratis/copia-espacio-azul-circuitos-fondo-digital_23-2148821699.jpg?semt=ais_incoming')" }}>
      
      {/* HEADER */}
      <header className="bg-blue-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="https://icaro.inventores.org/build/assets/images/Inventores.png" 
              alt="Logo"
              className="w-12 h-10"
            />
            <h1 className="text-xl font-bold uppercase">Laboratorio Inventores</h1>
          </div>
          
          {/* MENU */}
          <nav className="flex space-x-6 items-center relative">
            <Link href="/perfil_admin" className="hover:text-orange-400 transition"><i className="fas fa-user"></i> Perfil Admin</Link>
            <Link href="/lista_usuarios" className="hover:text-orange-400 transition"><i className="fas fa-users mr-2"></i>Listado de Usuarios</Link>
            <Link href="/imprimir" className="hover:text-orange-400 transition"><i className="fas fa-print mr-2"></i>Imprimir</Link>

            {/* CONFIGURACION */}
            <div className="relative inline-block">
              <button 
                onClick={() => setIsConfigOpen(!isConfigOpen)} 
                className="relative text-white font-bold py-3 px-5 mx-4 rounded-md transition-all duration-300 ease-in-out hover:text-[#d90f0f] hover:-translate-y-0.5 cursor-pointer">
                <i className="fas fa-cogs"></i> Configuración
              </button>
              {isConfigOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#333] rounded-md shadow-lg z-10">
                  <Link href="/cambiar" className="block text-white px-4 py-3 hover:bg-[#d90f0f]">
                  <i className="fas fa-key"></i> Cambiar Contraseña </Link>
                  <button onClick={() => router.push('/login')} 
                    className="block w-full text-left text-white px-4 py-3 hover:bg-[#d90f0f] ">
                    <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                  </button>
                </div>
              )}
          </div>
          </nav>
        </div>
      </header>

      {/* CONTENIDO DEL REGISTRO */}
      <div className="flex items-center justify-center p-4">
        <div className="bg-white bg-opacity-95 p-8 rounded-2xl shadow-xl w-full max-w-4xl mt-8">
          <div className="flex justify-between items-start mb-6">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-blue-800 mt-2 uppercase">Registro De Usuarios</h1>
            </div>
            <div className="w-10"></div>
          </div>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md mb-6 text-center animate-fadeIn">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500 text-white p-3 rounded-md mb-6 text-center animate-fadeIn">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2 text-left">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="codigo" className="block text-gray-700 font-medium mb-2 text-left">
                  Código de Estudiante *
                </label>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="Ingresa tu código de estudiante"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2 text-left">
                  Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ingresa tu número de teléfono"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-left">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@alumnos.udg.mx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
              <label htmlFor="rol" className="block text-gray-700 font-medium mb-2 text-left">
                Perfil *
              </label>
              <select
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              >
                <option value="">Selecciona un Perfil</option>
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>

              <div>
                <label htmlFor="carrera" className="block text-gray-700 font-medium mb-2 text-left">
                  Carrera *
                </label>
                <select
                  id="carrera"
                  name="carrera"
                  value={formData.carrera}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Selecciona tu carrera</option>
                  <option value="Ingeniería en Computación">Ingeniería en Computación</option>
                  <option value="Ingeniería Informática">Ingeniería Informática</option>
                  <option value="Licenciatura en Ciencias de la Computación">Licenciatura en Ciencias de la Computación</option>
                  <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
                  <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
                  <option value="Otra">Otra</option>
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2 text-left">
                  Contraseña *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Crea una contraseña segura"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2 text-left">
                  Confirmar Contraseña *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            {/* Botón de registro */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 ${!isLoading && 'transform hover:scale-105'}`}
              >
                {isLoading ? 'Registrando...' : 'Completar Registro'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-300 text-center">
            <p className="text-sm text-gray-500 mt-4">
              © 2024 Laboratorio Inventores. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
