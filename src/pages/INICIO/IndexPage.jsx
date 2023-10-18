import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

export default function IndexPage() {
  return (
    <>
      <div className="relative">
        <div
          className="bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://www.castillalamancha.es/sites/default/files/styles/colorbox/public/documentos/fotografias/20200609/p1eac1hgipfor1pcntbi9941olm4.jpg?itok=ApoeJC54")',
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 backdrop-blur-lg opacity-50"
          ></div>
          <div
            className="flex items-center h-screen m-0 p-0 relative"
            style={{ zIndex: 1 }}
          >
            <div className="left flex-1 flex flex-col justify-center">
              <div className="flex flex-col items-center justify-center sm:gap-2">
                <h2
                  data-aos="fade-up"
                  className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-10 text-white text-5xl font-bold sm:text-6xl text-center m-3 "
                >
                  Bienvenido a BookFinder
                </h2>
                <TypeAnimation
                  data-aos="fade-up"
                  sequence={[
                    "Un libro a un click 📚",
                    2000,
                    "Donde soñar es leer ❤️",
                    2000,
                    "",
                  ]}
                  speed={30}
                  wrapper="h2"
                  repeat={Infinity}
                  className="text-orange-600 text-5xl font-bold sm:text-5xl bg-white bg-opacity-60 rounded-lg p-4"
                />
                <p className="text-[1.5rem] font-medium w-full md:w-3/4 mx-auto text-center text-black sm:text-[1.4rem]">
                  BookFinder es una plataforma que te permite encontrar tus libros y reservalos en nuestra biblioteca.
                </p>
                {/* Agregar botones para Login y Registro */}
                <div className="flex mt-4">
                    <Link
                      to="/login"
                      className="flex items-center bg-pink-600 text-white rounded-lg py-3 px-6 text-xl font-semibold hover:bg-pink-800 transition duration-300 mr-4"
                    >
                      Login in
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 ml-2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                    </Link>

                    <Link
                      to="/register"
                      className="flex items-center bg-blue-600 text-white rounded-lg py-3 px-6 text-xl font-semibold hover:bg-blue-800 transition duration-300"
                    >
                      Sign up
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 ml-2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                      </svg>
                    </Link>
                  </div>

              </div>
            </div>
            <div
              className="flex-1 flex items-center justify-center animate-bounce"
              style={{ zIndex: 1 }}
            >
              <div className="relative flex items-center">
                <div className="rounded-full overflow-hidden">
                  <img
                    className="object-cover w-96 h-96 lg:w-120 lg:h-120 border-4 "
                    src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80041.jpg"
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
