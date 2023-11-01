import React, { useState } from 'react';

const UserProfileEdit = () => {
  const [editableField, setEditableField] = useState(null);
  const [userData, setUserData] = useState({
    name: 'Nombre de usuario',
    fullName: 'Nombre Completo',
    email: 'correo@ejemplo.com',
    password: 'contraseña',
  });

  const handleEditField = (fieldName) => {
    setEditableField(fieldName);
  };

  const handleSaveChanges = () => {
    // Aquí puedes enviar los datos actualizados al servidor o realizar otras acciones necesarias.
    console.log('Datos actualizados:', userData);
    setEditableField(null); // Para desactivar la edición
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">Editar Perfil</h2>
        {Object.keys(userData).map((field) => (
          <div key={field} className="mb-4">
            {editableField === field ? (
              <div>
                <label className="text-gray-600 text-sm font-medium" htmlFor={field}>
                  {field === "fullName" ? "Nombre Completo" : field}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  id={field}
                  name={field}
                  value={userData[field]}
                  onChange={(e) => setUserData({ ...userData, [field]: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  {field === "fullName" ? "Nombre Completo" : field}
                </div>
                <button
                  onClick={() => handleEditField(field)}
                  className="text-blue-500 hover:underline"
                >
                  Editar
                </button>
              </div>
            )}
          </div>
        ))}
        {editableField && (
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Guardar Cambios
          </button>
        )}
      </div>
      <button className="absolute top-4 left-4 bg-pink-500 text-white p-6 shadow-lg rounded-full hover:bg-pink-700 hover:text-white" onClick={goBack}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
</button>
    </div>
  );
};

export default UserProfileEdit;
