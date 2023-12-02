import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

/*hola*/
const HistorialReservas = ({ usuario }) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/historeservas/${encodeURIComponent(usuario)}`)
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
    <div className="flex-col">
      {loading ? (
        <div class="flex items-center justify-center min-h-screen">
          <div class="flex items-center justify-center">
            <div class="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle text-pink-600">
              <span class="hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <ul className="list-none">
          {reservas.length === 0 ? (
            <p className="text-lg text-center">No se han hecho reservas.</p>
          ) : (
            reservas.map((reserva) => (
              <div
                key={reserva.id}
                className="p-4 border-4 border-pink-500 shadow-xl flex items-center justify-center max-w-3xl mx-auto mb-8"
              >
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={`http://localhost:4000/${reserva.libro.portada}`}
                    alt={`Portada de ${reserva.libro.titulo}`}
                    className="w-96 h-96 object-contain rounded"
                  />
                </div>
                <div className=" flex flex-col items-center">
                  <h3 className="text-2xl text-gray-800 font-semibold m-2">
                    ID de la reserva: {reserva.id}
                  </h3>
                  <p className="text-gray-600 text-2xl m-2">
                    <span className="text-gray-800 font-semibold">Título:</span>{" "}
                    {reserva.libro.titulo}
                  </p>
                  <p className="text-gray-600 text-2xl ml-2 m-2">
                    <span className="text-gray-800 font-semibold">ISBN:</span>{" "}
                    {reserva.libro.isbn}
                  </p>
                  <p className="text-gray-600 text-2xl ml-2 m-2">
                    <span className="text-gray-800 font-semibold">Estado:</span>{" "}
                    {reserva.estado}
                  </p>
                  <div className="mt-5">
                    <button
                      onClick={() => navigate(`/detalleReserva/${reserva.id}`)}
                      className="bg-pink-500 hover:bg-pink-700 text-white font-bold p-6 rounded hover:scale-105 transition duration-500 ease-in-out"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

const HistorialComentarios = ({ usuario }) => {
  const [loading, setLoading] = useState(true);
  const [valoracion, setValoracion] = useState([]);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [ratingToDelete, setRatingToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/histovaloraciones/${encodeURIComponent(usuario)}`
      )
      .then((response) => {
        setValoracion(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener historial de valoraciones:", error);
        setLoading(false);
      });
  }, [usuario]);

  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starType =
        i <= Math.floor(rating)
          ? "full"
          : i - Math.floor(rating) === 0.5
          ? "half"
          : "empty";
      stars.push(
        <span
          key={i}
          className={`text-5xl ${
            starType === "full" ? "text-yellow-400" : "text-yellow-300"
          }`}
        >
          {starType === "full" ? "★" : starType === "half" ? "★" : "☆"}
        </span>
      );
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  //eliminar comentarios
  const handleDeleteComment = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/eliminarComentario/${commentToDelete.id}`
      );
      setValoracion((prevValoracion) =>
        prevValoracion.filter((comment) => comment.id !== commentToDelete.id)
      );
      showSuccessAlert("¡Comentario eliminado!");
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      showErrorAlert("Hubo un error al eliminar el comentario.");
    } finally {
      setCommentToDelete(null);
    }
  };
  //eliminar valoracion
  const handleDeleteRating = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/eliminarValoracion/${ratingToDelete.id}`
      );
      setValoracion((prevValoracion) =>
        prevValoracion.filter((rating) => rating.id !== ratingToDelete.id)
      );
      showSuccessAlert("¡Valoración eliminada!");
    } catch (error) {
      console.error("Error al eliminar valoración:", error);
      showErrorAlert("Hubo un error al eliminar la valoración.");
    } finally {
      setRatingToDelete(null);
    }
  };

  const showSuccessAlert = (message) => {
    Swal({
      title: message,
      icon: "success",
    });
  };

  const showErrorAlert = (message) => {
    Swal({
      title: "Error",
      text: message,
      icon: "error",
    });
  };
  //alerta para confirmar la eliminacion del comentario
  const showCommentConfirmation = (comment) => {
    setCommentToDelete(comment);
    Swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este comentario.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDeleteComment();
      } else {
        showErrorAlert("El comentario no ha sido eliminado.");
      }
    });
  };
  //alerta para confirmar la eliminacion de la valoracion
  const showRatingConfirmation = (rating) => {
    setRatingToDelete(rating);
    Swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminada, no podrás recuperar esta valoración.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDeleteRating();
      } else {
        showErrorAlert("La valoración no ha sido eliminada.");
      }
    });
  };

  return (
    <div className="flex-col">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center justify-center">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle text-pink-600">
              <span className="hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <ul className="list-none">
          {valoracion.length === 0 ? (
            <p className="text-lg text-center">No se han hecho comentarios.</p>
          ) : (
            valoracion.map((comentarios) => (
              <div
                key={comentarios.id}
                className="comment-container mb-8 p-8 rounded  flex items-center border-4 border-pink-500 shadow-xl"
              >
                <img
                  src={`http://localhost:4000/${comentarios.libro.portada}`}
                  alt={`Portada de ${comentarios.libro.titulo}`}
                  className="w-96 h-96 object-contain rounded"
                />
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-800 font-semibold m-2">
                    ISBN: {comentarios.libro.isbn}
                  </h3>
                  <p className="text-gray-600 text-2xl m-2">
                    <span className="text-gray-800 font-semibold">Título:</span>{" "}
                    {comentarios.libro.titulo}
                  </p>
                  <p className="text-gray-600 text-2xl text-justify m-2">
                    <span className="text-gray-800 font-semibold">
                      Comentario:
                    </span>{" "}
                    {comentarios.comentario}
                  </p>
                  <p className="text-gray-600 text-2xl flex items-center m-2">
                    <span className="font-semibold text-gray-800 mr-2 ">
                      Valoración:
                    </span>
                    <StarRating rating={comentarios.valoracion} />
                  </p>
                  <div className="flex p-4 items-center justify-center space-x-4 mt-3">
                    <button
                      onClick={() => {
                        navigate(
                          `/editarComentario/${comentarios.libro.isbn}`,
                          {
                            state: { comentario: comentarios },
                          }
                        );
                      }}
                      className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded hover:scale-105 transition duration-500 ease-in-out m-2"
                    >
                      Editar comentario
                    </button>
                    <button
                      onClick={() => showCommentConfirmation(comentarios)}
                      className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded hover:scale-105 transition duration-500 ease-in-out m-2"
                    >
                      Eliminar comentario
                    </button>
                    <button
                      onClick={() => showRatingConfirmation(comentarios)}
                      className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded hover:scale-105 transition duration-500 ease-in-out m-2"
                    >
                      Eliminar valoración
                    </button>
                  </div>
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
  const navigate = useNavigate();
  const [UserData, setUserData] = useState({
    Name: "Nombre del usuario",
    UserName: "UserName",
    email: "correo@ejemplo.com",
  });

  const goBack = () => {
    window.history.back();
  };

  const goToInicio = () => {
    navigate("/contenido");
  };

  const username = localStorage.getItem("username");

  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const [activeOption, setActiveOption] = useState("comments");

  useEffect(() => {
    setTimeout(() => {
      setRecommendedBooks([
        { id: 1, title: "Libro Recomendado 1" },
        { id: 2, title: "Libro Recomendado 2" },
      ]);
    }, 1000);
  }, []);

  return (
    <div className=" overflow-hidden">
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
      <button
        className="absolute top-4 right-4 bg-pink-500 text-white p-6 shadow-lg rounded-full hover:bg-pink-600 hover:scale-105 transition duration-300 ease-in-out"
        onClick={goToInicio}
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
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </button>
      <div className="bg-pink-500 h-96 w-screen">
        <div
          className="bg-cover bg-center h-full w-screen"
          style={{
            backgroundImage: `url('https://c1.wallpaperflare.com/preview/821/335/782/book-reading-hand-legs.jpg')`,
          }}
        >
          <div className="bg-pink-500 bg-opacity-50 h-full  w-full p-4 text-center">
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
              <Link
                to={"/EliminarCuenta"}
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:scale-110 transition duration-300 flex items-center m-2"
              >
                Eliminar Perfil
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
                    d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 p-4">
        <div className="bg-white p-4 rounded-lg">
          <div className="mb-4 flex justify-center space-x-4">
            <button
              className={`${
                activeOption === "comments"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } font-semibold py-2 px-4 rounded`}
              onClick={() => setActiveOption("comments")}
            >
              Historial de comentarios
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
          {activeOption === "comments" && (
            <HistorialComentarios usuario={username} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryProfile;
