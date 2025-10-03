import Link from 'next/link';

export const AppHeader = () => {
  return (
    <header className="bg-[#11034a] text-white py-4 text-center shadow-lg">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">Inicio</Link>
        <Link href="/usuarios" className="text-2xl font-bold">Usuarios</Link>
        <Link href="/perfil" className="text-2xl font-bold">Perfil</Link>
      </nav>
    </header>
  );
};