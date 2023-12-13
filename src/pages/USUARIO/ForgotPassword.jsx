import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

export default function ForgotPassword(){
  const navigate = useNavigate();

   const [formData, setFormData] = useState({
    email: "",  
    codigo: "",
    nuevaContraseña: "",
    confirmarContraseña: "", 
  });

  const [errors, setErrors] = useState({}); //Errores en la verificacion
  const [step, setStep] = useState(1);      
  let   [errorMsg, setErrorMsg] = useState(''); //Errrores traidos del backend
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


const validateForm = () => {
  const newErrors = {};
  let isValid = true;

  if (step === 1) {
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Debes ingresar un correo válido';
      isValid = false;
    }
  } else if (step === 3) {

    const expresionContraseña = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%*^&_+=!]).{8,}$/;

    if (!expresionContraseña.test(formData.nuevaContraseña)) {
      newErrors.nuevaContraseña =
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un carácter especial y tener al menos 8 caracteres de longitud.";
      isValid = false;
    } else if (!expresionContraseña.test(formData.confirmarContraseña)) {
      newErrors.confirmarContraseña =
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un carácter especial y tener al menos 8 caracteres de longitud.";
      isValid = false;
    }
    if (formData.nuevaContraseña !== formData.confirmarContraseña) {
      newErrors.confirmarContraseña = "Las contraseñas no coinciden.";
      isValid = false;
    }
  }
  setErrors(newErrors);
  return isValid;
};




const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) {
    return;
  }
  setLoading(true);

  if (validateForm()) {
    try {
      if (step === 1) {
        const response = await axios.post('http://localhost:4000/send/email', {
          email: formData.email
        });

        if (response.data.success) {
          setStep(2);
          await Swal.fire({
            title: "Codigo enviado",
            text: "Se ha enviado un código de recuperación a su correo electrónico.",
            icon: "success",
          });
        }
      } else if (step === 2) {
        const response = await axios.post('http://localhost:4000/verificacion', {
          email: formData.email,
          codigo: formData.codigo
        });
        if (response.data.success) {
          setStep(3);
          await Swal.fire({
            title: "Código Válido",
            text: "Código de recuperación válido. Ahora puedes cambiar tu contraseña.",
            icon: "success"
          });
        }
      } else if (step === 3) {
        const response = await axios.post('http://localhost:4000/reset', {
          correo: formData.email,
          password: formData.nuevaContraseña,
        });

        if (response.data.success) {
          await Swal.fire({
            title: "Contraseña Cambiada",
            text: "Contraseña cambiada con éxito. Seras redirigido a la página de inicio de sesión.",
            icon: "success"
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
         if (response.data.status === 'contraseña no valida') {
            setErrorMsg('La contraseña no cumple con los criterios de validez.');
          } else {
          setErrorMsg(response.data.message);
          await Swal.fire({
            title: 'Error',
            text: response.data.msg,
            icon: 'error',
          })
        }}
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else if (error.request) {
        console.error(error);
        setErrorMsg("Error al comunicarse con el servidor");
      }
      await Swal.fire({
        title: 'Error',
        text: error.response ? error.response.data.message : 'An error occurred',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  } else {
    setLoading(false);
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
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-pink-500"
              value={formData.email}
              onChange={handleChange}
            />
          )}
          {step === 2 && (
            <input
              name="codigo"
              type="text"
              placeholder="Código de recuperación"
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-pink-500"
              maxLength={6} 
              value={formData.codigo}
              onChange={handleChange}
            />
          )}
          {step === 3 && (
            <>
              <div className="relative">
              <input
                name="nuevaContraseña"
                type={passwordVisible ? "text" : "password"}
                placeholder=" Contraseña"
                value={formData.nuevaContraseña}
                onChange={handleChange}
                className="w-full py-2 px-3 border rounded focus:outline-none focus:border-pink-500"
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
            </div>

            <div className="relative">
              <input
                name="confirmarContraseña"
                type={passwordVisible1 ? "text" : "password"}
                placeholder="Recuperar Contraseña"
                value={formData.confirmarContraseña}
                onChange={handleChange}
                className="w-full py-2 px-3 border rounded focus:outline-none focus:border-pink-500"
              />
              <span
                className="absolute right-2 top-4 cursor-pointer hover:text-pink-500 opacity-70 transition duration-300"
                onClick={() => setPasswordVisible1(!passwordVisible1)}
              >
                {passwordVisible1 ? (
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
            </div>
            </>
          )}

          {errors.nuevaContraseña && (
               <div style={{ top: "100%", fontFamily: "Open Sans", fontSize: "14px", color: "red", marginTop: "1px", marginLeft: "9px"}} >
                  {errors.nuevaContraseña}
                </div> )}
          {errors.confirmarContraseña && (
                <div
                  style={{top: "100%", fontFamily: "Open Sans", fontSize: "14px", color: "red", marginTop: "1px", marginLeft: "9px", }}>
                  {errors.confirmarContraseña}  </div> )}
               
          {errors.email && ( <div style={{ fontFamily: "Helvetica", fontSize: "10px", color: "red", marginTop: "-9px", marginLeft: "9px" }}>
           {errors.email}  </div>)}
           
          {errors.codigo && (
            <div style={{ fontFamily: "Helvetica", fontSize: "10px", color: "red", marginTop: "-9px", marginLeft: "9px" }}>
              {errors.codigo}
            </div>)}

          <button type="submit" className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-300" disabled={loading} >
          {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}





