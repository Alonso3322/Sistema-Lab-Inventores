// src/components/Contact.js
const contactData = [
  {
    name: "José Luis David Bonilla Carranza",
    email: "jose.bcarranza@academicos.udg.mx",
    role: "Jefe de laboratorio | Coordinador de ICOM"
  },
  {
    name: "Luis Felipe Muñoz Mendoza",
    email: "luis.munoz.m@academicos.udg.mx",
    role: "Jefe de laboratorio | Coordinador de ICOM"
  },
  {
    name: "Cesar Emmanuel Gómez Martínez",
    email: "emmanuel.gomez4369@alumnos.udg.mx",
    role: "Coordinador del turno vespertino"
  }
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-5 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-amber-600 mb-10">Contacto</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {contactData.map((person, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 w-80 text-center shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-gray-800 truncate">{person.name}</h3>
              <p className="text-gray-600 my-2 break-words">{person.email}</p>
              <p className="text-gray-500 italic mb-4">{person.role}</p>
              <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${person.email}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
                title="Enviar correo desde Gmail"
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/561/561127.png" 
                  alt="Ícono de correo" 
                  className="w-10 h-10 mx-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.3920582857086!2d-103.32868122492984!3d20.65362268090354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b23aefb05221%3A0xb6faf0f888195513!2sBlvd.%20Gral.%20Marcelino%20Garc%C3%ADa%20Barrag%C3%A1n%201421%2C%20Ol%C3%ADmpica%2C%2044840%20Guadalajara%2C%20Jal.!5e0!3m2!1ses!2smx!4v1740434616735!5m2!1ses!2smx" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
}