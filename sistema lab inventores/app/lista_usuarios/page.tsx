'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define types for user
interface User {
  id_usuario: number;
  nombre: string;
  rol: string;
  estado: number;
  codigo_estudiante?: string;
  email?: string;
}

interface CurrentUser {
  nombre: string;
  rol: string;
}

export default function lista_usuarios() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const router = useRouter();

  // Verificar autenticación y cargar usuarios
  useEffect(() => {
    const checkAuthAndLoadUsers = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        
        const rol = data.rol || data.user?.rol;

        if (!response.ok || rol?.toUpperCase() !== "ADMIN") {
            router.push('/login');
            return;
          }
        
        
        setCurrentUser(data.user);
        await loadUsers();
      } catch (error) {
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoadUsers();
  }, [router]);

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/usuarios');
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // La búsqueda se maneja en el filtrado de la lista
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`/api/usuarios/${userToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: '✅ Usuario dado de baja exitosamente.' });
        await loadUsers();
      } else {
        setMessage({ type: 'error', text: '❌ No se logró actualizar la baja de usuario.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Error al eliminar usuario.' });
    }

    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const openDeleteModal = (userId: number) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.estado === 1 && 
    (user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.codigo_estudiante?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#d90f0f]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f4f4] text-[#333] font-sans">
      {/* Header */}
      <header className="bg-[#5802F7] text-white py-4 text-center shadow-lg">
        <img src="https://icaro.inventores.org/build/assets/images/Inventores.png" alt="Icono" className="w-24 h-20 mx-auto"/>
        <h1 className="text-2xl font-bold">Sistema Laboratorio</h1>
        <nav className="flex justify-center items-center mt-2 gap-4">
          <Link href="/perfil_admin" className="relative text-white font-bold py-3 px-5 mx-4 rounded-md transition-all duration-300 ease-in-out hover:text-[#d90f0f] hover:-translate-y-0.5">
            <i className="fas fa-user-shield"></i> Perfil Admin
          </Link>
          <Link href="/impresora_3D" className="relative text-white font-bold py-3 px-5 mx-4 rounded-md transition-all duration-300 ease-in-out hover:text-[#d90f0f] hover:-translate-y-0.5">
            <i className="fas fa-print"></i> Imprimir
          </Link>
          {(currentUser?.rol === 'ADMIN' || currentUser?.rol === 'Coordinador') && (
            <>
              <Link href="/lista_usuarios" className="relative text-white font-bold py-3 px-5 mx-4 rounded-md transition-all duration-300 ease-in-out hover:text-[#d90f0f] hover:-translate-y-0.5 text-[#d90f0f]">
                <i className="fas fa-users-cog"></i> Usuarios
              </Link>
            </>
          )}
          <div className="relative inline-block">
            <button onClick={() => setShowConfig(!showConfig)} className="relative text-white font-bold py-3 px-5 mx-4 rounded-md transition-all duration-300 ease-in-out hover:text-[#d90f0f] hover:-translate-y-0.5 cursor-pointer">
              <i className="fas fa-cogs"></i> Configuración
            </button>
            {showConfig && (
              <div className="absolute right-0 mt-2 w-48 bg-[#333] rounded-md shadow-lg z-10">
                <Link href="/cambiar" className="block text-white px-4 py-3 hover:bg-[#d90f0f]">
                  <i className="fas fa-key"></i> Cambiar Contraseña
                </Link>
                <button onClick={handleLogout} className="block w-full text-left text-white px-4 py-3 hover:bg-[#d90f0f]">
                  <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      
      {/* Contenido Principal */}
      <div className="p-5">
        <div className="my-5 p-5 bg-white rounded-lg shadow-xl animate-fadeInUp">
          <h2 className="text-center mt-0 text-[#061860] text-2xl font-bold mb-6">Lista de Usuarios Registrados</h2>
          
          {/* Barra de búsqueda */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-3 max-w-2xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-[#061860] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#d90f0f] focus:border-[#d90f0f] transition-all"
                placeholder="🔍 Buscar por nombre, email o código..."
              />
              <button
                type="submit"
                className="bg-[#061860] text-white px-6 py-3 rounded-lg hover:bg-[#d90f0f] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <i className="fas fa-search"></i> Buscar
              </button>
            </div>
          </form>

          {/* Botón Agregar Usuario */}
          <div className="flex justify-center mb-6">
            <Link
              href="/registro_usuarios"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <i className="fas fa-user-plus"></i> Agregar Nuevo Usuario
            </Link>
          </div>

          {/* Mensajes de respuesta */}
          {message && (
            <div className={`p-4 mb-6 rounded-lg text-center font-bold shadow-lg animate-fadeIn ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                : 'bg-red-100 text-red-800 border-2 border-red-300'
            }`}>
              {message.text}
            </div>
          )}

          {/* Tabla de usuarios */}
          <div className="bg-white rounded-lg border-2 border-[#061860] shadow-xl overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0">
                  <tr>
                    <th className="bg-[#061860] text-white text-center py-4 px-4 font-bold text-lg">
                      <i className="fas fa-user"></i> Nombre/Email
                    </th>
                    <th className="bg-[#061860] text-white text-center py-4 px-4 font-bold text-lg">
                      <i className="fas fa-id-card"></i> Código
                    </th>
                    <th className="bg-[#061860] text-white text-center py-4 px-4 font-bold text-lg">
                      <i className="fas fa-shield-alt"></i> Rol
                    </th>
                    <th className="bg-[#061860] text-white text-center py-4 px-4 font-bold text-lg">
                      <i className="fas fa-cogs"></i> Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr 
                        key={user.id_usuario}
                        className={`${
                          index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        } hover:bg-[#f0f8ff] transition-all duration-200 border-b border-gray-200`}
                      >
                        <td className="text-center py-4 px-4 font-medium">
                          <div className="flex items-center justify-center">
                            <i className="fas fa-user-circle text-[#061860] mr-2"></i>
                            {user.nombre}
                          </div>
                        </td>
                        <td className="text-center py-4 px-4 font-medium">
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {user.codigo_estudiante || 'N/A'}
                          </span>
                        </td>
                        <td className="text-center py-4 px-4">
                          <span className={`px-3 py-2 rounded-full text-sm font-bold shadow-md ${
                            user.rol === 'ADMIN' 
                              ? 'bg-red-100 text-red-800 border border-red-300' 
                              : 'bg-blue-100 text-blue-800 border border-blue-300'
                          }`}>
                            <i className={`fas ${user.rol === 'ADMIN' ? 'fa-crown' : 'fa-user'} mr-1`}></i>
                            {user.rol}
                          </span>
                        </td>
                        <td className="text-center py-4 px-4">
                          <div className="flex justify-center gap-2">
                            <Link
                              href={`/editar?user=${user.id_usuario}`}
                              className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-yellow-600 transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              title="Editar usuario"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button
                              onClick={() => openDeleteModal(user.id_usuario)}
                              className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              title="Eliminar usuario"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                            <Link
                              href={`/ver_usuario?user=${user.id_usuario}`}
                              className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              title="Ver detalles"
                            >
                              <i className="fas fa-eye"></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-gray-500">
                        <i className="fas fa-users text-4xl mb-3 block"></i>
                        <p className="text-lg">No se encontraron usuarios.</p>
                        <p className="text-sm">Intenta con otros términos de búsqueda.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mt-6 text-center text-gray-600">
            <p className="text-sm">
              <i className="fas fa-info-circle mr-1"></i>
              Mostrando {filteredUsers.length} de {users.filter(u => u.estado === 1).length} usuarios activos
            </p>
          </div>
        </div>
      </div>

      {/* Modal para eliminar usuario */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl animate-fadeInUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#061860]">
                <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                Confirmar Eliminación
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <p className="mb-6 text-gray-700 text-center">
              ¿Estás seguro de que deseas eliminar este usuario?<br/>
              <span className="text-red-600 font-bold">Esta acción no se puede deshacer.</span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 font-bold shadow-md hover:shadow-lg"
              >
                <i className="fas fa-times mr-2"></i>Cancelar
              </button>
              <button
                onClick={handleDeleteUser}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-bold shadow-md hover:shadow-lg"
              >
                <i className="fas fa-trash mr-2"></i>Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center p-5 bg-[#061860] text-white text-sm">
        <p>&copy; 2024 Laboratorio Inventores. Todos los derechos reservados.</p>
      </footer>
      
      {/* Script para FontAwesome */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"></script>
    </div>
  );
}