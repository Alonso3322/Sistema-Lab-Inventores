// src/components/Hero.js
export default function Hero() {
  return (
    <section id="home" className="pt-28 pb-16 px-5 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-800 uppercase mb-6 animate-fade-in">
          ¡Bienvenidos a Klipper_Web!
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Klipper_Web es una plataforma innovadora dedicada a ofrecer servicios de calidad en el ámbito de la impresión 3D. 
          Explora nuestras herramientas y recursos para mejorar tus proyectos.
        </p>
      </div>
    </section>
  );
}