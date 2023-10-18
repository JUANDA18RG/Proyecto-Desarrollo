import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LibrosData } from '../../data';
import Busqueda from './Busqueda';

const BookList = () => {
  const [resultados, setResultados] = useState(LibrosData);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  const fictionBooks = LibrosData.filter((book) => book.categoria === 'accion');

  const buscarLibros = (termino, categoria) => {
    let librosFiltrados = LibrosData;

    if (termino) {
      librosFiltrados = librosFiltrados.filter((libro) =>
        libro.Titulo.toLowerCase().includes(termino.toLowerCase())
      );
    }

    if (categoria) {
      librosFiltrados = librosFiltrados.filter(
        (libro) => libro.categoria === categoria
      );
    }

    setResultados(librosFiltrados);
  };

  const handleCategoriaChange = (categoria) => {
    setFiltroCategoria(categoria);
    buscarLibros('', categoria); // Realizar la búsqueda al cambiar la categoría
  };

  return (
    <> 
    <div id='Busqueda' className='px-5 py-5'></div>
      <div></div>
      <div  className='mt-10'>
        <div className='text-center'>
          <h2 className="bg-pink-600 mt-10  backdrop-blur-lg rounded-lg px-4 py-10 text-white text-5xl font-bold sm:text-5xl m-3 text-center inline-block">
            BUSQUEDA DE LIBROS
          </h2>
        </div>
        <div className="container m-auto py-10">
          <Busqueda onBuscar={buscarLibros} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {resultados.length > 0 ? (
              resultados.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105 relative"
                >
                  <Link to={`/book/${book.id}`} className="block">
                    <img
                      src={book.image}
                      alt={book.Titulo}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold">{book.Titulo}</h2>
                      <p className="text-gray-600">Author: {book.Author}</p>
                      <div className="flex items-center mt-2">
                        <p className="text-green-600 mr-2">Disponibles:</p>
                        <div className="flex items-center">
                          <div className="bg-green-200 p-1 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="green"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <span className="text-green-600 ml-1 font-semibold">
                            {book.Disponibles}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <p className="text-red-600 mr-2">Reservados:</p>
                        <div className="flex items-center">
                          <div className="bg-red-200 p-1 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="red"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <span className="text-red-600 ml-1 font-semibold">
                            {book.Prestados}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="absolute bottom-4 right-4 flex items-center">
                    <span className="p-2 bg-white rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="transparent"
                        className="w-8 h-8 text-yellow-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          fill="yellow"
                        />
                      </svg>
                    </span>
                    <p className="text-yellow-700 text-center ml-1">
                      {book.valoracion}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center">
                <p className="text-6xl font-semibold opacity-50">
                  Libro no encontrado
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookList;
