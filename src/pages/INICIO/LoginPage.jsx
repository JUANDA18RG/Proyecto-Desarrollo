import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Email: ", email);
      console.log("Password: ", password);
      const response = await axios.post("http://localhost:4000/api/login", {
        correo: email,
        password: password,
      });
      console.log("Response: ", response);
      // Aquí es donde se recibe el token
      const token = response.data.token;
      // Ahora puedes almacenar el token en el almacenamiento local para su uso futuro
      localStorage.setItem("token", token);

      // Redirigir al usuario a la página principal (o donde quieras) después de iniciar sesión
      //this.props.history.push("/Contenido"); // Si estás usando react-router
      navigate("/Contenido");
    } catch (error) {
      console.log("Error: ", error);
      // Manejar errores
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado
        // que cae fuera del rango de 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setError(error.response.data.error);
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
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9uZG8lMjBkZSUyMGxhJTIwYmlibGlvdGVjYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-pink-400 bg-opacity-50 absolute inset-0"></div>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg relative z-10">
        <h1 className="text-3xl text-center mb-4">LOGIN</h1>
        <img
          src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80041.jpg"
          alt="Logo"
          className="w-40 h-40 rounded-full mx-auto mt-2 border-4 border-pink-500"
        />
        <form className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Your Email"
              className="w-full py-2 pl-2 pr-10 border rounded focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full py-2 pl-2 pr-10 border rounded focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-300"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <div className="text-center mt-4 text-gray-600">
          Don't have an account?
          <Link to="/register" className="ml-1 text-blue-500 hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
