'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');

    if (!codigo.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo, password }),
      });

      const data = await response.json();
      console.log('DATOS RECIBIDOS DEL LOGIN:', data); // Para depurar

      if (response.ok) {
        if (data.user.rol === 'ADMIN') {
            router.push('/perfil_admin');   // Si es ADMIN va aquí
        } else if (data.user.rol === 'USER') {
            router.push('/perfil'); // Si es USER va aquí
        } else {
          setError('Rol no válido, contacta al administrador');
        }  
      }
    } catch (error) {
      setError('Error de conexión. Intenta nuevamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/vector-gratis/copia-espacio-azul-circuitos-fondo-digital_23-2148821699.jpg?semt=ais_incoming')" }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <Link href="/" className="text-orange-500 text-2xl font-bold mb-4 inline-block hover:text-orange-600">
          &#8592; Volver
        </Link>
        
        <div className="text-center mb-6">
          <img 
            src="https://icaro.inventores.org/build/assets/images/Inventores.png" 
            alt="Icono" 
            className="w-32 h-28 mx-auto"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Iniciar Sesión</h2>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center animate-fadeIn">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="codigo" className="block text-gray-700 font-medium mb-2 text-left">
              Código de Estudiante
            </label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ingresa tu código"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2 text-left">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="show-password" className="text-gray-700">
              Mostrar Contraseña
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center mt-6 text-gray-700">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-blue-600 font-bold hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
