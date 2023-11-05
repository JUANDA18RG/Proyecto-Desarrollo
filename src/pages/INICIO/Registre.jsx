import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import React, { useState } from "react";

export default function Register() {
    const navigate = useNavigate();
   
    const [formData, setFormData] = useState({
      username: '',
      nombres: '',
      apellidos: '',
      correo: '',
      password: ''
    });
    
    const [error, setError] = useState('');
    const [errors, setErrors] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const validateForm = () => {
      const newErrors = {};
      let isValid = true;

    //Que el nombre y apellido solo contenga letras
    const nombreApellido = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/; 
    if (!nombreApellido.test(formData.nombres)) {
      newErrors.nombres = 'Name should contain only letters';
      isValid = false;
    }

    if (!nombreApellido.test(formData.apellidos)) {
      newErrors.apellidos = 'Last name should contain only letters';
      isValid = false;
    }
   
      // Validación para que el username no comience con números
      if (!/^[A-Za-z][A-Za-z0-9!@#$-_%^&*]*$/.test(formData.username)) {
        newErrors.username = 'Username should not start with numbers';
        isValid = false;
      }

    //Validacion correo
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.correo)) {
      newErrors.correo = 'Debes ingresar un correo valido';
      isValid = false;
    }

    // Validación para que la contraseña tenga al menos una mayúscula, una minúscula y un carácter especial
    const expresionRegular = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$-_%^&*]).{8,}$/;
    if (!(expresionRegular.test(formData.password)))
    {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

    const handleSubmit = async (e) => {
      e.preventDefault();   

      // Validación adicional para comprobar que los campos obligatorios no estén vacíos
      if (formData.nombres.trim() === '' || formData.apellidos.trim() === '' || formData.correo.trim() === '' || formData.username.trim() === '' || formData.password.trim() === '') 
      {setErrorMessage('Todos los campos son obligatorios');
        return;
      }
       

      if (validateForm()) {
      try {
        console.log("Username: ", formData.username);
        console.log("Nombre: ", formData.nombres);
        console.log("Apellidos: ", formData.apellidos);
        console.log("Correo: ", formData.correo);
        console.log("Contraseña: ", formData.password);

        const response = await axios.post('http://localhost:4000/register', formData);
        console.log('Registro exitoso', response.data);
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        
      } catch (error) 
        {
          console.log("Error: ", error);
          // Manejar errores
          if (error.response) {
            // La solicitud se realizó y el servidor respondió con un código de estado
            // que cae fuera del rango de 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setError(error.response.data.message);
          } else if (error.request) {
            // La solicitud se realizó pero no se recibió ninguna respuesta
            console.log(error.request);
            setError("No se recibió ninguna respuesta del servidor.");
          } else {
            // Algo sucedió en la configuración de la solicitud que provocó un error
            console.log("Error", error.message);
            setError(error.message);
          }
        }
      }

     setErrorMessage('');
      
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
          backgroundImage: `url('https://2.bp.blogspot.com/-nJ12IC51iYA/Wm-DNYNd0mI/AAAAAAAA2xs/OXbDcqJk6EYXm6YTWi3t_g0j6FHUZNPfwCLcBGAs/s1600/C%25C3%25B3mo%2Barmamos%2Bel%2Bfondo%2Bbibliogr%25C3%25A1fico%2Bde%2Buna%2Bbiblioteca.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="bg-blue-400 bg-opacity-50 absolute inset-0">
        </div>
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative z-10">
          <h1 className="text-4xl text-center mb-4">REGISTER</h1>
          <img
            src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80041.jpg" 
            alt="Logo"
            className="w-40 h-40 rounded-full mx-auto mt-2 border-4 border-blue-500"
          />
          <form className="space-y-4" id="formulario_Registro" onSubmit={handleSubmit}>
          <input
              name = "nombres"
              type="text"
              placeholder="Name"
              value={formData.nombres}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
          
            /> 
              {errors.nombres && (<div style={{top: '100%', fontFamily: 'Open Sans', fontSize: '14px', color:'red', marginTop: '-9px', marginLeft: '9px'}}>{errors.nombres}</div>)}
            
            <input
              name = "apellidos"
              type="text"
              placeholder="Last name"
              value={formData.apellidos}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
             
            />
            {errors.apellidos && (<div style={{top: '100%', fontFamily: 'Open Sans', fontSize: '14px', color:'red', marginTop: '-2px', marginLeft: '9px'}}>{errors.apellidos}</div>)}
            
            <input
              name = "correo"
              type= "texto"  
              placeholder="Email"
              value={formData.correo}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
             {errors.correo && (<div style={{top: '100%', fontFamily: 'Open Sans', fontSize: '14px', color:'red', marginTop: '2px', marginLeft: '9px'}}>{errors.correo}</div>)}
             <input
              name = "username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
           
           />
           {errors.username && (<div style={{top: '100%', fontFamily: 'Open Sans', fontSize: '14px', color:'red', marginTop: '1px', marginLeft: '9px'}}>{errors.username}</div>)}
            <input
              name = "password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              
            />
             {errors.password && (<div style={{top: '100%', fontFamily: 'Open Sans', fontSize: '14px', color:'red', marginTop: '1px', marginLeft: '9px'}}>{errors.password}</div>)}
           
            <button  type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
              Register
            </button>
            {<div id="error-message" className="text-red-500 text-center mt-2"></div>}
                {errorMessage && (<div className="text-red-500 text-center">{errorMessage}</div>)}
      
               {registrationSuccess && 
            (<p className="text-red-500 text-center mt-2">Registro exitoso. Redirigiendo a la página de inicio de sesión... </p>)}
          </form>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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



