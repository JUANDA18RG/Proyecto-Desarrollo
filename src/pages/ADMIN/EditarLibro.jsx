import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiSearchLine } from 'react-icons/ri';
import Swal from "sweetalert2";

{/*Falta poder editar la imagen */}

const EditarLibro = () => {
    const [books, setBooks] = useState ([]);
    const [loading, setLoading] = useState(true);
    const [editFormData, setEditFormData] = useState({});
    const [showEditForm, setShowEditForm] = useState(false);
    const [busqueda, setBusqueda] = useState('');  
    const navigate = useNavigate();

const goToInicio = () => {
        navigate("/ContenidoAdmin/false");
      }; 
    
      
const cargarLibros = async () => {
        try {
          setLoading(true);
          const response = await axios.get("http://localhost:4000/libros");
          setBooks(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error al obtener los libros", error);
          setLoading(false);
        }
};

useEffect(() => {
  cargarLibros();
}, []);
   
const handleEditClick = (libro) => {
        console.log('Libro details:', libro);
        setEditFormData({
          ...libro,
        });
        setShowEditForm(true);
      };
      
      
const handleEditFormChange = (e) => { 
  if (e.target.name === 'portada') {
    setEditFormData({
          ...editFormData,
          portada: e.target.files[0],
          
        })
      }else{
        setEditFormData({
          ...editFormData,
        [e.target.name]: e.target.value,     
             })};
};


const handleEditFormSubmit = async () => {
  try {
    const isbn = editFormData.isbn;
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token no disponible");
      return;
    }

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      
      },
    };
    
    const response = await axios.put(`http://localhost:4000/libros/${isbn}`, editFormData, headers);

    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Actualización exitosa',
        text: 'La información del libro ha sido actualizada correctamente.',
      });
      cargarLibros();
    } else {
      console.error("Error al actualizar la información del libro. Estado:", response.status);
    }
  } catch (error) {
    console.error("Error durante la actualización:", error);

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al actualizar la información del libro.',
    });
  } finally {
    setShowEditForm(false);
  }
};


const calculateTextareaRows = (content) => {
  const numberOfLines = content.split('\n').length;
  return Math.max(6, numberOfLines); 
};

useEffect(() => {
  if (busqueda.trim() === '' ) {
    cargarLibros();
  } else {  
 buscar();
  }
}, [busqueda]);


const buscar = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no disponible");
      return;
    }
    setLoading(true);
    const response = await axios.get(`http://localhost:4000/libros/${busqueda}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Respuesta del servidor:", response.data);
    if (response.data && Object.keys(response.data).length > 0) {
      setBooks([response.data]);
      }
     else {
      console.log("No se encontraron resultados para la búsqueda:", busqueda);
      setBooks([]);
    }
  } catch (error) {
    console.error("Error al buscar libro", error.message);
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }
};


return (
        <div className="relative">
        <div className={`absolute inset-0 bg-pink-500 z-0`}></div>
        <div className="flex flex-col relative w-full mx-auto top-0  z-10 min-h-screen">
        
        <div className="bg-white shadow-xl h-34">
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
         <h1 className="text-4xl font-bold mt-6 text-center text-gray-800">
         📚 Editar libros
          </h1>
         
          <div className="grid place-items-center ml-auto relative p-4">
          <div className="relative flex items-center flex-grow">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="text-center px-16 py-3 w-96 italic border border-pink-300 rounded-full shadow-md bg-white" 
              placeholder="Buscar titulo..."
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button onClick={buscar} >
              <RiSearchLine className="text-black-500" />
              </button>
            </div>
          </div>
      </div>
    </div>
            
              <div className="container m-auto py-10">
                {loading ? (
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="flex items-center justify-center">
                      <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle text-black">
                        <span className="hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                ) : (
                
               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 overflow-hidden">
               {books.length > 0 ? (
                 books.map((libro) => (
                     <div
                      key={libro.isbn}
                     className="group bg-white rounded-xl m-5 shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-90 hover:border-4 hover:border-black relative p-4"
                      >
                      <div className="flex">
                      <div className="w-2/3 flex flex-col items-center pr-8">
                        <h2 className="text-xl font-semibold text-center  mb-4">
                        {libro.titulo}
                          </h2>
                          <p className="text-gray-600 m-1 text-center">
                          <span className="font-semibold text-black">
                          ISBN:
                          </span>{" "}
                          {libro.isbn}
                          </p>
                          <p className="text-gray-600 m-1 text-center">
                          <span className="font-semibold text-black">
                          Author:
                          </span>{" "}
                          {libro.autor}
                          </p>
                          <p className="text-gray-600 m-1 text-center">
                          <span className="font-semibold text-black">                   
                        Categoria:
                        </span>{" "}
                          {libro.genero}
                          </p>
                          <p className="text-gray-600 m-1 text-center">
                          <span className="font-semibold text-black">                   
                          Año:
                          </span>{" "}
                          {libro.aniopublicacion}
                          </p>
                          <div className="flex items-center bg-blue-300 rounded m-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 m-1 text-blue-800"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                              <p className="m-1 text-black">
                                {libro.cantcopias}
                              </p>
                            </div>
                            <p className="text-gray-600 m-1 text-center text-justify overflow-hidden">
                            <span className="font-semibold text-black">
                            Sinopsis:
                            </span>{" "}
                            {libro.sinopsis}
                            </p>
                             </div>  

                            <div className="w-1/3 flex items-center justify-center mr-10 mb-4">
                            <img
                            src={`http://localhost:4000${libro.portada}`}
                            alt={libro.titulo}
                            className="w-80 h-80 object-contain  mt-5 rounded items-center mx-auto"
                            />  
                           </div>

                    </div>
                    <button
                    className="absolute top-1 right-1 bg-transparent text-red-500 p-0 rounded-full transition duration-300 ease-in-out hover:bg-red-100 hover:text-red-700"
                    onClick={() => handleEditClick(libro)}
                    >
                       <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 ml-2"
                       >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                        />
                        </svg>
                      </button>
                      </div>
                    )) ): 
                      busqueda.trim() !== '' && !loading && (
                        <div className="text-center mt-4 text-black text-lg font-bold">
                        No se encontraron resultados para la búsqueda "{busqueda}"</div>
                        )}
                  </div>
                )}
              </div>
              </div>
           

  {console.log('showEditForm:', showEditForm)}
    {showEditForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-20">
         <div className="bg-white p-8 rounded-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">Editar el libro "{editFormData.isbn}"</h2>
            
            <form>
            <div className="flex space-x-20">
            <div className="w-2/3 flex flex-col space-x-4">
            <label>
              <input
                type="hidden"
                name="isbn"
                value={editFormData.isbn || ''}
                onChange={handleEditFormChange}
                className="border p-2 w-full"
              />
            </label>
            <label>
              <span className="text-gray-700 font-semibold">Titulo:</span>
                <input
                  type="text"
                  name="titulo"
                  value={editFormData.titulo || ''}
                  onChange={handleEditFormChange}
                  className="border p-2 w-full"
                />
              </label>
              <label>
              <span className="text-gray-700 font-semibold">Autor:</span>
                <input
                  type="text"
                  name="autor"
                  value={editFormData.autor || ''}
                  onChange={handleEditFormChange}
                  className="border p-2 w-full"
                />
              </label>
              <label>
              <span className="text-gray-700 font-semibold">Categoria:</span>
                <input
                  type="text"
                  name="genero"
                  value={editFormData.genero || ''}
                  onChange={handleEditFormChange}
                  className="border p-2 w-full"            
                />
              </label>
              <label>
              <span className="text-gray-700 font-semibold">Año publicacion:</span>
                <input
                  type="text"
                  name="aniopublicacion"
                  value={editFormData.aniopublicacion || ''}
                  onChange={handleEditFormChange}
                  className="border p-2 w-full"             
                />
              </label>
              <label>
              <span className="text-gray-700 font-semibold">Cantidad de copias:</span>
                <input
                  type="text"
                  name="cantcopias"
                  value={editFormData.cantcopias || ''}
                  onChange={handleEditFormChange}
                  className="border p-2 w-full"
                />
              </label>
              <label>
              <span className="text-gray-700 font-semibold">Sinopsis:</span>
                <textarea
                  name="sinopsis"
                  value={editFormData.sinopsis || ''}
                  onChange={handleEditFormChange}
                  className="border p-2 w-full"
                  rows={calculateTextareaRows(editFormData.sinopsis)}
                />
              </label>
              </div>
              <div className="w-2/3 flex items-center justify-center space-x-4">
              <label className='mb-4'>
              <span className="text-gray-700 font-semibold">Cambiar imagen:</span>
                <input
                  type="file"
                  accept="image/*"
                  name = "portada"
                  onChange={handleEditFormChange}
                  className="border p-24"
                />
              </label>
              </div>
              </div>
             
              <div className="flex items-center justify-center mt-4 space-x-28">
              <button
                type="button"
                onClick={handleEditFormSubmit}
                className="bg-pink-500 text-white py-2 px-4 rounded-md"
              >
               Save change
              </button>
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="bg-pink-500 text-white py-2 px-4 rounded-md"
              >
              Go out
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
</div>    
);
}




export default EditarLibro;