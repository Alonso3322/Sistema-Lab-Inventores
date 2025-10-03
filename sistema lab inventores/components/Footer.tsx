// src/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 px-5 text-center">
      <div className="container mx-auto">
        <img 
          src="https://icaro.inventores.org/build/assets/images/logoB.png" 
          alt="Logo Inventores" 
          className="w-64 h-14 mx-auto mb-6"
        />
        
        <h3 className="text-lg text-blue-600 mb-6">¡Síguenos en nuestras redes sociales!</h3>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://www.facebook.com/Comunidadinventores" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://icaro.inventores.org/build/assets/images/image-1.png" 
              alt="Facebook" 
              className="w-10 h-10 hover:scale-110 transition-transform"
            />
          </a>
          <a href="https://www.instagram.com/inventores_lab_cucei/" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://icaro.inventores.org/build/assets/images/image-4.png" 
              alt="Instagram" 
              className="w-10 h-10 hover:scale-110 transition-transform"
            />
          </a>
          <a href="https://www.tiktok.com/@inventoresudg" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://icaro.inventores.org/build/assets/images/tiktok.png" 
              alt="TikTok" 
              className="w-10 h-10 hover:scale-110 transition-transform"
            />
          </a>
        </div>

        <div className="mb-6">
          <h3 className="text-lg text-blue-600">
            ¡Visita nuestro{' '}
            <a 
              href="https://inventores.org/blog/" 
              className="text-blue-600 hover:underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              blog
            </a>
            !
          </h3>
        </div>

        <div className="mb-4">
          <h2 className="text-sm">
            <a 
              href="https://www.udg.mx/es/" 
              className="text-blue-600 hover:underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              UNIVERSIDAD DE GUADALAJARA CENTRO UNIVERSITARIO DE CIENCIAS EXACTAS E INGENIERÍAS
            </a>
          </h2>
        </div>

        <div>
          <h2 className="text-sm text-blue-600">
            Blvd. Marcelino García Barragán #1421, esq Calzada Olímpica, C.P. 44430, Guadalajara, Jalisco, México.
          </h2>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-300">
          <p className="text-gray-600">
            &copy; 2024 Klipper_Web. Universidad de Guadalajara.
          </p>
        </div>
      </div>
    </footer>
  );
}