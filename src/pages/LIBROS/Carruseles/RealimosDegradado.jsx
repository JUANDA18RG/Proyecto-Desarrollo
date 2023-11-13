import React, { useState, useRef, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import axios from "axios";

function RealismoDegradado() {
  const [books, setBooks] = useState([]);
  const [RealismoDegradadoBooks, setRealismoDegradadoBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
  };

  const goToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.next(1);
      setCurrentSlide((prev) => (prev + 1) % RealismoDegradadoBooks.length);
    }
  };

  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.previous(1);
      setCurrentSlide(
        (prev) =>
          (prev - 1 + RealismoDegradadoBooks.length) %
          RealismoDegradadoBooks.length
      );
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/Books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);

        const RealismoDegradadoBooks = response.data.filter(
          (libro) => libro.genero === "realismo degradado"
        );
        setRealismoDegradadoBooks(RealismoDegradadoBooks);
      })
      .catch((error) => {
        console.error("Error al obtener los libros", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex justify-center items-center mt-10">
      <button
        className="px-5 py-5 rounded bg-blue-500 hover:bg-blue-800 m-4 text-white"
        onClick={goToPreviousSlide}
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
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <div className="container mb-10">
        <h4 className="text-3xl font-bold mb-4">
          Categoría de Realismo Degradado
        </h4>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-middle text-pink-600">
              <span className="hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Carousel
            responsive={responsive}
            infinite={true}
            arrows={false}
            slidesToSlide={3}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-100-px"
            ref={carouselRef}
            additionalTransfrom={-currentSlide * 40}
          >
            {RealismoDegradadoBooks.map((libro, index) => (
              <div
                key={libro.ISBN}
                className="flex flex-col items-center bg-white max-w-xs p-4 mx-auto h-full hover:scale-90 transition-transform duration-300 rounded-md border-4 border-pink-500"
              >
                <Link to={`/book/${libro.ISBN}`} className="block">
                  <div className="image-container">
                    <img
                      src={`http://localhost:4000${libro.portada}`}
                      alt={libro.titulo}
                      className="w-60 h-80 object-contain mb-2 mx-auto"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-center mb-2">
                    {libro.titulo.length > 30
                      ? `${libro.titulo.slice(0, 30)}...`
                      : libro.titulo}
                  </h2>
                  <p className="text-gray-700 text-center">
                    Autor: {libro.autor}
                  </p>
                  <p className="text-gray-700 text-center">
                    Año: {libro.anioPublicacion}
                  </p>
                  <div className="text-gray-700 text-center flex justify-center items-center">
                    <div className="flex items-center bg-green-400 m-2 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 m-1 text-green-800"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <p className="m-1 text-black">
                        {libro.copiasDisponibles}
                      </p>
                    </div>
                    <span className="text-gray-400">|</span>
                    <div className="flex items-center m-2 bg-red-400 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 m-1 text-red-800"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="m-1 text-black">{libro.copiasReservadas}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-yellow-500">{libro.valoracion}</p>
                    <span className="p-2  rounded-full flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="transparent"
                        className="w-8 h-8 text-yellow-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          fill="yellow"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <button
        className="px-5 py-5 rounded bg-blue-500 hover:bg-blue-800 m-4 text-white"
        onClick={goToNextSlide}
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
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
}

export default RealismoDegradado;
