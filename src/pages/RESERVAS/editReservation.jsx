import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const  EditReservation = () => {
    const [reservationDetails, setReservationDetails] = useState(null);
    const [editedPeriod, setEditedPeriod] = useState('');
    const { id } = useParams();
const goBack = () => {
        window.history.back();
};



const periodoEntrega = (e) =>{
    setEditedPeriod(e.target.value);
    console.log('Día seleccionado:', e.target.value)
}
      
const confirmarReserva = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token no disponible');
    return;
  }
    console.log('ID a enviar:', id);
    axios.put(
      `http://localhost:4000/reserva/EditarReserva`,
      {
        id: id,  //Traerlo desde el historial
        time: editedPeriod,
      }, 
       {
        headers: 
        {
          Authorization: `Bearer ${token}`,
        },
    }).then(response => {
        // Manejar la respuesta del backend
        console.log(response.data);
      })
      .catch(error => {
        // Manejar errores
        console.error('Error al enviar el tiempo al backend:', error);
        if (error.response) {
          // El servidor respondió con un código de error
          console.error('Código de error:', error.response.status);
          console.error('Mensaje de error:', error.response.data.message);
        } else if (error.request) {
          // La solicitud fue hecha, pero no se recibió respuesta
          console.error('No se recibió respuesta del servidor');
        } else {
          // Algo sucedió en la configuración de la solicitud que generó un error
          console.error('Error en la configuración de la solicitud:', error.message);
        }
      });
  };         
return(
   <>
   <div
        className="flex justify-center items-center h-screen"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1514894780887-121968d00567?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
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
          <div className="w-1/2 bg-white p-8 m-4 rounded z-10">
          <div className="border-b-4 border-pink-500 mb-4">
          <h1 className="text-6xl font-semibold text-center mb-4">EDITAR RESERVA</h1>
          </div>
          <h2 className="text-5xl font-semibold text-center mb-6">
          titulo </h2>

        <h6 className="text-2xl mb-4 text-center mb-2">Seleccione un tiempo </h6>
        <div className="mb-6 text-center">
        <select id="periodSelect" value={editedPeriod} onChange={periodoEntrega} 
            style={{
              width: '250px', 
              border: '1px solid #ccc', 
              padding: '8px',
              fontSize: '16px'
          }} >
            <option value="" disabled>----------------------------</option>
            <option value="8" style={{ fontSize: '20px'}}>8 días</option>
            <option value="15" style={{ fontSize: '20px' }}>15 días</option>
            <option value="30"style={{ fontSize: '20px' }}>Un mes</option>
        </select>
        </div>
        <div className = 'mb-8 text-center'> 
            <button onClick={confirmarReserva}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-6 px-8 rounded hover:scale-105 transition duration-500 ease-in-out ml-auto">
             Aceptar</button>
        </div>
       
       
        </div>
       </>
     </div>
  </>
);
}

export default EditReservation;