import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/booksdata/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del libro", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!book) {
    return <div>No se encontró el libro</div>;
  }

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div
        className="flex justify-center items-center h-screen"
        style={{
          backgroundImage:
            'url("https://c0.wallpaperflare.com/preview/879/548/39/italy-castello-venezia-acqua-alta-library-biblioteca.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-blue-400 bg-opacity-50 absolute inset-0"></div>
        <>
          <button
            className="absolute top-4 left-4 bg-pink-500 text-white p-6 shadow-lg rounded-full hover:bg-pink-600 hover:scale-105 transition duration-300 ease-in-out z-10"
            onClick={goBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <div key={book.id} className="w-1/2 max-w-md z-10 relative">
            <img
              src={`http://localhost:4000${book.image}`}
              alt={book.Titulo}
              className="w-full h-auto rounded-t-lg object-fi"
            />
            {book.Disponibles === 0 && (
              <img
                src="https://www.globalgiftgala.com/globalgiftgala/wp-content/uploads/2019/05/agotado.png"
                alt="Agotado"
                className="absolute top-0 left-0 w-full h-full"
              />
            )}
          </div>
          <div className="w-1/2 bg-white p-8 m-4 rounded z-10">
            <div className="border-b-4 border-pink-500 mb-4">
              <h2 className="text-5xl font-semibold text-center mb-6">
                {book.Titulo}
              </h2>
            </div>
            <h4 className="text-gray-700 text-lg">
              <span className="text-black text-xl font-semibold">Author: </span>
              {book.Author}
            </h4>
            <h4 className="text-gray-700 text-lg mt-2">
              <span className="text-black text-xl font-semibold">Año: </span>
              {book.year}
            </h4>
            <h4 className="text-gray-700 text-lg flex items-center">
              <span className="text-black text-xl font-semibold mr-2">
                Valoración:{" "}
              </span>
              {book.valoracion}
              <span className="p-2 bg-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="transparent"
                  className="w-10 h-10 text-yellow-500 animate-bounce"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    fill="yellow"
                  />
                </svg>
              </span>
            </h4>
            <div className="flex items-center">
              <p className="text-gray-700 mr-2 text-lg">
                <span className="text-black text-xl font-semibold">
                  Disponibles:{" "}
                </span>
              </p>
              <div className="bg-green-200 p-2 rounded-full flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-500 mr-2 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg text-green-700">
                  {book.Disponibles}
                </span>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <p className="text-gray-700 mr-2 text-lg">
                <span className="text-black text-xl font-semibold">
                  Prestados:{" "}
                </span>
              </p>
              <div className="bg-red-200 p-2 rounded-full flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-500 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg text-red-700">{book.Prestados}</span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-gray-700 mr-2 text-lg">
                <span className="text-black text-xl font-semibold">
                  Descripcion:{" "}
                </span>{" "}
                {book.description}
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <button
                disabled={book.Disponibles === 0}
                className={`${
                  book.Disponibles === 0
                    ? "bg-gray-500 cursor-not-allowed py-6 px-8 rounded"
                    : "bg-pink-500 hover:bg-pink-700 text-white font-bold py-6 px-8 rounded hover:scale-105 transition duration-500 ease-in-out"
                }`}
                onClick={() =>
                  book.Disponibles > 0 && navigate("/ReservationPage")
                }
              >
                <span className="text-lg"> Reservar Libro</span>
              </button>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default BookDetails;
