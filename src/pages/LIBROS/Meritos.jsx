import React from "react";

export default function Meritos() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <button
        className="absolute top-4 left-4 bg-pink-500 text-white p-6 shadow-lg rounded-full hover:bg-pink-600 hover:scale-105 transition duration-300 ease-in-out"
        onClick={goBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="text-center">
        <h2 className=" bg-pink-600 inline-block mt-10 backdrop-blur-lg rounded-lg px-4 py-10 text-white text-5xl font-bold sm:text-5xl m-2 text-center">
          Desarrolladores de BookFinder
        </h2>
      </div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-18 mx-auto m-10">
          <div class="flex flex-wrap -m-4">
            <div class="lg:w-1/3 lg:mb-0 p-4">
              <div class="h-full text-center">
                <img
                  alt="testimonial"
                  class="mt-5 animate-bounce w-40 h-40 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="src/assets/Jennifer.png"
                ></img>
                <p class="leading-relaxed">
                  <span class="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4"></span>
                </p>
                <h2 class="text-gray-900 font-medium title-font tracking-wider text-xl">
                  Jennifer Castaño Ledesma
                </h2>
                <p class="text-gray-500">Desarrollador Backend</p>
              </div>
            </div>
            <div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div class="h-full text-center">
                <img
                  alt="testimonial"
                  class="mt-5 animate-bounce w-40 h-40 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="src/assets/Nicolas.png"
                ></img>
                <p class="leading-relaxed">
                  <span class="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4"></span>
                </p>
                <h2 class="text-gray-900 font-medium title-font tracking-wider text-xl">
                  Nicolas Arturo Valencia
                </h2>
                <p class="text-gray-500">Desarrollador Backend</p>
              </div>
            </div>
            <div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div class="h-full text-center">
                <img
                  alt="testimonial"
                  class="mt-5 animate-bounce w-40 h-40 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="src/assets/Kevin.png"
                ></img>
                <p class="leading-relaxed">
                  <span class="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4"></span>
                </p>

                <h2 class="text-gray-900 font-medium title-font tracking-wider text-xl">
                  Kevin Andrés Acosta
                </h2>
                <p class="text-gray-500">Desarrollador Backend</p>
              </div>
            </div>

            <div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div class="h-full text-center">
                <img
                  alt="testimonial"
                  class="mt-5 animate-bounce w-40 h-40 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="src/assets/Andrea.png"
                ></img>
                <p class="leading-relaxed">
                  <span class="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4"></span>
                </p>
                <h2 class="text-gray-900 font-medium title-font tracking-wider text-xl">
                  Mónica Andrea Cifuentes
                </h2>
                <p class="text-gray-500">Desarrollador Frontend</p>
              </div>
            </div>
            <div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div class="h-full text-center">
                <img
                  alt="testimonial"
                  class="mt-5 animate-bounce w-40 h-40 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="src/assets/Juan.png"
                ></img>
                <p class="leading-relaxed">
                  <span class="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4"></span>
                </p>
                <h2 class="text-gray-900 font-medium title-font tracking-wider text-xl">
                  Juan David Ramirez Grismaldo
                </h2>
                <p class="text-gray-500">Desarrollador Frontend</p>
              </div>
            </div>
            <div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div class="h-full text-center">
                <img
                  alt="testimonial"
                  class="mt-5 animate-bounce w-40 h-40 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="src/assets/Santiago.png "
                ></img>
                <p class="leading-relaxed">
                  <span class="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4"></span>
                </p>
                <h2 class="text-gray-900 font-medium title-font tracking-wider text-xl">
                  Santiago Garcia Gil
                </h2>
                <p class="text-gray-500">Desarrollador Frontend</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
