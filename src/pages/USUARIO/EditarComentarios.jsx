import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

// ...

const EditarComentario = () => {
  const [comentario, setComentario] = useState("");
  const [valoracion, setValoracion] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isbn } = useParams();

  useEffect(() => {
    setLoading(false); // Assuming the data loading is mocked or handled elsewhere
  }, []);

  const goBack = () => {
    window.history.back();
  };

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleStarClick = (value) => {
    setValoracion(value);
  };

  const token = localStorage.getItem("token");

  const cambiarComentario = () => {
    console.log(isbn);
    console.log(comentario);
    console.log(valoracion);

    axios
      .put(
        `http://localhost:4000/comentarios/actualizar`,
        {
          isbn: isbn,
          comentario: comentario,
          valoracion: valoracion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Reserva realizada",
          text: "La reserva se ha realizado correctamente",
        }).then(() => {
          navigate(`/user`);
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error en la reserva",
          text:
            error.response.data.message ||
            "Hubo un error al realizar el cambio al comentario. Por favor, inténtalo de nuevo.",
        });
      });
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center justify-center">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle text-pink-600">
              <span className="hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center items-center h-screen"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1514894780887-121968d00567?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="bg-pink-400 bg-opacity-50 absolute inset-0"></div>
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
            <div className="flex flex-col justify-center items-center h-full z-10">
              <h1 className="text-4xl text-white font-bold mb-4">
                Editar comentario
              </h1>
              <textarea
                className="p-4 h-36 w-full rounded resize-none text-center text-lg outline-none border-4 border-pink-500 bg-white mb-4 hover:bg-pink-300 z-10"
                placeholder="Escribe tu comentario aquí..."
                value={comentario}
                onChange={handleComentarioChange}
              />
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <label className="mr-4 text-lg">Valoración:</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        filled={value <= valoracion}
                        onClick={() => handleStarClick(value)}
                        className="w-10 h-10 cursor-pointer mr-2 transition duration-300 ease-in-out transform hover:scale-125 text-yellow-500"
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={cambiarComentario}
                  className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded mt-4 text-xl transition duration-300 ease-in-out transform hover:scale-110"
                >
                  Enviar
                </button>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

const Star = ({ filled, onClick, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? "yellow" : "none"}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    onClick={onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

export default EditarComentario;
