// app/admin/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from './components/AdminLayout';
import ImpresionesList from './components/ImpresionesList';

export default function AdminProfilePage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticación y rol
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/verify-session');
        const data = await response.json();
        
        if (!response.ok) {
          router.push('/login');
          return;
        }
        
        if (data.rol === 'ADMIN') {
          router.push('/perfil_admin'); // Or a new route like /encargado
          return;
        }
        
        if (data.rol !== 'Coordinador') {
          router.push('/admin');
          return;
        }
        
        setUser(data);
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* Banner de Bienvenida */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-xl opacity-90">
            Bienvenido/a, {user?.nombre || 'Administrador'}
          </p>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <i className="fas fa-users text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Usuarios Activos</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <i className="fas fa-print text-green-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Impresiones Hoy</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <i className="fas fa-cogs text-purple-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Impresoras Activas</p>
                <p className="text-2xl font-bold">5/6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Impresiones */}
        <ImpresionesList />
      </div>
    </AdminLayout>
  );
}