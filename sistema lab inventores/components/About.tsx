// src/components/About.js
export default function About() {
  return (
    <section id="about" className="py-16 px-5 bg-gray-50">
      <div className="container mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            Acerca de <span className="font-extrabold">KLIPPER</span>
          </h2>
          <p className="text-gray-700 mb-4">
            Klipper_Web es una plataforma innovadora dedicada a ofrecer servicios de calidad.
          </p>
          <p className="text-gray-700 mb-6">
            Sistema Operativo Klipper
            El sistema operativo Klipper es una solución innovadora para impresoras 3D que permite un control más eficiente y avanzado de las impresiones. 
            A diferencia de otros firmwares como Marlin, Klipper se ejecuta en una Raspberry Pi (o un sistema Linux) y envía comandos al controlador de la impresora, lo que permite una mayor velocidad y precisión en las impresiones, link de: 
            <a 
              href="https://www.klipper3d.org/Installation.html#configuring-klipper" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Descargar
            </a>
          </p>
          <div className="aspect-video max-w-4xl mx-auto">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/72cIpkpbtGU?si=fwe2NoztFwyR59Hk" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}