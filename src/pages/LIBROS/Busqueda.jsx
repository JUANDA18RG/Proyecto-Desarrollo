import React, { useState } from 'react';
import { LibrosData } from '../../data';
 
const Busqueda = ({ onBuscar }) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('');
  const [resultados, setResultados] = useState([]);
 
  // Obtener una lista única de categorías de LibrosData
  const categoriasUnicas = [...new Set(LibrosData.map((libro) => libro.categoria))];
  const autor = [...new Set(LibrosData.map((libro) => libro.Author))]
 
  const handleChange = (e) => {
    const nuevaBusqueda = e.target.value;
    setBusqueda(nuevaBusqueda);
 
    // Llama a la función onBuscar con la nueva búsqueda y filtro
    onBuscar(nuevaBusqueda, filtro);
  };
 
  const handleFiltroChange = (e) => {
    const nuevoFiltro = e.target.value;
    setFiltro(nuevoFiltro);
 
    // Llama a la función onBuscar con la nueva búsqueda y filtro
    onBuscar(busqueda, nuevoFiltro);
  };
 
  const BuscarLibro = (busqueda,filtro) => {
    const busquedaMinuscula = busqueda.toLowerCase();
    const autoresFiltrados = LibrosData.filter((libro) => {
      const autorMinuscula = libro.Author.toLowerCase();
      return autorMinuscula.includes(busquedaMinuscula)
      && (filtro === '' || libro.Author === filtro);
    });
 
    //Actualiza el estado de los resultados
    setResultados(autoresFiltrados);
 
    // Llama a la función externa onBuscar
    if(onBuscar) {
      onBuscar(autoresFiltrados);
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
        onClick = {BuscarLibro}
        className="px-4 py-6 bg-pink-500 rounded-r-md text-black font-bold" >
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
        <label className="text-black m-2">Filtro:</label>
        <select
          value={filtro}
          onChange={handleFiltroChange}
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
        <label className="text-black m-2">Author:</label>
        <select
          value={filtro}
          onChange={handleFiltroChange}
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
 
      {/* Mostrar resultados */}
      <div>
        {resultados.map((libro) => (
          <div key={libro.isbn}>{libro.Author}</div>
        ))}
      </div>
    </div>
  );
};
 
export default Busqueda;