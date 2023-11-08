import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const navItems = [
  {
    id: 0,
    name: "Home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    id: 1,
    name: "Carrusel",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Busqueda",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Info",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    ),
  },
];

const NavBar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  ///////
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Cierre de sesión solicitado");
    // Resto de la lógica
    localStorage.removeItem("token");

    // Reemplazar la entrada en el historial del navegador para evitar regresar a la página
    window.history.replaceState(null, null, "/");

    // Navegar de vuelta a la página principal
    navigate("/");
  };

  useEffect(() => {
    const closeMenu = () => {
      if (isProfileMenuOpen) {
        setProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isProfileMenuOpen]);

  return (
    <div
      className={`w-full mx-auto fixed top-0 py-8 sm:py-6 z-30 ${
        scrollPosition > 0 ? "bg-pink-600" : "bg-pink-600"
      } shadow-md`}
    >
      <nav className="container mx-auto flex items-center justify-between">
        <div data-aos="fade-down" className="logo">
          <Link className="flex items-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span className="font-bold text-4xl ml-2 text-white">
              Book Finder
            </span>
          </Link>
        </div>
        <ul className="flex items-center space-x-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.name}`}
                className="cursor-pointer text-white hover:text-purple-800 font-bold m-4 text-xl flex items-center transition duration-500 ease-in-out hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${item.name}`).scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
          <ul className="flex items-center space-x-4">
            <li>
              <Link
                to="/Meritos"
                className="cursor-pointer text-white hover:text-purple-800 font-bold m-4 text-xl flex items-center transition duration-500 ease-in-out hover:scale-110"
              >
                <span className="text-lg">Acerca de</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Link>
            </li>
          </ul>
          <div className="relative group">
            <div className="flex">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProfileMenu();
                }}
                className="hover:scale-110 hover:text-pink-600 transition duration-500 ease-in-out text-xl bg-white rounded flex items-center px-4 py-4 text-pink-600 font-bold shadow-md"
              >
                <span className="text-lg">Profile</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mt-6 ml-2 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-40  shadow-sm rounded">
                <div className="bg-slate-50 rounded">
                  <ul className="py-4 px-4">
                    <li>
                      <Link
                        to="/User"
                        className="block px-4 py-2 text-sm hover:bg-pink-500 hover:text-white rounded hover:scale-110 transition duration-300 ease-in-out"
                      >
                        Tu perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm hover:bg-pink-500 hover:text-white rounded hover:scale-110 transition duration-300 ease-in-out"
                      >
                        Ajustes
                      </Link>
                    </li>
                    <li className="hover:bg-blue-500 hover:text-white rounded hover:scale-110 transition duration-300 ease-in-out">
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm  rounded text-center"
                      >
                        Salir
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
