// app/registro/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    telefono: '',
    email: '',
    carrera: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

    // Validaciones
    if (!formData.nombre || !formData.codigo || !formData.email || !formData.password || !formData.carrera) {
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
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registro exitoso. Redirigiendo al login...');
        setTimeout(() => {
          router.push('/login');
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/vector-gratis/copia-espacio-azul-circuitos-fondo-digital_23-2148821699.jpg?semt=ais_incoming')" }}>
      <div className="bg-white bg-opacity-95 p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-start mb-6">
          <Link href="/login" className="text-orange-500 text-2xl font-bold hover:text-orange-600">
            &#8592; Volver
          </Link>
          <div className="text-center flex-1">
            <img 
              src="https://icaro.inventores.org/build/assets/images/Inventores.png" 
              alt="Icono" 
              className="w-24 h-20 mx-auto"
            />
            <h1 className="text-3xl font-bold text-blue-800 mt-2 uppercase">Registro</h1>
          </div>
          <div className="w-10"></div> {/* Espaciador para equilibrar el diseño */}
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

          {/* Botón de registro - ocupa ambas columnas */}
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
          <p className="text-gray-700">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-blue-600 font-bold hover:underline">
              Inicia Sesión
            </Link>
          </p>
          <p className="text-sm text-gray-500 mt-4">
            © 2024 Laboratorio Inventores. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}