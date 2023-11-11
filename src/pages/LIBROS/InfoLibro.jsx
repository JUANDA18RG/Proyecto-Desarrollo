export default function InfoSection() {
  return (
    <div id="Info" className="flex items-center mt-10 mb-10 mx-auto">
      <div className="w-1/2 ml-32">
        <div className="text-center mx-auto">
          <h2 className="bg-pink-600 inline-block mt-10 backdrop-blur-lg rounded-lg px-4 py-10 text-white text-5xl font-bold sm:text-5xl m-3 text-center">
            INFORMACION DE LOS LIBROS
          </h2>
        </div>
        <div className="bg-white p-7 rounded-lg mt-4">
          <p className="text-2xl text-justify">
            {/* Contenido de la izquierda */}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
            qui quas, iste ut aperiam mollitia maiores, distinctio dolores animi
            laudantium nobis aut! Iste aspernatur perspiciatis necessitatibus?
            Vero veritatis accusantium excepturi. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Assumenda qui omnis odio laudantium
            iusto nam nulla excepturi quod, fugit optio neque deserunt sed
            aperiam? Fugit quidem ducimus quisquam voluptatem libero. Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Quae neque
            mollitia tempora consequuntur, quas odit placeat dolor est aperiam
            non eligendi laborum aliquam ex tenetur ratione. Laborum repudiandae
            perferendis inventore! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Iste, voluptatem! Facilis alias, assumenda eum sed
            labore, unde quidem accusamus, fuga suscipit similique quos eaque
            quo minus libero. Deleniti, sit vitae.
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
              <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-pink-500 text-white relative z-10 title-font font-medium text-sm">
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
                    Shooting Stars
                  </h2>
                  <p class="leading-relaxed">
                    VHS cornhole pop-up, try-hard 8-bit iceland helvetica.
                    Kinfolk bespoke try-hard cliche palo santo offal.
                  </p>
                </div>
              </div>
            </div>
            <div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-pink-500 text-white relative z-10 title-font font-medium text-sm">
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
                    The Catalyzer
                  </h2>
                  <p class="leading-relaxed">
                    VHS cornhole pop-up, try-hard 8-bit iceland helvetica.
                    Kinfolk bespoke try-hard cliche palo santo offal.
                  </p>
                </div>
              </div>
            </div>
            <div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-pink-500 text-white relative z-10 title-font font-medium text-sm">
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
                    The 400 Blows
                  </h2>
                  <p class="leading-relaxed">
                    VHS cornhole pop-up, try-hard 8-bit iceland helvetica.
                    Kinfolk bespoke try-hard cliche palo santo offal.
                  </p>
                </div>
              </div>
            </div>
            <div class="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
              <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-pink-500 text-white relative z-10 title-font font-medium text-sm">
                4
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
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
                    Neptune
                  </h2>
                  <p class="leading-relaxed">
                    VHS cornhole pop-up, try-hard 8-bit iceland helvetica.
                    Kinfolk bespoke try-hard cliche palo santo offal.
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
