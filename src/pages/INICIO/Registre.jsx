import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useState } from "react";


  export default function Register() {
    const [formData, setFormData] = useState({
      username: '',
      nombres: '',
      apellidos: '',
      correo: '',
      password: ''
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        console.log("Username: ", formData.username);
        console.log("Nombre: ", formData.nombres);
        console.log("Apellidos: ", formData.apellidos);
        console.log("Correo: ", formData.correo);
        console.log("Contraseña: ", formData.password);
       

        const response = await axios.post('http://localhost:4000/register', formData);
        console.log('Registro exitoso', response.data);
        // Puedes redirigir al usuario a otra página de éxito aquí si es necesario.
      } catch (error) {
        if(error.response){
          console.error("Error en la respuesta del servidor:", error.response.data)
        }
        console.error('Error al registrar', error.mensaje);
        // Puedes mostrar un mensaje de error al usuario.
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
              required
            /> 
            <input
              name = "apellidos"
              type="text"
              placeholder="Last name"
              value={formData.apellidos}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              required
            />
            <input
              name = "correo"
              type= "email"  
              placeholder="Email"
              value={formData.correo}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              required
            />
             <input
              name = "username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              required
           />
            <input
              name = "password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
              required
            />
            <button  type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
              Register
            </button>
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
/*
function validarFormulario(e) {
  const formulario = getFormulario(e);

  // Validar el name
  if (!/^[a-zA-ZA-ÿ]+{3,50}$/.test(formulario.username)) {
    const elementoError = document.querySelector('#error_username');
    elementoError = 'El username debe empezar con una letra y tener 8 caracteres';
    return false;
  }
   // Validar el lastname
   if (!/^[a-zA-ZA-ÿ\s]{3,50}$/.test(formulario.lastName)) {
    const elementoError = document.querySelector('#error_username');
    elementoError.textContent = 'El apellido debe empezar con una letra y tener 8 caracteres';
    return false;
  }
   // Validar el correo
  if (/^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formulario.email)) {
    const elementoError = document.querySelector('#error_username');
    elementoError.textContent = 'El a debe empezar con una letra y tener 8 caracteres';
    return false;
  }
   // Validar el username
  if (/^[a-z][a-z0-9]{7}$/.test(formulario.username)) {
    const elementoError = document.querySelector('#error_username');
    elementoError.textContent = 'El username debe empezar con una letra y tener 8 caracteres';
    return false;
  }
  
  // Validar el password
  if (!/^(?=.*[a-z])(?=.*[A-Z]){8}$/.test(formulario.password)) {
    const elementoError = document.querySelector('#error_password');
    elementoError.textContent = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y una letra minúscula';
    return false;
  }
  return true;
}
*/



/*

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#formulario_Registro');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formularioValido = validarFormulario(e);
      if (formularioValido) {
        form.submit();
      }
    });
  } else {
    console.log('El formulario no existe!!!');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#formulario_Registro');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formulario = getFormulario(e);
      console.log(formulario);
    });
  } else {
    console.log('El formulario no existe!!!');

  }
 
  fetch ("http://localhost:4000/register", {
  method: "POST",
  headers: {
   "Content-Type": "application/json" 
  },
  body: getFormulario,
  })
  .then(response => {
    if (response.status === 200) {
      const respuestaJSON = response.json();
      console.log(respuestaJSON);
    } else {
      console.log(response.status);
    }
  })
  .catch(error => {
    console.log(error);
  });
});



*/


