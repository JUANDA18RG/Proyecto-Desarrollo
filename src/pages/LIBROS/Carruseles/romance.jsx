import React, { useState, useRef } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { LibrosData } from '../../../data';
import { Link } from 'react-router-dom';

function Romance() {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  // Filtrar libros por categoría "drama"
  const librosDeRomance = LibrosData.filter((libro) => libro.categoria === 'romance');

  const goToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.next(1);
      setCurrentSlide((prev) => (prev + 1) % librosDeRomance.length); // Hace que sea infinito
    }
  };

  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.previous(1);
      setCurrentSlide((prev) => (prev - 1 + librosDeRomance.length) % librosDeRomance.length); // Hace que sea infinito
    }
  };

  return (
    <div className='flex justify-center items-center mt-10'>
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
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
      </button>
    <div className="container mb-10">
      <h4 className="text-3xl font-bold mb-4">Categoría de Suspenso</h4>
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
          {librosDeRomance.map((libro, index) => (
                       <div
                       key={libro.id}
                       className="flex flex-col items-center bg-white p-4 mx-2 h-full hover:scale-90 transition-transform duration-300 rounded-md"
                     >
                       <Link to={`/book/${libro.id}`} className="block">
                         <div className="image-container">
                           <img src={libro.image} alt={libro.Titulo} className="w-48 h-64 object-cover mb-2 mx-auto" />
                         </div>
                         <h2 className="text-xl font-semibold text-center mb-2">
                           {libro.Titulo.length > 30 ? `${libro.Titulo.slice(0, 30)}...` : libro.Titulo}
                         </h2>
                         <p className="text-gray-700 text-center">Author: {libro.Author}</p>
                         <p className="text-gray-700 text-center">Año: {libro.year}</p>
                         <div className='flex justify-center items-center'>
                           <div className="flex items-center m-2 bg-green-200 rounded">
                             <span className="p-2">
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                               </svg>
                             </span>
                             <p className="text-green-700 text-center mr-1">{libro.Disponibles}</p>
                           </div>
                           <div className="flex items-center m-2 bg-red-200 rounded">
                             <span className="p-2">
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                               </svg>
                             </span>
                             <p className="text-red-700 text-center mr-1">{libro.Prestados}</p>
                           </div>
                         </div>
                         <div className="flex items-center justify-center">
                           <p className="text-yellow-700 text-center">
                             Valoración: {libro.valoracion}
                           </p>
                           <span className="p-1 bg-white">
       <svg xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           strokeWidth={1.5}
           stroke="currentColor"
           className="w-6 h-6 text-yellow-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
</span>
                         </div>
                       </Link>
                     </div>
          ))}
        </Carousel>
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
      </button>
  </div>
  );
}

export default Romance;
