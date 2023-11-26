import React from "react";
import { Link } from "react-router-dom";

export default function ContenidoAdmin() {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <img
          src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80041.jpg"
          alt=""
          className="w-96 h-96 object-cover border-4 border-pink-500 rounded-full m-3 animate-bounce"
        />
        <h1 className="text-4xl font-bold mt-10 text-center">
          SECCION ADMINISTRADOR
        </h1>
      </div>

      <div className="w-1/2 bg-pink-500 flex flex-col justify-center items-center p-8">
        <div className="bg-white shadow-2xl rounded-lg p-10 w-150">
          <h2 className="text-4xl font-semibold mb-6 text-pink-500 text-center">
            Menu administrador
          </h2>
          <nav className="space-y-3">
            <Link
              to="/"
              className="flex rounded items-center justify-between text-blue-500 hover:bg-pink-600 transition duration-500 border-b hover:text-white border-gray-200 py-4 text-lg"
            >
              <span className="m-2">Agregar Libro</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
            <Link
              to="/"
              className="flex rounded items-center justify-between text-blue-500 hover:bg-pink-600 transition duration-500 border-b hover:text-white border-gray-200 py-4 text-lg"
            >
              <span className="m-2">Eliminar Libro</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                />
              </svg>
            </Link>
            <Link
              to="/"
              className="flex rounded items-center justify-between text-blue-500 hover:bg-pink-600 transition duration-500 border-b hover:text-white border-gray-200 py-4 text-lg"
            >
              <span className="m-2">Editar Libro</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>
            <Link
              to="/"
              className="flex rounded items-center justify-between text-blue-500 hover:bg-pink-600 transition duration-500 border-b hover:text-white border-gray-200 py-4 text-lg"
            >
              <span className="m-2">Cambiar estado de reserva</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </Link>
            <Link
              to="/EliminarUsuario"
              className="flex rounded items-center justify-between text-blue-500 hover:bg-pink-600 transition duration-500 border-b hover:text-white border-gray-200 py-4 text-lg"
            >
              <span className="m-2">Eliminar usuario</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </nav>
          <button className="flex items-center justify-between bg-blue-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-700  w-full hover:scale-110 transition duration-500">
            <span className="m-2">Crear administrador</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 m-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
