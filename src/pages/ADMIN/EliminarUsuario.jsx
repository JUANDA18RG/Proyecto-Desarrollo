import { useNavigate } from "react-router-dom";
import { RiSearchLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const EliminarUsuario = () =>{
    const [busqueda, setBusqueda] = useState('');
    const [cargando, setCargando] = useState(false);
    const [resultados, setResultados] = useState([]);
    const navigate = useNavigate();

const goToInicio = () => {
        navigate("/ContenidoAdmin");
      };


const mostrarUsuarios = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
     console.error("Token no disponible");
      return;
    }
     const response = await axios.get("http://localhost:4000/returnUsuarios", {
      headers: {
      Authorization: `Bearer ${token}`,
      },
 });
setResultados(response.data);
console.log("Usuarios obtenidos:", response.data);
  } catch (error) {
    console.error("Error al obtener usuario", error); 
  }
};


const eliminar = async (username) => {
  
  try {
    console.log("Eliminando usuario:", username)
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no disponible");
      return;
    }
    
    const response = await axios.delete(`http://localhost:4000/deleteUser/${encodeURIComponent(username)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      
      Swal.fire({
        title: 'Eliminado',
        text: 'Usuario eliminado correctamente',
        icon: 'success',
      })
      setResultados((prevResultados) => prevResultados.filter(user => user.username !== username))
    } else {
      console.error("Error al eliminar usuario. Estado:", response.status)
    }
  } catch (error) {
    console.error("Error al eliminar usuario", error);
  }
};



const buscar = async () => {
      try {
        setCargando(true);
        const token = localStorage.getItem("token");
    
        if (!token) {
          console.error("Token no disponible");
          return;
        }
        const response = await axios.get(`http://localhost:4000/returnUsuario/${busqueda}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Respuesta del servidor:", response.data);
        console.log("Código de estado:", response.status);
        
        if (response.data && Object.keys(response.data).length > 0) {
        setResultados([response.data]);
        }else {
          setResultados([]);
      }
      } catch (error) {
        console.error("Error al buscar usuario", error);
        }finally {
          setCargando(false);
        }
};
    
useEffect(() => {
      mostrarUsuarios();
    }, []);


useEffect(() => {
      if (busqueda.trim() === '' ) {
        mostrarUsuarios();
      } else {  
  buscar();
      }
    }, [busqueda]);

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
            d="M15.75 19.5L8.25 12l7.5-7.5"
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
      <button onClick={buscar} >
      <RiSearchLine className="text-black-500" />
      </button>
    </div>
  </div>
</div>



    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 overflow-hidden">
    {!cargando && Array.isArray(resultados) && resultados.length > 0 ? (
        resultados.map((user) => (
     <div key={user.id} className="group bg-white rounded-xl m-5 shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-90 hover:border-4 hover:border-pink-500 relative">
     <div className="p-2 flex items-center justify-center"> 
     <div className="text-xl font-semibold text-center mb-2 overflow-hidden">
    <h2 className="text-2xl font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">{user.username}</h2>
    </div>
    <button
    onClick={() => eliminar(user.username)}
    className="ml-auto"  
    style={{ zIndex: 1, alignItems: 'center' }}  
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
           ))
      ): busqueda.trim() !== '' && (
        <div className="text-center mt-4 text-red-500 text-lg font-bold">
      No se encontraron resultados para la búsqueda "{busqueda}"</div>
      )
 }
         </div>
       </div>
     </div>
  </div>
  );
}

export default EliminarUsuario;