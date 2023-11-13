import React from "react";
import Accion from "./Accion";
import Romance from "./romance";
import Drama from "./Drama";
import Suspenso from "./Suspenso";
import Terror from "./Terror";
import CienciaFiccion from "./CienciaFiccion";
import RealismoDegradado from "./RealimosDegradado";
import Policiacas from "./Policiacas";
import Mitologia from "./Mitologia";

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
        <Accion />
        <Romance />
        <Drama />
        <Suspenso />
        <Terror />
        <CienciaFiccion />
        <RealismoDegradado />
        <Policiacas />
        <Mitologia />
      </div>
    </>
  );
}
