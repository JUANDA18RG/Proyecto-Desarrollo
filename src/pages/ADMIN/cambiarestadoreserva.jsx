import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const CambiarEstadoReserva = () => {
  const [listaReservas, setListaReservas] = useState([]);

  useEffect(() => {
    console.log("Efecto de carga de reservas");
    cargarListaReservas();
  }, []);

  const cargarListaReservas = async () => {
    try {
      const response = await axios.get("http://localhost:4000/reservas");
      setListaReservas(response.data);
      console.log("Lista de reservas cargada:", response.data);
    } catch (error) {
      console.error("Error al cargar la lista de reservas", error);
    }
  };

  const mostrarAlerta = (mensaje, icono) => {
    Swal.fire(mensaje, "", icono);
  };

  const handleCambiarEstadoReserva = (reservaId, nuevoEstado) => {
    try {
      console.log(`Cambiando estado local para la reserva con ID: ${reservaId}`);

      // Cambiar el estado local sin hacer una solicitud al backend
      const nuevasReservas = listaReservas.map((reserva) => {
        if (reserva.id === reservaId) {
          return { ...reserva, estado: nuevoEstado };
        } else {
          return reserva;
        }
      });

      setListaReservas(nuevasReservas);

      // Mostrar una alerta o realizar otras acciones locales si es necesario
      mostrarAlerta(`Cambiando a ${nuevoEstado}...`, "success");
    } catch (error) {
      console.error("Error al cambiar el estado de la reserva localmente", error);
      mostrarAlerta("Ocurrió un error al cambiar el estado de la reserva", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-500">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-150">
        <h2 className="text-4xl font-semibold mb-6 text-pink-500 text-center">
          Cambiar Estado de Reserva
        </h2>
        <div>
          {listaReservas.map((reserva) => (
            <div key={reserva.id} className="mt-4">
              <p>ID: {reserva.id}, Estado: {reserva.estado}</p>
              <div className="flex">
                <button
                  className="ml-2 px-4 py-2 bg-pink-500 text-white rounded"
                  onClick={() => handleCambiarEstadoReserva(reserva.id, "Reservado")}
                >
                  Cambiar a Reservado
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-pink-500 text-white rounded"
                  onClick={() => handleCambiarEstadoReserva(reserva.id, "Entregado")}
                >
                  Cambiar a Entregado
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-pink-500 text-white rounded"
                  onClick={() => handleCambiarEstadoReserva(reserva.id, "Devuelto")}
                >
                  Cambiar a Devuelto
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CambiarEstadoReserva;