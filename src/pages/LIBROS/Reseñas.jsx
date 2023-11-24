import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Reseñas({ libroId }) {
  const [comentario, setComentario] = useState("");
  const [valoracion, setValoracion] = useState(0);
  const [comentarios, setComentarios] = useState({});
  const [loading, setLoading] = useState(true);

  const valoracionToSend = valoracion === 0 ? null : valoracion;

  useEffect(() => {
    const fetchComentarios = async () => {
      setLoading(true);
      axios
        .get(
          `http://localhost:4000/comentarios/enviarComentarios?isbn=${libroId}`
        )
        .then((response) => {
          setComentarios(response.data.val);
        })
        .catch((error) => {
          console.error("Error al obtener comentarios:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchComentarios();
  }, [libroId]);

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleStarClick = (value) => {
    setValoracion(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:4000/comentarios/comentar",
        {
          username: localStorage.getItem("username"),
          book: libroId,
          valoracion: valoracionToSend,
          comentario: comentario,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setComentario("");
        setValoracion(0);
        setComentarios((prevComentarios) => [
          ...prevComentarios,
          {
            valoracion: valoracionToSend,
            comentario,
            usuario: localStorage.getItem("username"),
          },
        ]);
      })
      .catch((error) => {
        console.error("Error al enviar comentario:", error);
      });
  };

  return (
    <div className="mx-auto p-8 bg-white rounded shadow-lg flex flex-col-reverse md:flex-row">
      <div className="w-full md:w-1/2 pr-4 m-4">
        <h2 className="text-2xl font-bold mb-4 text-pink-600 text-center">
          Comentarios
        </h2>
        {!loading ? (
          <ul className="">
            {comentarios.map((comentario, index) => (
              <li
                key={index}
                className="border-4 border-pink-500 rounded p-4 mb-4 bg-white"
              >
                <p className="mb-2 text-2xl font-bold">{comentario.usuario}</p>
                <p className="mb-4 text-lg">{comentario.comentario}</p>
                <div className="flex items-center">
                  <p className="text-lg text-pink-600">
                    Valoración: {comentario.valoracion}
                  </p>
                  <div className="flex ml-2">
                    {[1, 2, 3, 4, 5].map((value, index) => (
                      <Star
                        key={index}
                        filled={value <= (comentario.valoracion || 0)}
                        onClick={() => {}}
                        className="w-10 h-10 cursor-pointer mr-2 transition duration-300 ease-in-out transform hover:scale-125 text-yellow-500"
                      />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle text-pink-600">
              <span className="hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 m-4">
        <h2 className="text-2xl font-bold mb-4 text-pink-600 text-center">
          Dejar un comentario
        </h2>
        <textarea
          className="p-4 h-36 w-full rounded resize-none text-center text-lg outline-none border-4 border-blue-500 bg-white mb-4 hover:bg-blue-300"
          placeholder="Escribe tu comentario aquí..."
          value={comentario}
          onChange={handleComentarioChange}
        />
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <label className="mr-4 text-lg">Valoración:</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((value, index) => (
                <Star
                  key={index}
                  filled={value <= valoracion}
                  onClick={() => handleStarClick(value)}
                  className="w-10 h-10 cursor-pointer mr-2 transition duration-300 ease-in-out transform hover:scale-125 text-yellow-500"
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-4 text-xl transition duration-300 ease-in-out transform hover:scale-110"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

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
