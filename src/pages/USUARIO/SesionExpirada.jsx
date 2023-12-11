import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const SesionExpirada = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/verificarUsuario",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        if (response.data.cierreSesion) {
          setShowPopup(true);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          setShowPopup(true);
        }
      }
    };

    const timerId = setInterval(verificarSesion, 20 * 60 * 1000);

    return () => {
      // Cuando el componente se desmonta, limpia el temporizador
      clearInterval(timerId);
    };
  }, []); // Dependencias vacías para que el efecto se ejecute solo una vez

  const cerrarSesion = () => {
    //limpiar el local storage
    localStorage.clear();
    setShowPopup(false);
    navigate("/");
  };

  return (
    <Modal
      isOpen={showPopup}
      shouldCloseOnOverlayClick={false}
      className="fixed inset-0 flex items-center justify-center z-50 overflow-auto" // Cambiado a overflow-auto para permitir desplazamiento en el modal si es necesario
      overlayClassName="fixed inset-0 bg-pink-400 bg-opacity-75" // Cambiado a bg-opacity-75 para hacer el overlay semi-transparente
    >
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full">
            <div className="text-gray-900 font-medium text-lg">
              <h2 className="text-center">Ups a pasado algo con tu cuenta </h2>
            </div>
            <svg
              onClick={() => setShowPopup(false)}
              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
            >
              <path
                d="M1 1l16 16m0-16L1 17"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="text-gray-900"></div>
          <div className="ml-auto">
            <button
              onClick={cerrarSesion}
              className="bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SesionExpirada;
