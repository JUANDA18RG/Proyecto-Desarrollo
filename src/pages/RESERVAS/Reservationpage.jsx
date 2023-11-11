import React, { useState } from 'react';


const ReservationPage  = () => {
  //const [selectedBook, setSelectedBook] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const urlImagen = "https://i.pinimg.com/564x/bf/61/9d/bf619dc27df4224a57c97124688bece1.jpg";


  const goBack = () => {
    window.history.back();
  };
  
const periodoEntrega = (e) =>{
  setSelectedPeriod(e.target.value);
  console.log('Día seleccionado:', e.target.value);
}

const confirmarReserva = () =>{
  
  
 
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

          <div  className="w-1/2 max-w-md z-10">
          <img 
          src={urlImagen} 
          alt="Imagen de ejemplo"
          className="w-full h-auto rounded-t-lg object-fi" />
          </div>
          
          <div className="w-1/2 bg-white p-8 m-4 rounded z-10">

          <div className="border-b-4 border-pink-500 mb-4">
          <h1 className="text-4xl text-center mb-4">RESERVA</h1>
          </div>

          <h2 className="text-5xl font-semibold text-center mb-6">Titulo del libro </h2>

        <div>
        <h6 className="text-2xl font-semibold mb-2">Seleccione un tiempo </h6>
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
  
        <div className="flex">
        <button onClick={confirmarReserva}
         className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-6 px-8 rounded hover:scale-105 transition duration-500 ease-in-out ml-auto">
          Confirmar Reserva</button>
      
        </div>


         
          </div>
        </>
    </div>
   </>
);
}


export default ReservationPage;