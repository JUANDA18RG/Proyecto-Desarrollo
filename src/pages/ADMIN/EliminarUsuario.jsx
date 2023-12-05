import { useNavigate } from "react-router-dom";
import { RiSearchLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const EliminarUsuario = () =>{
    const [busqueda, setBusqueda] = useState('');  
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

const goToInicio = () => {
        navigate("/ContenidoAdmin/false");
      };


const mostrarUsuarios = async () => {
  try {
    setLoading(true);
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
  setLoading(false);
  } catch (error) {
    console.error("Error al obtener usuario", error); 
    setLoading(false);
  }
};

const confirmarEliminacion = (username) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      eliminar(username);
    }
  });
};

const eliminar = async (username) => {
  try {
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
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token no disponible");
          return;
        }
        const response = await axios.get(`http://localhost:4000/returnUsuario/${encodeURIComponent(busqueda)}`, {
          headers: {
            Authorization: `Bearer ${token}`,                       
          },
        });
        if (response.data && Object.keys(response.data).length > 0) {
        setResultados([response.data]);
        }else {
          console.log("Busqueda:", busqueda);
          setResultados([]);
      }
      } catch (error) {
        console.error("Error al buscar usuario", error);
        }finally {
          setTimeout(() => {
            setLoading(false);
          }, 500);
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
     <div className="relative">
     <div className="absolute inset-0 bg-pink-500 z-0"></div>
     <div className="flex flex-col relative w-full mx-auto top-0  z-10 min-h-screen">

      <div className="bg-white shadow-xl h-44">
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
          <div className="relative flex items-center">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="text-center px-16 py-3 w-96 italic border border-pink-300 rounded-full shadow-md bg-white" 
              placeholder="Buscar Usuario..."
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button onClick={buscar} >
              <RiSearchLine className="text-black-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
      {loading ? (
            <div class="flex items-center justify-center min-h-screen">
              <div class="flex items-center justify-center">
                <div class="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle text-black">
                  <span class="hidden">Loading...</span>
                </div>
              </div>
            </div>
       ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 overflow-hidden">
         {!loading && Array.isArray(resultados) && resultados.length > 0 ? (
           resultados.map((user) => (
            <div key={user.id} className="group bg-white rounded-xl m-5 p-2 transition-transform duration-300 ease-in-out transform hover:scale-90 hover:border-4 hover:border-black relative">
             <div className="p-2 flex items-center justify-between">
             <div className="text-xl font-semibold overflow-hidden">
              <h2 className="text-2xl font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
              {user.username}
            </h2>
           </div>
           <button
            onClick={() => confirmarEliminacion(user.username)}
            className="ml-2"
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
          ): busqueda.trim() !== '' && !loading && (
            <div className="text-center mt-4 text-black text-lg font-bold">
            No se encontraron resultados para la búsqueda "{busqueda}"</div>
            )}

          </div>
          )}
          </div>
        </div>
    </div>
  );
}

export default EliminarUsuario;