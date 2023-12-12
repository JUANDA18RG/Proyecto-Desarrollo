import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
const FloatingButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showHelp, setShowHelp] = useState(true);
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

  const toggleChat = () => {
    setShowChat(!showChat);
    setShowHelp(false);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = (item) => {
    if (inputText.trim() === "") return;

    const userMessage = { text: inputText, user: "usuario" };

    setTimeout(() => {
      const userMessageLower = inputText.toLowerCase();
      if (
        userMessageLower.includes("inicio") ||
        userMessageLower.includes("home") ||
        userMessageLower.includes("bienvenida") ||
        userMessageLower.includes("bienvenido") ||
        userMessageLower.includes("bienvenidos") ||
        userMessageLower.includes("inicio")
      ) {
        const botMessage = {
          text: (
            <p>
              El área de inicio se encuentra al principio de la página. Haz clic
              aquí para ir a la sección de inicio:{" "}
              {navItems.map(
                (item) =>
                  item.name === "Home" && (
                    <Link
                      href={`#${item.name}`}
                      className="text-pink-500 bg-white rounded-lg p-1 m-1"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(`#${item.name}`).scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      {item.name}
                    </Link>
                  )
              )}
            </p>
          ),
          user: "chat",
          index: "categorias",
        };
        setChatMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          botMessage,
        ]);
      } else if (
        userMessageLower.includes("categorías") ||
        userMessageLower.includes("categorias") ||
        userMessageLower.includes("categoria") ||
        userMessageLower.includes("categoría")
      ) {
        const botMessage = {
          text: (
            <p>
              El área de categorías se encuentra después del inicio de la
              página. Haz clic aquí para ir a la sección de categorías:{" "}
              {navItems.map(
                (item) =>
                  item.name === "Carrusel" && (
                    <Link
                      href={`#${item.name}`}
                      className="text-pink-500 bg-white rounded-lg p-1 m-1"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(`#${item.name}`).scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      {item.name}
                    </Link>
                  )
              )}
            </p>
          ),
          user: "chat",
          index: "categorias",
        };
        setChatMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          botMessage,
        ]);
      } else if (
        userMessageLower.includes("busqueda") ||
        userMessageLower.includes("busca") ||
        userMessageLower.includes("buscar") ||
        userMessageLower.includes("buscador")
      ) {
        const botMessage = {
          text: (
            <p>
              El área de búsqueda se encuentra después del área de categorías.
              Haz clic aquí para ir a la sección de búsqueda:{" "}
              {navItems.map(
                (item) =>
                  item.name === "Busqueda" && (
                    <Link
                      href={`#${item.name}`}
                      className="text-pink-500 bg-white rounded-lg p-1 m-1"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(`#${item.name}`).scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      {item.name}
                    </Link>
                  )
              )}
            </p>
          ),
          user: "chat",
          index: "categorias",
        };
        setChatMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          botMessage,
        ]);
      } else if (
        userMessageLower.includes("informacion") ||
        userMessageLower.includes("información") ||
        userMessageLower.includes("info")
      ) {
        const botMessage = {
          text: (
            <p>
              El área de información se encuentra después del área de búsqueda.
              Haz clic aquí para ir a la sección de información:{" "}
              {navItems.map(
                (item) =>
                  item.name === "Info" && (
                    <Link
                      href={`#${item.name}`}
                      className="text-pink-500 bg-white rounded-lg p-1 m-1"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(`#${item.name}`).scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      {item.name}
                    </Link>
                  )
              )}
            </p>
          ),
          user: "chat",
          index: "categorias",
        };
        setChatMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          botMessage,
        ]);
      } else if (
        userMessageLower.includes("Usuario") ||
        userMessageLower.includes("usuario") ||
        userMessageLower.includes("perfil") ||
        userMessageLower.includes("Perfil") ||
        userMessageLower.includes("cuenta") ||
        userMessageLower.includes("Cuenta") ||
        userMessageLower.includes("mi cuenta") ||
        userMessageLower.includes("Mi cuenta")
      ) {
        const botMessage = {
          text: (
            <p>
              El área de información se encuentra después del área de búsqueda.
              Haz clic aquí para ir a la sección de información:{" "}
              <Link
                to="/User"
                className="text-pink-500 bg-white rounded-lg p-1 m-1"
              >
                Tu perfil
              </Link>
            </p>
          ),
          user: "chat",
          index: "Perfil",
        };
        setChatMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          botMessage,
        ]);
      }
      //si no es ninguno de los anteriores entonces que el bot diga que no entiende lo que necesitas
      else {
        const botMessage = {
          text: (
            <p>
              Lo siento, no entiendo lo que necesitas. Puedes intentar
              comunicandote con nosotros a través de nuestro correo electrónico:{" "}
              <a
                href="mailto:Bookfinder553@gmail.com"
                className="text-pink-500 bg-white rounded-lg p-1 m-1"
              >
                BookFinder
              </a>
            </p>
          ),
        };
        setChatMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          botMessage,
        ]);
      }
    }, 500);

    setInputText("");
  };

  useEffect(() => {
    const initialBotMessage = {
      text:
        "Hola, ¿en qué puedo ayudarte? Soy el asistente virtual de BookFinder y estoy aquí para ayudarte a navegar por la página." +
        "Tengo estas opciones para ti: Inicio, Categorías, Búsqueda, Información y Perfil.",
      user: "chat",
    };

    setChatMessages([initialBotMessage]);
  }, []);

  return (
    <div className="fixed bottom-10 right-10 flex items-center">
      {showChat ? (
        <div
          className="bg-white w-64 rounded-lg shadow-lg p-4 border-2 border-pink-500"
          style={{ position: "absolute", right: "72px", bottom: "72px" }}
        >
          {/* Encabezado del chat */}
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-lg font-semibold">BookFinder</p>
            <button onClick={toggleChat} className="text-white bg-white">
              {/* Botón de salida del chat */}
              <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center p-1">
                X
              </span>
            </button>
          </div>

          {/* Historial de mensajes del chat */}
          <div className="mt-4 overflow-y-auto" style={{ maxHeight: "300px" }}>
            {chatMessages.map((message, index) => (
              <div key={index}>
                <div
                  className={`mb-2 ${
                    message.user === "usuario" ? "text-left" : "text-right"
                  }`}
                >
                  <div
                    className={`bg-${
                      message.user === "usuario" ? "pink-500" : "blue-500"
                    } text-white p-2 rounded-lg inline-block max-w-2/3`}
                  >
                    {message.index ? (
                      <a href={`#${message.index}`}>{message.text}</a>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cuadro de texto para enviar mensajes */}
          <div className="mt-4">
            <textarea
              rows="2"
              className="w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Escribe tu mensaje..."
              value={inputText}
              onChange={handleInputChange}
              style={{ resize: "none" }}
            ></textarea>
            <button
              className="bg-pink-500 hover-bg-pink-700 text-white font-semibold rounded-full w-full h-10 mt-2 "
              onClick={handleSendMessage}
            >
              Enviar
            </button>
          </div>
        </div>
      ) : null}

      {showHelp && (
        <div className="absolute right-24 bg-white text-gray-600 p-2 rounded-lg shadow opacity-90 text-center">
          ¿Necesitas ayuda?
        </div>
      )}

      <button
        className="bg-pink-500 hover-bg-pink-700 text-white font-semibold rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-pink-700 transition-all duration-300"
        onClick={toggleChat}
        style={{ position: "relative", left: "0", bottom: "0" }}
      >
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
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
      </button>
    </div>
  );
};

export default FloatingButton;
