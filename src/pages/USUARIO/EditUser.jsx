import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfileEdit = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [editableField, setEditableField] = useState(null);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEditField = (field) => {
    setEditableField(field);
  };

  const goBack = () => {
    window.history.back();
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem("username");

      if (username) {
        console.log("username: ", username);
        console.log("Name: ", name);
        console.log("Apellido: ", apellido);
        console.log("Password: ", password);

        const response = await axios.put(
          `http://localhost:4000/updateUser/${username}`,
          {
            nombres: name,
            apellidos: apellido,
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${username}`,
            },
          }
        );
        console.log("Response: ", response);
        // Puedes manejar la respuesta exitosa aquí y redirigir al usuario si es necesario
        navigate("/User");
      } else {
        console.error("username no encontrado");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div
        style={{
          backgroundImage:
            'url("https://www.comunidadbaratz.com/wp-content/uploads/2022/04/Lectura-de-libro-en-biblioteca.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute inset-0"
      ></div>
      <div className="bg-pink-400 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full z-10 relative">
        <h2 className="text-4xl font-bold text-center text-pink-500 mb-10 ">
          Editar Perfil
        </h2>
        <form>
          <div className="relative">
            <div className="mb-4">
              <label
                className="text-gray-600 text-sm font-medium"
                htmlFor="nombre"
              >
                Nombre
              </label>
              {editableField === "nombre" ? (
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:border-pink-400"
                />
              ) : (
                <div className="flex justify-between items-center">
                  <div>{userData.nombre}</div>
                  <button
                    onClick={() => handleEditField("nombre")}
                    className="text-blue-500 hover:bg-blue-600 hover:text-white py-1 px-1 rounded hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="text-gray-600 text-sm font-medium"
                htmlFor="apellido"
              >
                Apellido
              </label>
              {editableField === "apellido" ? (
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:border-pink-400"
                />
              ) : (
                <div className="flex justify-between items-center">
                  <div>{userData.apellido}</div>
                  <button
                    onClick={() => handleEditField("apellido")}
                    className="text-blue-500 hover:bg-blue-600 hover:text-white py-1 px-1 rounded hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="text-gray-600 text-sm font-medium"
                htmlFor="password"
              >
                Contraseña
              </label>
              {editableField === "password" ? (
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:border-pink-400"
                />
              ) : (
                <div className="flex justify-between items-center">
                  <div>{userData.password}</div>
                  <button
                    onClick={() => handleEditField("password")}
                    className="text-blue-500 hover:bg-blue-600 hover:text-white py-1 px-1 rounded hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
          </div>
          {editableField && (
            <button
              onClick={handleSaveChanges}
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 w-full hover:scale-105 transition duration-300 ease-in-out"
            >
              Guardar Cambios
            </button>
          )}
        </form>
      </div>
      <div className="absolute m-2 right-40 top-90 bg-white text-gray-600 p-8 rounded-lg opacity-90 text-center shadow-lg animate-bounce">
        Aquí puedes cambiar tus datos como usuario de BookFinder <br />
        Puedes cambiar tu nombre, apellido y contraseña <br />
        para que puedas seguir disfrutando de nuestros servicios
      </div>
      <button
        className="absolute top-4 left-4 bg-pink-500 text-white p-6 shadow-lg rounded-full hover:bg-pink-600 hover:scale-105 transition duration-300 ease-in-out"
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
    </div>
  );
};

export default UserProfileEdit;
