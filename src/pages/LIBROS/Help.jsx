import React, { useState, useEffect } from 'react';

const FloatingButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [showHelp, setShowHelp] = useState(true);

  const toggleChat = () => {
    setShowChat(!showChat);
    setShowHelp(false); // Ocultar el mensaje de ayuda cuando se muestra el chat
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage = { text: inputText, user: 'usuario' };

    setTimeout(() => {
      const userMessageLower = inputText.toLowerCase();
      if (userMessageLower.includes('inicio')) {
        const botMessage = {
          text: (
            <a href="#inicio">Puedes comenzar aquí:</a> // Agrega el enlace
          ),
          user: 'chat',
          index: 'inicio' // Identificador del índice
        };
        setChatMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
      } else if (userMessageLower.includes('categorías') || userMessageLower.includes('categorias')) {
        const botMessage = {
          text: (
            <a href="#categorias">El área de categorías se encuentra después del inicio de la página.</a> // Agrega el enlace
          ),
          user: 'chat',
          index: 'categorias' // Identificador del índice
        };
        setChatMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
      } else {
        setChatMessages((prevMessages) => [...prevMessages, userMessage]);
      }
    }, 1000);

    setInputText('');
  };

  useEffect(() => {
    // Saludo inicial del bot al cargar el componente
    const initialBotMessage = {
      text: 'Hola, ¿en qué puedo ayudarte?',
      user: 'chat',
    };

    // Agregar el mensaje de saludo inicial
    setChatMessages([initialBotMessage]);
  }, []);

  return (
    <div className="fixed bottom-10 right-10 flex items-center">
      {showChat ? (
        <div className="bg-white w-64 rounded-lg shadow-lg p-4 border-2 border-pink-500" style={{ position: 'absolute', right: '72px', bottom: '72px' }}>
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
          <div className="mt-4">
            {chatMessages.map((message, index) => (
              <div key={index}>
                <div className={`mb-2 ${message.user === 'usuario' ? 'text-left' : 'text-right'}`}>
                  <div className={`bg-${message.user === 'usuario' ? 'pink-500' : 'blue-500'} text-white p-2 rounded-lg inline-block max-w-2/3`}>
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
              className="w-full p-2 rounded-lg border"
              placeholder="Escribe tu mensaje..."
              value={inputText}
              onChange={handleInputChange}
              style={{ resize: 'none' }} // Evitar la redimensión del textarea
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
        style={{ position: 'relative', left: '0', bottom: '0' }}
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
