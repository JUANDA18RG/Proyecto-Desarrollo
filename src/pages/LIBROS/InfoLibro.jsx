export default function InfoSection() {
  return (
    <div id="Info" className="flex items-center mt-10 mb-10 mx-auto">
      <div className="w-1/2 ml-32">
        <div className="text-center mx-auto">
          <h2 className="bg-pink-600 inline-block mt-10 backdrop-blur-lg rounded-lg px-4 py-10 text-white text-5xl font-bold sm:text-5xl m-3 text-center">
            INFORMACION DE LA PAGINA
          </h2>
        </div>
        <div className="bg-white p-7 rounded-lg mt-4">
          <p className="text-2xl text-justify">
            {/* Contenido de la izquierda */}
            BookFinder es mucho más que una plataforma web; es una revolución en
            la gestión de bibliotecas y la forma en que los usuarios interactúan
            con la vasta riqueza de conocimientos que estas albergan. Tanto para
            los administradores como para los usuarios, BookFinder se erige como
            un faro de eficiencia, simplificando cada paso del proceso, desde la
            búsqueda hasta la reserva y el seguimiento de libros. Con una
            interfaz amigable y dinámica, BookFinder se ha creado pensando en la
            comodidad del usuario. La complejidad se reduce a la esencia,
            permitiendo a los usuarios navegar fácilmente por la plataforma y
            descubrir tesoros literarios con apenas unos clics. La experiencia
            de reserva de libros se ha optimizado para ser intuitiva, ágil y,
            sobre todo, gratificante.
          </p>
        </div>
      </div>

      {/* Contenido de la derecha centrado */}
      <div className="w-1/2 flex items-center justify-center">
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto flex flex-wrap">
            <div class="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
              <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-pink-500 text-white relative z-5 title-font font-medium text-sm">
                1
              </div>
              <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div class="flex-shrink-0 w-24 h-24 bg-pink-100 text-pink-500 rounded-full inline-flex items-center justify-center animate-bounce">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-12 h-12"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
                    Reserva de Libros
                  </h2>
                  <p class="leading-relaxed text-justify text-sm">
                    La reserva de libros se ha simplificado hasta el último
                    clic. Los usuarios pueden verificar fácilmente la
                    disponibilidad de los libros deseados y reservarlos con un
                    proceso claro y directo. Las fechas de finalización de
                    préstamos se presentan de manera prominente, brindando a los
                    usuarios un control total sobre sus lecturas planificadas.
                  </p>
                </div>
              </div>
            </div>
            <div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-pink-500 text-white relative z-5 title-font font-medium text-sm">
                2
              </div>
              <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div class="flex-shrink-0 w-24 h-24 bg-pink-100 text-pink-500 rounded-full inline-flex items-center justify-center animate-bounce">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-12 h-12"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
                    Gestión de Perfil
                  </h2>
                  <p class="leading-relaxed text-justify text-sm">
                    El perfil del usuario es su espacio personal, y BookFinder
                    se asegura de que sea completamente gestionable. El registro
                    es rápido y seguro, y una vez dentro, los usuarios pueden
                    ver de un vistazo los libros que tienen reservados, las
                    fechas de devolución y su historial de comentarios. La
                    experiencia de usuario se adapta a las preferencias
                    individuales, haciendo que cada interacción sea única y
                    memorable.
                  </p>
                </div>
              </div>
            </div>
            <div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-pink-500 text-white relative z-5 title-font font-medium text-sm">
                3
              </div>
              <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div class="flex-shrink-0 w-24 h-24 bg-pink-100 text-pink-500 rounded-full inline-flex items-center justify-center animate-bounce">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-12 h-12"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="5" r="3"></circle>
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                  </svg>
                </div>
                <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
                    Exploración de la Biblioteca:
                  </h2>
                  <p class="leading-relaxed text-justify text-sm">
                    La colección completa de la biblioteca se presenta de manera
                    atractiva, con portadas vibrantes, descripciones detalladas
                    y opciones de filtrado que permiten a los usuarios
                    personalizar su búsqueda. Ya sea que estén buscando un
                    género específico, siguiendo a un autor favorito o
                    simplemente explorando, BookFinder ofrece una experiencia de
                    exploración que va más allá de las expectativas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
