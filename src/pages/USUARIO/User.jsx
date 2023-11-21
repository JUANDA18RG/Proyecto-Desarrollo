import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HistorialReservas = ({ usuario }) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/historeservas/${usuario}`)
      .then((response) => {
        setReservas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener historial de reservas:", error);
        setLoading(false);
      });
  }, [usuario]);

  return (
    <div className="">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle text-pink-600">
            <span className="hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ul>
          {reservas.length === 0 ? (
            <p className="mx-auto text-2xl">No se han hecho reservas.</p>
          ) : (
            reservas.map((reserva) => (
              <div className="mb-8 p-10 rounded-lg border-2 border-pink-500 flex items-center max-w-2xl mx-auto shadow-lg hover:bg-pink-300 transition duration-300 ease-in-out">
                <div className="image-container">
                  <img
                    src={`http://localhost:4000/${reserva.libro.portada}`}
                    alt={`Portada de ${reserva.libro.titulo}`}
                    className="w-48 h-64 object-cover rounded-md"
                  />
                </div>

                <div className="ml-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {reserva.libro.titulo}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    ISBN: {reserva.libro.isbn}
                  </p>
                  <p className="text-gray-600 mb-2">Estado: {reserva.estado}</p>
                  <p className="text-gray-600 mb-2">
                    Reservado el:{" "}
                    {new Date(reserva.fechaReserva).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Devolución el:{" "}
                    {new Date(reserva.fechaDevolucion).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

const LibraryProfile = () => {
  const [UserData, setUserData] = useState({
    Name: "Nombre del usuario",
    UserName: "UserName",
    email: "correo@ejemplo.com",
  });

  const goBack = () => {
    window.history.back();
  };

  const username = localStorage.getItem("username");

  const [userComments, setUserComments] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const [activeOption, setActiveOption] = useState("comments");

  useEffect(() => {
    setTimeout(() => {
      setUserComments([
        { id: 1, text: "Comentario 1" },
        { id: 2, text: "Comentario 2" },
      ]);

      setRecommendedBooks([
        { id: 1, title: "Libro Recomendado 1" },
        { id: 2, title: "Libro Recomendado 2" },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <button
        className="absolute top-4 left-4 bg-pink-500 text-white p-6 shadow-lg rounded-full hover:bg-pink-700 hover:text-white"
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
      </button>{" "}
      <button
        className="absolute top-4 left-4 bg-pink-500 text-white p-6 shadow-lg rounded-full hover:bg-pink-600 hover:scale-105 transition duration-300 ease-in-out"
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
      <div className="bg-gray-100 w-screen">
        <div className="bg-pink-500">
          <div
            className="bg-cover bg-center h-full w-full"
            style={{
              backgroundImage: `url('https://c1.wallpaperflare.com/preview/821/335/782/book-reading-hand-legs.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="bg-pink-500  bg-opacity-50 h-full w-full p-8 text-center">
              <div className="m-5 mt-16 inline-block">
                <h1 className="text-5xl font-bold sm:text-5xl bg-white bg-opacity-60 rounded-lg p-4">
                  {username}
                </h1>
              </div>
              <h2 className="text-2xl font-semibold">{UserData.Name}</h2>
              <p className="text-gray-600">{UserData.email}</p>
              <div className="flex items-center justify-center">
                <Link
                  to={"/EditUser"}
                  className="bg-white text-pink-600 font-semibold py-2 px-4 rounded-full hover:scale-110 transition duration-300 flex items-center m-2"
                >
                  Editar Perfil
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-8 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md ">
            <div className="mb-8 flex justify-center space-x-8">
              <button
                className={`${
                  activeOption === "comments"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } font-semibold py-2 px-4 rounded`}
                onClick={() => setActiveOption("comments")}
              >
                Mis Comentarios
              </button>
              <button
                className={`${
                  activeOption === "recommended"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } font-semibold py-2 px-4 rounded`}
                onClick={() => setActiveOption("recommended")}
              >
                Mis favoritos
              </button>
              <button
                className={`${
                  activeOption === "reservations"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } font-semibold py-2 px-4 rounded`}
                onClick={() => setActiveOption("reservations")}
              >
                Historial de Reservas
              </button>
            </div>
            {activeOption === "comments" && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Mis Comentarios</h2>
                <ul>
                  {userComments.map((comment) => (
                    <li key={comment.id}>{comment.text}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeOption === "recommended" && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Mis Favoritos</h2>
                <ul>
                  {recommendedBooks.map((book) => (
                    <li key={book.id}>{book.title}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeOption === "reservations" && (
              <HistorialReservas usuario={username} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryProfile;
