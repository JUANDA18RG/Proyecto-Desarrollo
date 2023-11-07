import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword(){

   const [formData, setFormData] = useState({
    email: "",  
    codigo: "",
    nuevaContraseña: "",
    confirmarContraseña: "", 
  });


  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  let   [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if(step == 1){
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Debes ingresar un correo valido';
      isValid = false;
    }
  } else if(step == 2){
     //Validar el codigo

    } else if(step == 3){
      const expresionRegular = /^(?=.[A-Z])(?=.[a-z])(?=.[!@#$-_%^&]).{8,}$/;
      if (!expresionRegular.test(formData.nuevaContraseña)) {
        newErrors.nuevaContraseña ="Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long";
        isValid = false;
      } else if(!expresionRegular.test(formData.confirmarContraseña)) {
        newErrors.confirmarContraseña ="Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long";
        isValid = false;
      }if(formData.nuevaContraseña !== formData.confirmarContraseña) {
        newErrors.confirmarContraseña = "Las contraseñas no coinciden.";
        isValid = false;
      }
    }
  setErrors(newErrors);
  return isValid;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    if (step === 1) {
      try
      {
       console.log("Correo: ", formData.email);
       const response = await axios.post
       ('http://localhost:4000/send/email', { 
         email: formData.email});
          
      if (response.data.success) {

        setStep(2);
        console.log("Paso 2");
        setMessage("Se ha enviado un código de recuperación a su correo electrónico."); 
      }
      }
      catch (error){
        
        if (error.response) {
          setErrorMsg(error.response.data.msg);
        }
        else if (error.request)
        {console.error(error);
        setErrorMsg("Error al comunicarse con el servidor", msg);
      }
    }  
  }
  
    
    //Mandar codigo de validacion
    else if (step === 2) {
     try {
        
        console.log("Código de recuperación: ", formData.codigo);
        const response = await axios.post('http://localhost:4000/verificacion', {
          email: formData.email,
          codigo: formData.codigo
        });
        if (response.data.success) {
          setStep(3);
          setMessage("Código de recuperación válido. Ahora puedes cambiar tu contraseña.");
        }
      } catch (error) {
        console.error(error);
        setErrorMsg("Error al comunicarse con el servidor");
      }
    }
    
    // Cambia la contraseña y muestra un mensaje de éxito
    else if (step === 3) {
      try {
        {
          console.log("Nueva contraseña: ", formData.nuevaContraseña);
          const response = await axios.post('http://localhost:4000/reset', {
            correo: formData.email,
            password: formData.nuevaContraseña,
          });
    
          if (response.data.success) {
            setMessage("Contraseña cambiada con éxito");
          } else {
            setErrorMsg(response.data.msg);
          }
        } 
      } catch (error) {
        console.error(error);
        setErrorMsg("Error al comunicarse con el servidor");
      }
      
    }
    
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
          <form className="space-y-4" id= "recuperacionContraseña" onSubmit={handleSubmit}>
          {step === 1 && (
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
          )}
          {step === 2 && (
            <input
              name="codigo"
              type="text"
              placeholder="Código de recuperación"
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              value={formData.codigo}
              onChange={handleChange}
            />
          )}
          {step === 3 && (
            <>
              <input
                name="nuevaContraseña"
                type="password"
                placeholder="Nueva contraseña"
                className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
                value={formData.nuevaContraseña}
                onChange={handleChange}
              />
               
              <input
                name="confirmarContraseña"
                type="password"
                placeholder="Confirmar contraseña"
                className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
                value={formData.confirmarContraseña}
                onChange={handleChange}
              />
               {errors.confirmarContraseña && (<div style={{ fontFamily: "Helvetica", fontSize: "10px", color: "red", marginTop: "-2px", marginLeft: "9px" }}>
               {errors.confirmarContraseña}</div>)} 
            </>
          )}
 
          {errors.email && ( <div style={{ fontFamily: "Helvetica", fontSize: "10px", color: "red", marginTop: "-9px", marginLeft: "9px" }}>
           {errors.email}  </div>)}
           
          {errors.codigo && (
            <div style={{ fontFamily: "Helvetica", fontSize: "10px", color: "red", marginTop: "-9px", marginLeft: "9px" }}>
              {errors.codigo}
            </div>)}

            {errors.nuevaContraseña && (<div style={{ fontFamily: "Helvetica", fontSize: "10px", color: "red", marginTop: "1px", marginLeft: "9px" }}>
              {errors.nuevaContraseña}</div>)} 
          <button type="submit" className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-300">
            Enviar
          </button>
        </form>

        {message && (<p style={{ color: "green", fontFamily: "Open Sans", fontSize: "18px" }}>
        {message} </p> )}

        {errorMsg && (<p style={{ color: "green", fontFamily: "Open Sans", fontSize: "18px" }}>
        {errorMsg} </p> )}

        
      </div>
    </div>
  );
}






