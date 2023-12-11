import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
 
const CambiarEstadoReserva = () => {
  const [reservaId, setReservaId] = useState("");
  const [isbn, setISBN] = useState("");
  const [estadoReserva, setEstadoReserva] = useState("Reservado");
  const [reservaEncontrada, setReservaEncontrada] = useState(null);
 
  const handleChangeEstadoReserva = (nuevoEstado) => {
    setEstadoReserva(nuevoEstado);
  };
 
  const handleAceptarClick = async () => {
    try {
      // Verifica que el estado de la reserva se haya cambiado
      if (estadoReserva === "Reservado") {
        Swal.fire("Alerta", "Por favor, cambia el estado de la reserva antes de aceptar.", "warning");
        return;
      }
 
      const response = await axios.put(`http://localhost:4000/api/Reservas/${reservaId}`, {
        estado: estadoReserva,
      });
 
      if (response.status === 200) {
        Swal.fire("Cambios aceptados", `Nuevo estado: ${estadoReserva}`, "success");
      } else {
        Swal.fire("Error", "Ocurrió un error al actualizar la reserva", "error");
      }
    } catch (error) {
      console.error("Error al actualizar reserva", error);
      Swal.fire("Error", "Ocurrió un error al actualizar la reserva", "error");
    }
  };
 
  const handleBuscarReservaPorId = async () => {
    try {
      Swal.fire("Buscar por ID de Reserva", `ID de Reserva: ${reservaId}`, "info");
      console.log("ID de la reserva:", reservaId);
 
      // Lógica para buscar por ID de reserva
      const response = await axios.get(`http://localhost:4000/api/Reservas/${reservaId}`);
      const reservaEncontrada = response.data;
 
      // Si la reserva se encuentra, puedes mostrar detalles o realizar otras acciones
      if (reservaEncontrada) {
        setReservaEncontrada(reservaEncontrada);
        Swal.fire("Reserva encontrada", `ID: ${reservaId}`, "success");
      } else {
        setReservaEncontrada(null);
        Swal.fire("Reserva no encontrada", `No hay reserva para el ID: ${reservaId}`, "error");
      }
    } catch (error) {
      // En caso de error, muestra un mensaje de error
      console.error("Error al buscar reserva por ID", error);
      Swal.fire("Error", `Ocurrió un error al buscar la reserva por ID: ${error.message}`, "error");
    }
  };
 
  const handleBuscarReservaPorISBN = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/Books/isbn/${isbn}`);
      const reservaEncontrada = response.data;
 
      if (reservaEncontrada) {
        setReservaEncontrada(reservaEncontrada);
        Swal.fire("Reserva encontrada", `ISBN: ${isbn}`, "success");
      } else {
        setReservaEncontrada(null);
        Swal.fire("Reserva no encontrada", `No hay reserva para el ISBN: ${isbn}`, "error");
      }
    } catch (error) {
      console.error("Error al buscar reserva por ISBN", error);
 
      Swal.fire("Error", `Ocurrió un error al buscar la reserva: ${error.message}`, "error");
    }
  };
 
  const mostrarAlerta = (mensaje, icono) => {
    Swal.fire(mensaje, "", icono);
  };
 
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-pink-500 flex flex-col justify-center items-center p-8 z-10">
        <div className="bg-white shadow-2xl rounded-lg p-10 w-150">
          <h2 className="text-4xl font-semibold mb-6 text-pink-500 text-center">
            Cambiar Estado de Reserva
          </h2>
          <div>
            <label htmlFor="reservaId">ID de Reserva:</label>
            <div className="flex">
              <input
                type="text"
                id="reservaId"
                value={reservaId}
                onChange={(e) => setReservaId(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
              <button
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  handleBuscarReservaPorId();
                  mostrarAlerta("Buscando por ID de Reserva...", "info");
                }}
              >
                Buscar
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="isbn">ISBN del Libro:</label>
            <div className="flex">
              <input
                type="text"
                id="isbn"
                value={isbn}
                onChange={(e) => setISBN(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
              <button
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  handleBuscarReservaPorISBN();
                  mostrarAlerta("Buscando por ISBN...", "info");
                }}
              >
                Buscar
              </button>
            </div>
          </div>
          {reservaEncontrada && (
            <div>
              <h3>Detalles de la Reserva:</h3>
              <p>ID: {reservaEncontrada.id}</p>
              <p>ISBN: {reservaEncontrada.isbn}</p>
              <p>Usuario: {reservaEncontrada.usuario}</p>
              <p>Fecha de Reserva: {reservaEncontrada.fechaReserva}</p>
              <p>Estado: {reservaEncontrada.estado}</p>
              {/* Agrega más detalles según la estructura de tu objeto de reserva */}
            </div>
          )}
          <button
            className={`flex rounded items-center justify-between text-blue-500 hover:bg-pink-600 transition duration-500 border-b hover:text-white border-gray-200 py-4 text-lg w-full ${
              estadoReserva === "Reservado" ? "bg-pink-600 text-white" : ""
            }`}
            onClick={() => {
              handleChangeEstadoReserva("Reservado");
              mostrarAlerta("Cambiando a Reservado...", "success");
            }}
          >
            <span className="m-2">Cambiar a Reservado</span>
          </button>
          <button
            className={`flex rounded items-center justify-between text-blue-500 hover:bg-pink-600 transition duration-500 border-b hover:text-white border-gray-200 py-4 text-lg w-full ${
              estadoReserva === "Entregado" ? "bg-pink-600 text-white" : ""
            }`}
            onClick={() => {
              handleChangeEstadoReserva("Entregado");
              mostrarAlerta("Cambiando a Entregado...", "success");
            }}
          >
            <span className="m-2">Cambiar a Entregado</span>
          </button>
          <button
            className={`flex rounded items-center justify-between text-blue-500 hover:bg-pink-600 transition duration-500 border-b hover:text-white border-gray-200 py-4 text-lg w-full ${
              estadoReserva === "Devuelto" ? "bg-pink-600 text-white" : ""
            }`}
            onClick={() => {
              handleChangeEstadoReserva("Devuelto");
              mostrarAlerta("Cambiando a Devuelto...", "success");
            }}
          >
            <span className="m-2">Cambiar a Devuelto</span>
          </button>
          <button
            className="flex rounded items-center justify-between text-blue-500 hover:bg-pink-600 transition duration-500 border-b hover:text-white border-gray-200 py-4 text-lg w-full"
            onClick={() => {
              handleAceptarClick();
              mostrarAlerta("Procesando cambios...", "success");
            }}
          >
            <span className="m-2">Aceptar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default CambiarEstadoReserva;