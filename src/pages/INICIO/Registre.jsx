import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    nombres: "",
    apellidos: "",
    correo: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [verifying, setVerifying] = useState(false);

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
    const usernameRegex = /^[A-Za-z][A-Za-z0-9!@#$-_%^&*]*$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%*^&_+=!.-]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Validación de campos y actualización de errores
    if (!nombreApellido.test(formData.nombres)) {
      newErrors.nombres = "El campo de nombre debe contener solo letras.";
      isValid = false;
    }
  
    if (!nombreApellido.test(formData.apellidos)) {
      newErrors.apellidos = "El campo de apellido debe contener solo letras.";
      isValid = false;
    }
  
    if (!emailRegex.test(formData.correo)) {
      newErrors.correo = "El campo debe ser un correo valido";
      isValid = false;
    }
  
    if (!usernameRegex.test(formData.username)) {
      newErrors.username = "El username no debe empezar por número o simbolo";
      isValid = false;
    }
  
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un carácter especial y tener al menos 8 caracteres de longitud.";
      isValid = false;
    }
    

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.nombres.trim() === "" ||
      formData.apellidos.trim() === "" ||
      formData.correo.trim() === "" ||
      formData.username.trim() === "" ||
      formData.password.trim() === ""
    ) {
      Swal.fire({
        title: "Campos Obligatorios",
        text:
          "Todos los campos son obligatorios. Por favor, completa la información.",
        icon: "warning",
      });
      return;
    }

    if (validateForm()) {
      setVerifying(true);

      try {
        const response = await axios.post(
          "http://localhost:4000/register",
          formData
        );

        console.log("Registro exitoso", response.data);

        Swal.fire({
          title: "Registro Exitoso",
          text: "Tu cuenta ha sido registrada exitosamente.",
          icon: "success",
        });

        setRegistrationSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.log("Error: ", error);

        Swal.fire({
          title: "Error",
          text:
            error.response?.data?.message || "Hubo un error en el servidor.",
          icon: "error",
        });
      } finally {
        setVerifying(false);
      }
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: `url('https://2.bp.blogspot.com/-nJ12IC51iYA/Wm-DNYNd0mI/AAAAAAAA2xs/OXbDcqJk6EYXm6YTWi3t_g0j6FHUZNPfwCLcBGAs/s1600/C%25C3%25B3mo%2Barmamos%2Bel%2Bfondo%2Bbibliogr%25C3%25A1fico%2Bde%2Buna%2Bbiblioteca.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-blue-400 bg-opacity-50 absolute inset-0"></div>
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative z-10">
          <h1 className="text-4xl text-center mb-4">REGISTER</h1>
          <img
            src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80041.jpg"
            alt="Logo"
            className="w-40 h-40 rounded-full mx-auto mt-2 border-4 border-blue-500"
          />
          <form
            className="space-y-4"
            id="formulario_Registro"
            onSubmit={handleSubmit}
          >
            <input
              name="nombres"
              type="text"
              placeholder="Name"
              value={formData.nombres}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
            {errors.nombres && (
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
                {errors.nombres}
              </div>
            )}

            <input
              name="apellidos"
              type="text"
              placeholder="Last name"
              value={formData.apellidos}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
            {errors.apellidos && (
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
                {errors.apellidos}
              </div>
            )}

            <input
              name="correo"
              type="text"
              placeholder="Email"
              value={formData.correo}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />

            {errors.correo && (
              <div
                style={{
                  top: "100%",
                  fontFamily: "Open Sans",
                  fontSize: "14px",
                  color: "red",
                  marginTop: "2px",
                  marginLeft: "9px",
                }}
              >
                {errors.correo}
              </div>
            )}
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
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
                {errors.username}
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
                className="absolute right-2  top-4 cursor-pointer hover:text-blue-500 opacity-70 transition duration-300"
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
            {verifying ? (
              <div className="flex justify-center">
                <div className="flex items-center justify-center">
                  <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle text-blue-600">
                    <span className="hidden">Loading...</span>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
              >
                Register
              </button>
            )}
            <div
              id="error-message"
              className="text-red-500 text-center mt-2"
            ></div>
          </form>
          <div className="text-center mt-4 text-gray-500">
            Already have an account?
            <Link to="/login" className="ml-1 text-blue-500 hover:underline">
              Log in now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
