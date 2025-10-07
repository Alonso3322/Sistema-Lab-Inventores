'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function ConfirmarCodigo() {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!codigo) {
      setError('Debes ingresar tu código de estudiante');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/cambiar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo_estudiante: codigo }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/confirmar_contrasena?codigo=${data.codigo_estudiante}&nombre=${encodeURIComponent(data.nombre)}`);
      } else {
        setError(data.message || 'El código no es válido');
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Confirmar Código</h1>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          <div className="flex justify-center mb-6">
            <Link
              href="/lista_usuarios"
              className="bg-[#027DF7] text-white px-6 py-3 rounded-lg hover:bg-[#54AFEB] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Regresar Listado
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Código Estudiante</label>
              <input
                type="text"
                name="codigo_estudiante"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded-lg transition-colors`}
            >
              {loading ? 'Verificando...' : 'Confirmar Código'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


