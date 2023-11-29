import React, { useState } from 'react';
import { LibrosData } from '../../data';

const Busqueda = ({ onBuscar }) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroAutor, setFiltroAutor] = useState('');
  const [disponibilidadFiltro, setDisponibilidadFiltro] = useState('');
  const [resultados, setResultados] = useState([]);

  const categoriasUnicas = [...new Set(LibrosData.map((libro) => libro.categoria))];
  const autor = [...new Set(LibrosData.map((libro) => libro.Author))];

  const handleChange = (e) => {
    const nuevaBusqueda = e.target.value;
    setBusqueda(nuevaBusqueda);
    onBuscar(nuevaBusqueda, filtroCategoria, filtroAutor, disponibilidadFiltro);
  };

  const handleFiltroCategoriaChange = (e) => {
    const nuevoFiltroCategoria = e.target.value;
    setFiltroCategoria(nuevoFiltroCategoria);
    onBuscar(busqueda, nuevoFiltroCategoria, filtroAutor, disponibilidadFiltro);
  };

  const handleFiltroAutorChange = (e) => {
    const nuevoFiltroAutor = e.target.value;
    setFiltroAutor(nuevoFiltroAutor);
    onBuscar(busqueda, filtroCategoria, nuevoFiltroAutor, disponibilidadFiltro);
  };

  const handleDisponibilidadFiltroChange = (e) => {
    const nuevaDisponibilidadFiltro = e.target.value;
    setDisponibilidadFiltro(nuevaDisponibilidadFiltro);
    onBuscar(busqueda, filtroCategoria, filtroAutor, nuevaDisponibilidadFiltro);
  };

  const realizarBusqueda = () => {
    const busquedaMinuscula = busqueda.toLowerCase();
    const librosFiltrados = LibrosData.filter((libro) => {
      const autorMinuscula = libro.Author.toLowerCase();
      return (
        autorMinuscula.includes(busquedaMinuscula) &&
        (filtroCategoria === '' || libro.categoria === filtroCategoria) &&
        (filtroAutor === '' || libro.Author === filtroAutor) &&
        (disponibilidadFiltro === '' || libro.disponibilidad === disponibilidadFiltro)
      );
    });

    setResultados(librosFiltrados);

    if (onBuscar) {
      onBuscar(librosFiltrados);
    }
  };

  return (
    <div className="mb-4 flex items-center">
      <div className="bg-pink-500 rounded-l-md px-2 py-1 animate-bounce text-xl font-bold m-4 rounded text-white">
        ¿Qué libro buscas?
      </div>
      <div className="flex-grow relative">
        <input
          type="text"
          placeholder="Buscar libro"
          value={busqueda}
          onChange={handleChange}
          className="px-4 py-6 rounded-l-md border-4 border-pink-500 w-[300px]"
        />

        <button
          onClick={realizarBusqueda}
          className="px-4 py-6 bg-pink-500 rounded-r-md text-black font-bold"
        >
          BUSCAR
        </button>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>

      <div className="px-2">
        <label className="text-black m-2">Filtro por Categoría:</label>
        <select
          value={filtroCategoria}
          onChange={handleFiltroCategoriaChange}
          className="border rounded-r-md px-2 py-1"
        >
          <option value="">Todos</option>
          {categoriasUnicas.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="px-2">
        <label className="text-black m-2">Filtro por Autor:</label>
        <select
          value={filtroAutor}
          onChange={handleFiltroAutorChange}
          className="border rounded-r flex px-2 py-1"
        >
          <option value="">Todos</option>
          {autor.map((Author) => (
            <option key={Author} value={Author}>
              {Author}
            </option>
          ))}
        </select>
      </div>

      <div className="px-2">
        <label className="text-black m-2">Disponibilidad:</label>
        <select
          value={disponibilidadFiltro}
          onChange={handleDisponibilidadFiltroChange}
          className="border rounded-r-md px-2 py-1"
        >
          <option value="">Cualquiera</option>
          <option value="Disponible">Disponible</option>
          <option value="No Disponible">No Disponible</option>
        </select>
      </div>

      <div>
        {/* Mostrar resultados */}
        {resultados.map((libro) => (
          <div key={libro.isbn}>{libro.Author}</div>
        ))}
      </div>
    </div>
  );
};

export default Busqueda;