import { Link } from 'react-router-dom';
import React, { useState } from "react";

export default function forgotPassword(){

  const [formData, setFormData] = useState({
    correo: '',
    
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.correo)) {
      newErrors.correo = 'Debes ingresar un correo valido';
      isValid = false;
    }
  setErrors(newErrors);
  return isValid;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (validateForm()) {
    console.log("Correo: ", formData.correo);
  }
};
  


   
   return(
       <div
        className="flex items-center justify-center min-h-screen"
        style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9uZG8lMjBkZSUyMGxhJTIwYmlibGlvdGVjYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
      >
      <div className="bg-pink-400 bg-opacity-50 absolute inset-0">
        </div>
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative z-10">
          <h1 className="text-4xl text-center mb-4">RESET PASSWORD</h1>
          <img
            src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80041.jpg" 
            alt="Logo"
            className="w-40 h-40 rounded-full mx-auto mt-2 border-4 border-pink-500"
          />
       
          <form className="space-y-4" id= "recuperacionContraseña"onSubmit={handleSubmit}>
          <input
              name = "correo"
              type="text"
              placeholder="Email"
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              value={formData.correo}
              onChange={handleChange}
          
              required
            />
             {errors.correo && (<div style={{top: '100%', fontFamily: 'Helvética', fontSize: '10px', color:'red', marginTop: '-9px', marginLeft: '9px'}}>{errors.correo}</div>)}
            <button type="submit" className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-300">
              Enviar
            </button>
          </form>
       </div>
     </div>   
  ) ;
}

