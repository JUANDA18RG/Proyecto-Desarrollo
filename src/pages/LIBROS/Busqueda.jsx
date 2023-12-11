import React, { useState } from "react";
import { LibrosData } from "../../data";

const Busqueda = ({ onBuscar }) => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroAutor, setFiltroAutor] = useState("");
  const [disponibilidadFiltro, setDisponibilidadFiltro] = useState("");
  const [resultados, setResultados] = useState([]);

  const categoriasUnicas = [
    ...new Set(LibrosData.map((libro) => libro.categoria)),
  ];
  const autoresUnicos = [...new Set(LibrosData.map((libro) => libro.Author))];

  const realizarBusqueda = () => {
    const busquedaMinuscula = busqueda.toLowerCase();

    const librosFiltrados = LibrosData.filter((libro) => {
      const autorMinuscula = libro.Author.toLowerCase();
      return (
        autorMinuscula.includes(busquedaMinuscula) &&
        (filtroCategoria === "" || libro.categoria === filtroCategoria) &&
        (filtroAutor === "" || libro.Author === filtroAutor) &&
        (disponibilidadFiltro === "" ||
          libro.disponibilidad === disponibilidadFiltro)
      );
    });

    setResultados(librosFiltrados);

    if (onBuscar) {
      onBuscar({
        busqueda: busqueda,
        filtroCategoria: filtroCategoria,
        filtroAutor: filtroAutor,
        disponibilidadFiltro: disponibilidadFiltro,
      });
    }
  };

  const handleInputChange = (e) => {
    const nuevaBusqueda = e.target.value;
    setBusqueda(nuevaBusqueda);
    realizarBusqueda();
  };

  const handleCategoriaChange = (e) => {
    const nuevaCategoria = e.target.value;
    setFiltroCategoria(nuevaCategoria);
    realizarBusqueda();
  };

  const handleAutorChange = (e) => {
    const nuevoAutor = e.target.value;
    setFiltroAutor(nuevoAutor);
    realizarBusqueda();
  };

  const handleDisponibilidadChange = (e) => {
    const nuevaDisponibilidad = e.target.value;
    setDisponibilidadFiltro(nuevaDisponibilidad);
    realizarBusqueda();
  };

  return (
    <div className="mt-5 p-4 bg-pink-300 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 m-1">Buscar Libros:</h2>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar libro"
          value={busqueda}
          onChange={handleInputChange}
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500"
        />
        <select
          value={filtroCategoria}
          onChange={handleCategoriaChange}
          className="w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500"
        >
          <option value="">Todas las categorías</option>
          {categoriasUnicas.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        <select
          value={filtroAutor}
          onChange={handleAutorChange}
          className="w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500"
          dir="auto"
        >
          <option value="">Todos los autores</option>
          {autoresUnicos.map((autor) => (
            <option key={autor} value={autor}>
              {autor}
            </option>
          ))}
        </select>
        <select
          value={disponibilidadFiltro}
          onChange={handleDisponibilidadChange}
          className="w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500"
        >
          <option value="">Cualquier disponibilidad</option>
          <option value="Disponible">Disponible</option>
          <option value="No Disponible">No Disponible</option>
        </select>
        <button
          onClick={realizarBusqueda}
          className="
          hover:scale-105 transition-all duration-200 ease-in
          px-6 py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-700 focus:outline-none focus:bg-pink-600"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Busqueda;
