import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReservationPage = () => {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/booksdata/${id}`)
      .then(response => {
        setSelectedBook(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la información del libro:', error);
      });
  }, [id]);

const periodoEntrega = (e) =>{
  setSelectedPeriod(e.target.value);
  console.log('Día seleccionado:', e.target.value);
}


const [reservationConfirmed, setReservationConfirmed] = useState(false);

const confirmarReserva = () => {
  
  const token = localStorage.getItem('token');
 
  if (!token) {
    console.error('Token no disponible');
    return;
  }
  const username = localStorage.getItem('username');
  setReservationConfirmed(true); // Marcar la reserva como confirmada
  axios.post(
    `http://localhost:4000/reserva/booking`, 
    {
    book: selectedBook.id,
    time: selectedPeriod,
  }, 
  {
    headers: 
    {
      Authorization: `Bearer ${token}`,
    },
  }) .then(resultado  => {
       //const reservaId = resultado.id;
       Swal.fire({
        title: 'Reserva Confirmada',
        text: `Tu reserva con ID N°${reservaId} ha sido realizada con éxito`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate('/Contenido');
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error en la reserva',
        text: error.response.data.message || 'Hubo un error al realizar la reserva. Por favor, inténtalo de nuevo.',
      })
      .then(() => {
        setReservationConfirmed(false);
     });
    });       
} 

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
          <div key={selectedBook.id} className="w-1/2 max-w-md z-10">
            <img
              src={`http://localhost:4000${selectedBook.image}`}
              alt={selectedBook.Titulo}
              className="w-full h-auto rounded-t-lg object-fi"
            />
          </div>
          <div className="w-1/2 bg-white p-8 m-4 rounded z-10">
          <div className="border-b-4 border-pink-500 mb-4">
          <h1 className="text-6xl font-semibold text-center mb-4">RESERVA</h1>
          </div>
    
          <h2 className="text-5xl font-semibold text-center mb-6">
          {selectedBook.Titulo}</h2>

        <h6 className="text-2xl mb-4 text-center mb-2">Seleccione un tiempo </h6>
        <div className="mb-6 text-center">
        <select id="periodSelect" value={selectedPeriod} onChange={periodoEntrega} 
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
        disabled={reservationConfirmed}
         className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-6 px-8 rounded hover:scale-105 transition duration-500 ease-in-out ml-auto">
          Confirmar Reserva</button>
          </div>
         </div>
        </>
    </div>
   </>
  );
};


export default ReservationPage;