import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="relative">
      <div
        className="bg-pink-300 bg-opacity-50 absolute inset-0"
        style={{
          zIndex: -1, // Fondo de color detrás de todos los elementos
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
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-2 px-3 border rounded focus:outline-none focus:border-blue-500"
            />
            <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
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
