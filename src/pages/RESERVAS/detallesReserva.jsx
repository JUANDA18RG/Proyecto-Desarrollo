import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DetallesReserva = () => {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [reservaCancelada, setReservaCancelada] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const obtenerDetallesReserva = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/reserva/${id}`);
        setReserva(response.data);
      } catch (error) {
        console.error("Error al obtener detalles de la reserva", error);
      }
    };
    obtenerDetallesReserva();
  }, [id]);

  const handleCancelarReserva = () => {
    if (reserva.estado === "Reservado") {
      Swal.fire({
        title: "Confirmar cancelación",
        text: `La reserva N°${id} va a ser cancelada.`,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          handleConfirmarCancelacion();
        }
      });
      setConfirmacionVisible(true);
    } else {
      console.log(
        'No se puede cancelar una reserva con estado diferente a "Reservado"'
      );
    }
  };
  
  const handleConfirmarCancelacion = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token no disponible");
        return;
      }
      const response = await axios.put(
        `http://localhost:4000/reserva/cancelarReserva/${id}`,
        {},  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.message === 'La reserva ha sido cancelada exitosamente') {
        setReserva({ ...reserva, estado: 'Cancelado' });
        setReservaCancelada(true);
      }
      Swal.fire({
        icon: response.ok ? 'success' : 'success',
        title: response.data.message,
      });
    } catch (error) {
      console.error('Error al cancelar la reserva', error);
  
      if (error.response) {
        // El servidor respondió con un estado de error
        const errorMessage = error.response.data.message;
        Swal.fire({
          icon: 'error',
          title: errorMessage,
        });
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        Swal.fire({
          icon: 'error',
          title: 'Error de red, no se pudo completar la solicitud',
        });
      } else {
        // Se produjo un error al configurar la solicitud
        Swal.fire({
          icon: 'error',
          title: 'Error al configurar la solicitud',
        });
      }
    }
    setConfirmacionVisible(false);
  };
  
  if (!reserva) {
    return (
      <p>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center justify-center">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle text-pink-600">
              <span className="hidden">Loading...</span>
            </div>
          </div>
        </div>
      </p>
    );
  }

  return (
    <>
      <div
        className="flex justify-center items-center h-screen"
        style={{
          backgroundImage:
            'url("https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2022/03/libros-antiguos-2644117.jpg?tf=3840x")',
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
          <div className="w-full sm:w-1/2 bg-white p-8 m-4 rounded z-10">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-4">
                Detalles de la Reserva
              </h1>
              <p className="text-gray-600 mb-2">ID de la Reserva: {id}</p>
              <p className="text-gray-600 mb-2">Estado: {reserva.estado}</p>
              <p className="text-gray-600 mb-2">
                Fecha de Reserva: {reserva.fechareserva}
              </p>
              <p className="text-gray-600 mb-2">
                Fecha de Devolución: {reserva.fechadevolucion}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-24">
              <div>
              <button
              onClick={handleCancelarReserva}
              disabled={reserva.estado === "Entregado" || reserva.estado === "Cancelado"}
              style={{
                backgroundColor: reserva.estado === "Entregado" || reserva.estado === "Cancelado" ? "gray" : "pink-700",
              }}
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-6 px-8 rounded hover:scale-105 transition duration-500 ease-in-out ml-auto"
            >
              Cancelar
            </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    if (reserva.estado === "Entregado" || reserva.estado === "Cancelado" ) {
                      Swal.fire({
                        icon: "info",
                        title: "Reserva Entregada o cancelada",
                        text: "No puedes editar una reserva entregada o cancelada .",
                      });
                    } else {
                      navigate(`/EditReserva/${id}`);
                    }
                  }}
                  className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-6 px-8 rounded hover:scale-105 transition duration-500 ease-in-out ml-auto"
                >
                
                  Editar
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default DetallesReserva;
