import { useNavigate } from "react-router-dom";
import { RiSearchLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import React, { useState } from 'react';

const EliminarUsuario = () =>{
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
      const navigate = useNavigate();


const goToInicio = () => {
        navigate("/ContenidoAdmin");
      };


const eliminar = () => {
        Swal.fire({
            title: 'Eliminar',
            text: '¿Está seguro de que quiere eliminar el usuario?',
            icon: 'warning',
            showCancelButton: true,  // Muestra el botón de cancelar
            confirmButtonColor: '#3085d6',  // Color del botón de confirmación
            cancelButtonColor: '#d33',  // Color del botón de cancelar
            confirmButtonText: 'Sí, eliminar',  // Texto del botón de confirmación
            cancelButtonText: 'Cancelar'  // Texto del botón de cancelar
        }).then((result) => {
            if (result.isConfirmed) {
                // Lógica a ejecutar si se hace clic en confirmar
                // Por ejemplo, llamar a una función para eliminar el usuario
                // Ejemplo: eliminarUsuario();
            }
        });
    };

const buscar = () => {
        Swal.fire({
            title: 'Buscar',
            text: '¿Está seguro de que quiere eliminar el usuario?',
            icon: 'warning',
            showCancelButton: true,  // Muestra el botón de cancelar
            confirmButtonColor: '#3085d6',  // Color del botón de confirmación
            cancelButtonColor: '#d33',  // Color del botón de cancelar
            confirmButtonText: 'Sí, eliminar',  // Texto del botón de confirmación
            cancelButtonText: 'Cancelar'  // Texto del botón de cancelar
        }).then((result) => {
            if (result.isConfirmed) {
                // Lógica a ejecutar si se hace clic en confirmar
                // Por ejemplo, llamar a una función para eliminar el usuario
                // Ejemplo: eliminarUsuario();
            }
        });
    };


return (
     <div className="flex flex-col relative w-full mx-auto top-0 py-8 sm:py-6 z-10 min-h-screen">
     <div className="absolute inset-0 bg-pink-500 shadow-md" style={{ zIndex: -1 }}>   
     <div className="absolute inset-0 bg-white"
          style={{
          margin: '2%',
          padding: '10px', 
          backgroundColor:'white'
        }}
      >
     <button
        className="absolute top-4 left-4 bg-pink-500 text-white p-4 shadow-lg rounded-full hover:bg-pink-600 hover:scale-105 transition duration-300 ease-in-out"
        onClick={goToInicio}
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
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </button>
     
      <h1 className="text-4xl font-bold mt-10 text-center">
      🗑️ Eliminar Usuarios 
    </h1>

    
 <div className="grid place-items-center ml-auto relative p-4">
  <div className="relative">
    <input
      type="text"
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      className="text-center px-16 py-3 w-96 italic border border-pink-300 rounded-full shadow-md" 
      placeholder="Buscar Usuario..."
    />
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
      <buton >
      <RiSearchLine className="text-black-500" />
      </buton>
    </div>
  </div>
</div>



    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 overflow-hidden">
     <div className="group bg-white rounded-xl m-5 shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-90 hover:border-4 hover:border-pink-500 relative">
    
     <div className="p-2 flex items-center justify-center"> 
    
     <div className="text-xl font-semibold text-center mb-2 overflow-hidden">
    <h2 className="text-2xl font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">Nombre de Usuario</h2>
    <p className="text-gray-600 overflow-hidden whitespace-nowrap overflow-ellipsis">monicaAndrea.cifuentes@gmail.com</p>
    </div>



   <button
    onClick={eliminar}
    className="ml-auto"  // Utiliza ml-auto para mover el botón al extremo derecho del contenedor
    style={{ zIndex: 1, alignItems: 'center' }}  // Alinea verticalmente los elementos
   >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8 m-2 text-red-500" 
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </button>
</div>

                



           </div>
         </div>
       </div>
     </div>
  </div>
  );
}

export default EliminarUsuario;