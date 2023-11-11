import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
  
const UserProfileEdit = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [editableField, setEditableField] = useState(null);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [nameError, setNameError] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleEditField = (field) => {
    setEditableField(field);

    if (field === "nombre") {
      setNameError("");
    } else if (field === "apellido") {
      setApellidoError("");
    } else if (field === "password") {
      setPasswordError("");
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");

      if (username) {
        let isValid = true;
        if (editableField === "nombre") {
          if (!name) {
            setNameError("Nombre es obligatorio");
            isValid = false;
          } else if (!/^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/.test(name)) {
            setNameError("Nombre no puede contener números");
            isValid = false;
          }
        }
        if (editableField === "apellido") {
          if (!apellido) {
            setApellidoError("Apellido es obligatorio");
            isValid = false;
          } else if (!/^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/.test(apellido)) {
            setApellidoError("Apellido no puede contener números");
            isValid = false;
          }
        }
        if (editableField === "password") {
          if (!password) {
            setPasswordError("Contraseña es obligatoria");
            isValid = false;
          } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            setPasswordError(
              "Contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número"
            );
            isValid = false;
          }
        }

        if (isValid) {
          const response = await axios.put(
            `http://localhost:4000/updateUser/${username}`,
            {
              nombres: name,
              apellidos: apellido,
              password: password,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRegistrationSuccess(true);
          setTimeout(() => {
            navigate("/User");
          }, 3000);
        }
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
                <div>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-pink-400"
                  />
                  <div className="text-red-500 text-sm">{nameError}</div>
                </div>
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
                <div>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-pink-400"
                  />
                  <div className="text-red-500 text-sm">{apellidoError}</div>
                </div>
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
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-pink-400"
                  />
                  <span
                    className="absolute right-2 top-4 cursor-pointer hover:text-pink-500 opacity-70 transition duration-300"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </span>
                  <div className="text-red-500 text-sm">{passwordError}</div>
                </div>
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
          {registrationSuccess && (
            <p className="text-green-600 text-center m-2">
              Cambio de datos Exitoso{" "}
            </p>
          )}
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
