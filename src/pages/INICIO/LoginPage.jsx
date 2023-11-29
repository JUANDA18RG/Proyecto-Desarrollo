import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        correo: email,
        password: password,
      });

      const token = response.data.token;
      const username = response.data.username;
      const isAdmin = response.data.isAdmin;
      const isSuperAdmin = response.data.isSuperAdmin;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("isAdmin", isAdmin);
      localStorage.setItem("isSuperAdmin", isSuperAdmin);

      if (isAdmin) {
        const formResponse = await axios.get(
          "http://localhost:4000/completarFormulario",
          {
            params: {
              correo: email,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(formResponse.data.form)
        {
          navigate("/login/completarFormulario");
        }
        else
        {
          navigate(`/ContenidoAdmin/${isSuperAdmin}`);
        }
        
      } else {
        navigate("/Contenido");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        setError(error.response.data.error);
      } else if (error.request) {
        console.log(error.request);
        setError("No se recibió ninguna respuesta del servidor.");
      } else {
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
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full py-2 pl-2 pr-10 border rounded focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-300"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center m-1">{error}</p>}
        <div className="text-center mt-4 text-gray-600">
          Don't have an account?
          <Link to="/register" className="ml-1 text-blue-500 hover:underline">
            Register now
          </Link>
        </div>
        <div className="text-center mt-4 text-gray-600">
          Forgot password?
          <Link
            to="/ForgotPassword"
            className="ml-1 text-blue-500 hover:underline"
          >
            Recover password
          </Link>
        </div>
      </div>
    </div>
  );
}