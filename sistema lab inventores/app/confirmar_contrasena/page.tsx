'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ConfirmarContrasena() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔹 Recuperar de la URL
  const codigo_estudiante = searchParams.get('codigo') || '';
  const nombre = searchParams.get('nombre') || '';

  const [formData, setFormData] = useState({
    codigo_estudiante,
    nombre,
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      codigo_estudiante,
      nombre
    }));
  }, [codigo_estudiante, nombre]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/confirmar_contrasena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo_estudiante: formData.codigo_estudiante,
          newPassword: formData.newPassword
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message);
        setTimeout(() => router.push('/lista_usuarios'), 2000);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Cambiar Contraseña</h1>

          {error && <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">{error}</div>}
          {success && <div className="bg-green-500 text-white p-3 rounded-md mb-4 text-center">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Código Estudiante</label>
              <input
                type="text"
                value={formData.codigo_estudiante}
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                value={formData.nombre}
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nueva Contraseña</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Confirmar Nueva Contraseña</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded-lg`}
            >
              {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
