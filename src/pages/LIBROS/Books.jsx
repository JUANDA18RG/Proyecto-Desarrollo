import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Busqueda from "./Busqueda";

const BookList = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/Books")
      .then((response) => {
        setAllBooks(response.data);
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los libros", error);
        setLoading(false);
      });
  }, []);

  const quitarAcentosYSepararEspacios = (texto) => {
    // Elimina tildes
    const textoSinTildes = texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    // Elimina espacios y convierte a minúsculas
    return textoSinTildes.toLowerCase().replace(/\s/g, "");
  };

  const handleBuscarLibro = ({
    busqueda,
    filtroCategoria,
    filtroAutor,
    disponibilidadFiltro,
  }) => {
    const busquedaNormalizada = quitarAcentosYSepararEspacios(busqueda);
    console.log(quitarAcentosYSepararEspacios("prueba")); // Prueba para la función de normalización

    const librosFiltrados = allBooks.filter((libro) => {
      const autorNormalizado = quitarAcentosYSepararEspacios(libro.autor);
      const tituloNormalizado = quitarAcentosYSepararEspacios(libro.titulo);
      console.log(
        `Busqueda: ${busquedaNormalizada}, Titulo: ${tituloNormalizado}`
      ); // Depuración de la comparación de búsqueda

      return (
        (autorNormalizado.includes(busquedaNormalizada) ||
          tituloNormalizado.includes(busquedaNormalizada)) &&
        (filtroCategoria === "" ||
          quitarAcentosYSepararEspacios(libro.genero) ===
            quitarAcentosYSepararEspacios(filtroCategoria)) &&
        (filtroAutor === "" ||
          autorNormalizado === quitarAcentosYSepararEspacios(filtroAutor)) &&
        (disponibilidadFiltro === "" ||
          quitarAcentosYSepararEspacios(libro.disponibilidad) ===
            quitarAcentosYSepararEspacios(disponibilidadFiltro))
      );
    });

    setBooks(librosFiltrados);

    if (librosFiltrados.length === 0) {
      setError("No se encontraron resultados.");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div id="Busqueda" className="px-5 py-5"></div>
      <div className="mt-10 mx-auto">
        <div className="text-center">
          <h2 className="bg-pink-600 mt-10 backdrop-blur-lg rounded-lg px-4 py-10 text-white text-5xl font-bold sm:text-5xl m-3 inline-block">
            BUSQUEDA DE LIBROS
          </h2>
        </div>

        <Busqueda onBuscar={handleBuscarLibro} />

        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle text-pink-600">
              <span className="hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="container m-auto py-10 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {books.map((libro) => (
                <div
                  key={libro.ISBN}
                  className="bg-white rounded-xl shadow-xl overflow-hidden duration-300 transform hover:scale-105 mt-5 hover:bg-pink-300"
                >
                  <Link to={`/book/${libro.ISBN}`} className="block">
                    <img
                      src={`http://localhost:4000${libro.portada}`}
                      alt={libro.titulo}
                      className="w-80 h-80 object-contain  mt-5 rounded items-center mx-auto"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-center mb-4">
                        {libro.titulo}
                      </h2>
                      <p className="text-gray-600 m-1 text-center">
                        <span className="font-semibold text-black">
                          {" "}
                          Author:
                        </span>{" "}
                        {libro.autor}
                      </p>
                      <p className="text-gray-600 m-1 text-center">
                        <span className="font-semibold text-black">
                          Categoria:
                        </span>{" "}
                        {libro.genero}
                      </p>
                    </div>
                    <div className="flex justify-center items-center text-gray-700 p-2 mx-auto">
                      <div className="flex items-center bg-green-400 rounded m-2">
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
                      <div className="flex items-center bg-red-400 rounded m-2">
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
                  <div className="flex items-center justify-center m-2 bg-white rounded ">
                    <span className="text-yellow-500 text-lg">
                      Valoración: {libro.valoracion}
                    </span>
                    <span className="p-2 bg-white rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="transparent"
                        className="w-10 h-10 text-yellow-500 animate-pulse"
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
              ))}
            </div>
          </>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default BookList;
