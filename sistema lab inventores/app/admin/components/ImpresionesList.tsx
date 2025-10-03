// app/admin/components/ImpresionesList.tsx
'use client';
import { useState, useEffect } from 'react';

interface Impresion {
  id: number;
  usuario: string;
  archivo: string;
  fecha: string;
  estado: 'Completada' | 'En progreso' | 'Fallida';
  duracion: string;
  impresora: string;
}

export default function ImpresionesList() {
  const [impresiones, setImpresiones] = useState<Impresion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImpresiones = async () => {
      try {
        // In a real implementation, you would make an API call here
        const mockData: Impresion[] = [
          {
            id: 1,
            usuario: 'Juan Pérez',
            archivo: 'pieza_robot.stl',
            fecha: '2024-01-15 14:30:00',
            estado: 'Completada',
            duracion: '2h 30m',
            impresora: 'Ender 3 Pro'
          },
          {
            id: 2,
            usuario: 'María García',
            archivo: 'engranaje.gcode',
            fecha: '2024-01-15 10:15:00',
            estado: 'Completada',
            duracion: '1h 45m',
            impresora: 'Creality CR-10'
          },
          {
            id: 3,
            usuario: 'Carlos López',
            archivo: 'prototipo_v1.stl',
            fecha: '2024-01-14 16:20:00',
            estado: 'Fallida',
            duracion: '45m',
            impresora: 'Prusa i3'
          },
          {
            id: 4,
            usuario: 'Ana Martínez',
            archivo: 'soporte_estructura.gcode',
            fecha: '2024-01-14 09:00:00',
            estado: 'Completada',
            duracion: '4h 15m',
            impresora: 'Ender 3 V2'
          }
        ];
        
        setImpresiones(mockData);
      } catch (error) {
        console.error('Error cargando impresiones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImpresiones();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Historial de Impresiones
        </h2>
        <p className="text-gray-600">Lista de archivos impresos por los usuarios</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Archivo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Impresora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duración
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {impresiones.map((impresion) => (
              <tr key={impresion.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {impresion.usuario}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono">
                    {impresion.archivo}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(impresion.fecha).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {impresion.impresora}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {impresion.duracion}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    impresion.estado === 'Completada' 
                      ? 'bg-green-100 text-green-800'
                      : impresion.estado === 'En progreso'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {impresion.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {impresiones.length === 0 && (
        <div className="text-center py-8">
          <i className="fas fa-print text-4xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">No hay impresiones registradas</p>
        </div>
      )}
    </div>
  );
}
