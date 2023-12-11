import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiSearchLine } from 'react-icons/ri';
import Swal from "sweetalert2";


const EditarLibro = () => {

  const handleRemoveImage = () => {
    setImagenPortada(null);
    setPreviewImagen(null);
  };
    const [imagenPortada, setImagenPortada] = useState(null);
    const [previewImagen, setPreviewImagen] = useState(null);
    const [books, setBooks] = useState ([]);
    const [loading, setLoading] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const [busqueda, setBusqueda] = useState(''); 
    const [editFormData, setEditFormData] = useState({
      isbn: "",
      titulo: "",
      autor: "",
      genero: "",
      cantcopias: "",
      aniopublicacion: "",
      sinopsis: "",
    });   
    const navigate = useNavigate();

const goToInicio = () => {
        const admin = localStorage.getItem("isSuperAdmin");
        navigate("/ContenidoAdmin/" + admin);
      }; 
    
      const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImagenPortada(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewImagen(reader.result);
          };
          reader.readAsDataURL(file);
        }
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
  const { name, value } = e.target;
  setEditFormData((prevLibro) => ({
    ...prevLibro,
    [name]: value,
  }));
};



const handleEditFormSubmit = async () => {
  try {
    const isbn = editFormData.isbn;
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token no disponible");
      return;
    }
   
    const formData = new FormData();
    Object.keys(editFormData).forEach((key) => formData.append(key, editFormData[key]));
   
    if (imagenPortada) {
      formData.append("file", imagenPortada);
    }
    

    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
    const res = await axios.put(
      `http://localhost:4000/updateLibro/${isbn}`, 
      formData, 
      config
    );

    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Libro editado",
        showConfirmButton: false,
        timer: 1500,
      });
   
      cargarLibros(); 
    } else {
      console.error("Error al actualizar la información del libro. Estado:", res.status, res.data);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
   
    if (error.response) {
      if (error.response.status === 400 && error.response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.error,
        });

      }else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar la información del libro.',
      });
    }
    }
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
    
    setLoading(true);
    const response = await axios.get(`http://localhost:4000/libros/${busqueda}`);

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
              className="text-center px-16 py-2 w-96 italic border border-pink-300 rounded-full shadow-md bg-white" 
              placeholder="Buscar titulo..."
            />
            <div className="absolute right-3 top-1/3 transform-translate-y-1/2">
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
           

    {showEditForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-20">
         <div className="bg-white p-8 rounded-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">Editar el libro "{editFormData.isbn}"</h2>
          
          <div className="flex">
          <form className="flex flex-col items-center justify-center m-4">
            <div className="w-2/3 flex flex-col space-x-4">
            <label>
              <input
                type="hidden"
                name="isbn"
                value={editFormData.isbn || ''}
                onChange={handleEditFormChange}
               
              />
            </label>
            <label>
              <span className="text-gray-700 font-semibold">Titulo:</span>
                <input
                  type="text"
                  name="titulo"
                  value={editFormData.titulo || ''}
                  onChange={handleEditFormChange}
                  className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
                />
              </label>
              <label>
              <span className="text-gray-700 font-semibold">Autor:</span>
                <input
                  type="text"
                  name="autor"
                  value={editFormData.autor || ''}
                  onChange={handleEditFormChange}
                  className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
                />
              </label>
              <label>
              <span className="text-gray-700 font-semibold">Categoria:</span>
                <input
                  type="text"
                  name="genero"
                  value={editFormData.genero || ''}
                  onChange={handleEditFormChange}
                  className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"     
                />
              </label>
              <span className="text-gray-700 font-semibold">Año publicación:</span>
              <select
                onChange={handleEditFormChange}
                name="aniopublicacion"
                value={editFormData.aniopublicacion}
                required
                className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
              >
                {// Genera los años desde 1400 hasta el año actual
                Array.from(
                  { length: new Date().getFullYear() - 1400 + 1 },
                  (_, i) => 1400 + i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <label>
              <span className="text-gray-700 font-semibold">Cantidad de copias:</span>
              <input
                onChange={handleEditFormChange}
                type="number"
                name="cantcopias"
                value={editFormData.cantcopias}
                min="0"
                max="infinito"
                className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
              />
              </label>
              <label>
              <span className="text-gray-700 font-semibold">Descripción:</span>
                <textarea
                  name="sinopsis"
                  value={editFormData.sinopsis || ''}
                  onChange={handleEditFormChange}
                  className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
                  rows={calculateTextareaRows(editFormData.sinopsis)}
                />
              </label>
              </div>
              </form>
              
              <div className="mt-10 p-6 ml-6 text-center z-10 m-5">
              <div className="flex flex-col items-center justify-center"></div>
              <form className="text-center mx-auto w-80">
              <div className="border-2 border-gray-400 p-2 rounded-lg m-2 relative flex items-center justify-center h-96 hover:border-pink-600 transition duration-300 ease-out">
              <input
                      onChange={handleImagenChange}
                      type="file"
                      name="file"
                      id="imagenPortada"
                      accept="image/*"
                      required
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    {previewImagen ? (
                      <div className="relative">
                        <button
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <img
                          src={previewImagen}
                          alt="imagen"
                          className="w-full h-full object-cover  rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={0.5}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <p className="text-gray-400">Sube una imagen</p>
                      </div>
                    )}
                  </div>
             
              </form>
              </div>
              </div>
             
             <div className='space-x-36'>
              <button
                type="button"
                onClick={handleEditFormSubmit}
                className="bg-pink-500 text-white py-2 px-4 rounded-md"
              >
              Guardar cambios
              </button>
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="bg-pink-500 text-white py-2 px-4 rounded-md"
              >
              Salir
              </button>
              </div>
          
              </div>     
        </div>
        )}
</div>    
);
}


export default EditarLibro;



