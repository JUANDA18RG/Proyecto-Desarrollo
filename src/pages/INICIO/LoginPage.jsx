import { Link } from "react-router-dom";
export default function LoginPage() {
  
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
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 2.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L12.586 10H3a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full py-2 pl-2 pr-10 border rounded focus:outline-none focus:border-blue-500"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.293 2.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L14.586 10H3a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <Link to="/Contenido">
            <button className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-300">
              Login
            </button>
          </Link>
        </form>
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
