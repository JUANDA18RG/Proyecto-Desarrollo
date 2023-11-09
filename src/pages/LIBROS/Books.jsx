import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/Books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los libros", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div id="Busqueda" className="px-5 py-5"></div>
      <div className="mt-10">
        <div className="text-center">
          <h2 className="bg-pink-600 mt-10  backdrop-blur-lg rounded-lg px-4 py-10 text-white text-5xl font-bold sm:text-5xl m-3 text-center inline-block">
            BUSQUEDA DE LIBROS
          </h2>
        </div>
        <div className="container m-auto py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <p>Cargando libros...</p>
            ) : (
              books.map((libro) => (
                <div
                  key={libro.ISBN}
                  className="bg-white rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105 relative"
                >
                  <Link to={`/book/${libro.ISBN}`} className="block">
                    <img
                      src={`http://localhost:4000${libro.portada}`}
                      alt={libro.titulo}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold">{libro.titulo}</h2>
                      <p className="text-gray-600">Author: {libro.autor}</p>
                    </div>
                    <div className="text-gray-700 flex text-right">
                      <div className="flex items-center bg-green-400 m-2 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 m-1 text-green-800"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <p className="m-1 text-black">
                          {libro.copiasDisponibles}
                        </p>
                      </div>
                      <div className="flex items-center m-2 bg-red-400 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 m-1 text-red-800"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="m-1 text-black">
                          {libro.copiasReservadas}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex">
                    <div className="absolute bottom-0 right-2 flex items-center">
                      <span className="text-yellow-500">
                        {libro.valoracion}
                      </span>
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
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
