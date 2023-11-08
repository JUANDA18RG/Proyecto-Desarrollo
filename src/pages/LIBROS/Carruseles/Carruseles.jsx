import React from "react";
import Historico from "./Historico";
import Romance from "./romance";
import Drama from "./Drama";
import Suspenso from "./Suspenso";
import Ensayo from "./Ensayo";

export default function Contenido() {
  return (
    <>
      <div id="Carrusel" className="px-5 py-5"></div>
      <div></div>
      <div className="mt-10">
        <div className="text-center">
          <h2 className=" bg-pink-600 inline-block mt-10 backdrop-blur-lg rounded-lg px-4 py-10 text-white text-5xl font-bold sm:text-5xl m-3 text-center">
            CATEGORIA DE LOS LIBROS
          </h2>
        </div>
        <Historico />
        <Romance />
        <Drama />
        <Suspenso />
        <Ensayo />
      </div>
    </>
  );
}
