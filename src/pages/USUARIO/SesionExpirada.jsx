import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root"); // Esto es necesario para la accesibilidad

const SesionExpirada = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timerId;

    const token = localStorage.getItem("token");

    if (token) {
      // Si el token existe, establece un temporizador para mostrar el modal después de 1 minuto
      timerId = setTimeout(() => {
        setShowPopup(true);
      }, 60000 * 30);
    }

    return () => {
      // Cuando el componente se desmonta, limpia el temporizador
      clearTimeout(timerId);
    };
  }, []); // Dependencias vacías para que el efecto se ejecute solo una vez

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setShowPopup(false);
    navigate("/");
  };

  const extenderSesion = async () => {
    navigate("/login");
    setShowPopup(false); // Desactiva el modal
  };

  return (
    <Modal
      isOpen={showPopup}
      shouldCloseOnOverlayClick={false}
      className="fixed inset-0 flex items-center justify-center z-50 overflow-auto" // Cambiado a overflow-auto para permitir desplazamiento en el modal si es necesario
      overlayClassName="fixed inset-0 bg-pink-400 bg-opacity-75" // Cambiado a bg-opacity-75 para hacer el overlay semi-transparente
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-2xl font-bold mb-4 text-center">Sesión Expirada</h2>
        <p className="mb-6 text-gray-600">
          Tu sesión ha expirado. ¿Quieres extender tu sesión o cerrarla?
        </p>

        <div className="flex justify-center">
          <button
            className="bg-red-500 text-white rounded-md px-4 py-2 mr-4 hover:scale-105 transform transition-all duration-300 ease-in-out"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:scale-105 transform transition-all duration-300 ease-in-out"
            onClick={extenderSesion}
          >
            Extender Sesión
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SesionExpirada;
