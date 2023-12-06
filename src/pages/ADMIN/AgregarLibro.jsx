import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AgregarLibro() {
  const goBack = () => {
    window.history.back();
  };

  const handleRemoveImage = () => {
    setImagenPortada(null);
    setPreviewImagen(null);
  };

  const [imagenPortada, setImagenPortada] = useState(null);
  const [previewImagen, setPreviewImagen] = useState(null);
  const [libro, setLibro] = useState({
    ISBN: "",
    Titulo: "",
    Autor: "",
    Genero: "",
    Cantcopias: "",
    anioPublicacion: "",
    descripcion: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibro((prevLibro) => ({
      ...prevLibro,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(libro).forEach((key) => formData.append(key, libro[key]));

    if (imagenPortada) {
      formData.append("file", imagenPortada);
    } else {
      console.error("No se seleccionó ninguna imagen de portada");
      return;
    }

    const token = localStorage.getItem("token");
    const isSuperAdmin = localStorage.getItem("isSuperAdmin");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/book/createBook",
        formData,
        config
      );

      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Libro agregado",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/ContenidoAdmin/" + isSuperAdmin);
        }, 1500);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el libro al sistema :(" + err + ")",
      });
    }
  };

  return (
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
      <div
        className="relative flex flex-col items-center justify-center h-screen"
        style={{
          backgroundImage:
            'url("https://st4.depositphotos.com/1001877/37816/i/450/depositphotos_378168190-stock-photo-library-bookshelves-with-books-and.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 m-4 text-center z-10">
          <h1 className="text-4xl font-bold mb-4">Agregar Libro</h1>
          <div className="flex">
            <form className="flex flex-col items-center justify-center m-4">
              <input
                onChange={handleInputChange}
                type="text"
                placeholder="ISBN"
                name="ISBN"
                value={libro.ISBN}
                className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
              />
              <input
                onChange={handleInputChange}
                type="text"
                placeholder="Titulo"
                name="Titulo"
                value={libro.Titulo}
                className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
              />
              <input
                onChange={handleInputChange}
                type="text"
                placeholder="Autor"
                name="Autor"
                value={libro.Autor}
                className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
              />
              <input
                onChange={handleInputChange}
                type="text"
                placeholder="Genero"
                name="Genero"
                value={libro.Genero}
                className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
              />
              <input
                onChange={handleInputChange}
                type="number"
                placeholder="Cantidad de copias"
                name="Cantcopias"
                value={libro.Cantcopias}
                className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
              />
              <select
                onChange={handleInputChange}
                name="anioPublicacion"
                value={libro.anioPublicacion}
                className="border-2 border-gray-400 p-2 rounded-lg m-2 w-80 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
              >
                <option className="text-gray-400">año de publicacion</option>
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
              <textarea
                onChange={handleInputChange}
                type="text"
                placeholder="Descripción"
                name="descripcion"
                value={libro.descripcion}
                className="border-2 resize-none border-gray-400 p-2 rounded-lg m-2 w-80 h-32 focus:outline-none focus:border-pink-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500"
              />
            </form>
            <div className="mt-10 p-6 ml-6 text-center z-10 m-5">
              <div className="flex flex-col items-center justify-center">
                <form className="text-center mx-auto w-80">
                  <div className="border-2 border-gray-400 p-2 rounded-lg m-2 relative flex items-center justify-center h-96 hover:border-pink-600 transition duration-300 ease-out">
                    <input
                      onChange={handleImagenChange}
                      type="file"
                      name="imagenPortada"
                      id="imagenPortada"
                      accept="image/*"
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
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-pink-500 text-white p-3 rounded-lg m-2 w-80 hover:bg-pink-600 transition duration-300 ease-in-out hover:scale-105"
          >
            Agregar
          </button>
        </div>
      </div>
      <div className="bg-cyan-500 bg-opacity-50 absolute inset-0"></div>
    </>
  );
}
