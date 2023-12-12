import React from "react";

export default function Inicio() {
  const username = localStorage.getItem("username");
  return (
    <div id="Home" className="relative h-screen">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="Leyendo.mp4" type="video/mp4" />
          {/* Agrega múltiples fuentes de video para compatibilidad con diferentes navegadores */}
        </video>
        <div className="text-center">
          <h2
            data-aos="fade-up"
            className="bg-gradient-to-r from-pink-500 to-blue-500 backdrop-blur-lg rounded-lg p-10 text-white text-5xl font-bold sm:text-6xl m-3 relative z-5"
          >
            ¡Bienvenido a Book Finder {username}!
          </h2>
          <p className="bg-white bg-opacity-60 rounded-lg p-4 text-black text-2xl max-w-md mx-auto mt-4 relative z-5">
            Encuentra tus libros favoritos y descubre nuevas lecturas. ¡Explora
            nuestra colección y comienza a leer hoy mismo!
          </p>
        </div>
        <div style={{ height: "100px" }}></div>{" "}
        {/* Este div actúa como un espacio */}
        <div className="flex justify-center flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 z-10 text-pink-500 animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
