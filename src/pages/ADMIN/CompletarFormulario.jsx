import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import Swal from 'sweetalert2';

const CompletarFormulario = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        password: ""
        
      });
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState("");     
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
   
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
   const validateForm = () => {
        const newErrors = {};
        let isValid = true;
   
        const nombreApellido = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/;
        if (!nombreApellido.test(formData.nombre)) {
          newErrors.nombre = "Name should contain only letters";
          isValid = false;
        }
    
        if (!nombreApellido.test(formData.apellido)) {
          newErrors.apellido = "Last name should contain only letters";
          isValid = false;
        }
        const expresiónRegular = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$-_%^&*]).{8,}$/;
        if (!expresiónRegular.test(formData.password)) {
      newErrors.password =
      "The password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.";
      isValid = false;
    }
     setErrors(newErrors);
     return isValid;
    }   
    
    const handleSubmit = async (e) => {
        e.preventDefault();
  
        if (
            formData.nombre.trim() === "" ||
            formData.apellido.trim() === "" ||
            formData.password.trim()=== ""
        ) {
            Swal.fire({
              title: 'Campos Obligatorios',
              text: 'Todos los campos son obligatorios. Por favor, completa la información.',
              icon: 'warning',
            });
            return;
        }
    
        if (validateForm()) {
          try {
            const token = localStorage.getItem("token");

            console.log('Enviando formulario:', formData);
            const response = await axios.post(
                "http://localhost:4000/completarFormulario",
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("Registro exitoso", response.data);
              Swal.fire({
                title: "Registro Exitoso",
                text: "Tu cuenta ha sido completada exitosamente.",
                icon: "success",
              });
              setRegistrationSuccess(true);
              setTimeout(() => {
                navigate("/login");
              }, 3000)
            } catch (error) {
              console.error("Error al enviar formulario:", error);
              if (error.response) {
                // La solicitud fue hecha y el servidor respondió con un código de estado diferente de 2xx
                console.log("Respuesta del servidor:", error.response.data);
            
                if (error.response.status === 400 && error.response.data.message === "El usuario no existe") {
                  // Mostrar un mensaje significativo al usuario
                  Swal.fire({
                    title: 'Error',
                    text: 'El usuario no existe. Por favor, verifica tus credenciales.',
                    icon: 'error',
                  });
                } else {
                  // Manejar otros errores del servidor
                  // ...
                }
              } else if (error.request) {
                // La solicitud fue hecha pero no se recibió ninguna respuesta
                console.error("No se recibió ninguna respuesta del servidor.");
              } else {
                // Algo sucedió en la configuración de la solicitud que desencadenó un error
                console.error("Error de configuración de la solicitud:", error.message);
              }
            }
        }
};

  return (
    <div className="relative">
      <div
        className="bg-pink-300 bg-opacity-50 absolute inset-0"
        style={{
          zIndex: -1,
        }}
      ></div>
    <div
    className="flex items-center justify-center min-h-screen"
    style={{
      backgroundImage: `url('https://www.comunidadbaratz.com/wp-content/uploads/Todas-las-bibliotecas-son-bellas-por-el-servicio-que-ofrecen-a-sus-comunidades.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
     <div className="bg-pink-400 bg-opacity-50 absolute inset-0"></div>
     <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative z-10">
     <h1 className="text-4xl text-center mb-4">Completar Formulario de Administrador</h1>
          <img
            src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80041.jpg"
            alt="Logo"
            className="w-40 h-40 rounded-full mx-auto mt-2 border-4 border-pink-500"
          />
      <form
            className="space-y-4"
            id="formulario_Registro"
            onSubmit={handleSubmit}
          >
            <input
              name="nombre"
              type="text"
              placeholder="Name"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
            {errors.nombre && (
              <div
                style={{
                  top: "100%",
                  fontFamily: "Open Sans",
                  fontSize: "14px",
                  color: "red",
                  marginTop: "-9px",
                  marginLeft: "9px",
                }}
              >
                {errors.nombre}
              </div>
            )}

            <input
              name="apellido"
              type="text"
              placeholder="Last name"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
            {errors.apellido && (
              <div
                style={{
                  top: "100%",
                  fontFamily: "Open Sans",
                  fontSize: "14px",
                  color: "red",
                  marginTop: "-2px",
                  marginLeft: "9px",
                }}
              >
                {errors.apellido}
              </div>
            )}
             <div className="relative">
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              />
              <span
                className="absolute right-2 top-4 cursor-pointer hover:text-blue-500 opacity-70 transition duration-300"
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
              {errors.password && (
                <div
                  style={{
                    top: "100%",
                    fontFamily: "Open Sans",
                    fontSize: "14px",
                    color: "red",
                    marginTop: "1px",
                    marginLeft: "9px",
                  }}
                >
                  {errors.password}
                </div>
              )}
            </div>
           
            
             <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
            Completar
            </button>
         </form>
     </div>
    </div>
    </div>
  );
}

export default CompletarFormulario;

