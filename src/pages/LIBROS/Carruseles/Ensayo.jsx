import React, { useState, useRef, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import axios from "axios";

function Ensayo() {
  const [books, setBooks] = useState([]);
  const [ensayoBooks, setensayoBooks] = useState([]);
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
      setCurrentSlide((prev) => (prev + 1) % ensayoBooks.length);
    }
  };

  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.previous(1);
      setCurrentSlide(
        (prev) => (prev - 1 + ensayoBooks.length) % ensayoBooks.length
      );
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/Books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);

        const LibrosEnsayo = response.data.filter(
          (libro) => libro.genero === "ensayo"
        );
        setensayoBooks(LibrosEnsayo);
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
        <h4 className="text-3xl font-bold mb-4">Categoría de Ensayo</h4>
        {loading ? (
          <p>Cargando libros...</p>
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
            {ensayoBooks.map((libro, index) => (
              <div
                key={libro.ISBN}
                className="flex flex-col items-center bg-white p-4 mx-2 h-full hover:scale-90 transition-transform duration-300 rounded-md"
              >
                <Link to={`/book/${libro.ISBN}`} className="block">
                  <div className="image-container">
                    <img
                      src={libro.portada}
                      alt={libro.titulo}
                      className="w-48 h-64 object-cover mb-2 mx-auto"
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

export default Ensayo;
