import React, { useState } from "react";

const UserProfileEdit = () => {
  const [editableField, setEditableField] = useState(null);
  const [userData, setUserData] = useState({
    Nombre: "Nombre",
    Apellido: "Apellido",
    Password: "contraseña",
  });

  const handleEditField = (fieldName) => {
    setEditableField(fieldName);
  };

  const handleSaveChanges = () => {
    // Aquí puedes enviar los datos actualizados al servidor o realizar otras acciones necesarias.
    console.log("Datos actualizados:", userData);
    setEditableField(null); // Para desactivar la edición
  };

  const goBack = () => {
    window.history.back();
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

        <div className="relative">
          {Object.keys(userData).map((field) => (
            <div key={field} className="mb-4">
              {editableField === field ? (
                <div>
                  <label
                    className="text-gray-600 text-sm font-medium"
                    htmlFor={field}
                  >
                    {field === "Nombre" ? "Nombre" : field}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    id={field}
                    name={field}
                    value={userData[field]}
                    onChange={(e) =>
                      setUserData({ ...userData, [field]: e.target.value })
                    }
                    className="w-full p-2 border rounded focus:outline-none  focus:border-pink-400 "
                  />
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>{field === "Nombre" ? "Nombre" : field}</div>
                  <button
                    onClick={() => handleEditField(field)}
                    className="text-blue-500  hover:bg-blue-600 hover:text-white py-1 px-1 rounded hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {editableField && (
          <button
            onClick={handleSaveChanges}
            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 w-full  hover:scale-105 transition duration-300 ease-in-out"
          >
            Guardar Cambios
          </button>
        )}
      </div>
      <div className="absolute right-40 top-90 bg-white text-gray-600 p-8 rounded-lg  opacity-90 text-center shadow-lg">
        Aqui puedes cambiar tus datos como usuario de BookFinder <br />
        puedes cambiar tu nombre, apellido y contraseña <br />
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
