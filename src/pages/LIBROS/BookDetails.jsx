import React from 'react';
import { useParams } from 'react-router-dom';
import { LibrosData } from '../../data';



const BookDetails = () => {
  const { id } = useParams();
  const book = LibrosData.find((book) => book.id === parseInt(id));
  const [rating, setRating] = React.useState(null);
  const [hover, setHover] = React.useState(null);

  if (!book) {
    return <div className="text-center mt-4 text-red-600">Libro no encontrado</div>;
  }

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
  <div className="bg-pink-500 text-white absolute bottom-10 right-7 cursor-pointer flex items-center rounded-md hover:bg-white hover:text-pink-500 transition-all" onClick={goBack}>
    <span className="text-3xl m-1">Back</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>

  </div>
      <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 max-w-md ">
      <img
        src={book.image}
        alt={book.Titulo}
        className="w-full h-auto"
      />
    </div>
        <div className="w-1/2 bg-white p-8">
        <div className="border-b-4 border-pink-500 mb-2 mt-10">
          <h2 className="text-4xl font-semibold text-center mb-4">
            {book.Titulo}
          </h2>
        </div>
          <h4 className="text-gray-700 text-lg"><span className='text-black text-xl font-semibold'>Author: </span>{book.Author}</h4>
          <h5 className="text-gray-700 text-lg"><span className='text-black text-xl font-semibold'>Año: </span>{book.year}</h5>
          <div className="flex items-center mt-4">
            <p className="text-gray-700 mr-2 text-lg"><span className='text-black text-xl font-semibold'>Disponibles: </span></p>
            <div className="bg-green-200 p-2 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg text-green-700">{book.Disponibles}</span>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <p className="text-gray-700 mr-2 text-lg"><span className='text-black text-xl font-semibold'>Prestados: </span></p>
            <div className="bg-red-200 p-2 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg text-red-700">{book.Prestados}</span>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <p className="text-gray-700 mr-2 text-lg"><span className='text-black text-xl font-semibold'>Descripcion: </span> {book.description}</p>
          </div>
          
          <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Valoración</h3>
          <div className="flex items-center">
  {[...Array(5)].map((star, index) => {
    const currentRating = index + 1;
    return (
      <label key={index} className="cursor-pointer">
        <input
          type="radio"
          name="rating"
          value={currentRating}
          onClick={() => setRating(currentRating)}
          className="sr-only"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-10 h-10 text-yellow-400 ${
            currentRating <= (hover || rating) ? 'fill-current' : ''
          } transition-colors duration-200`}
          onMouseEnter={() => setHover(currentRating)}
          onMouseLeave={() => setHover(null)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </label>
    );
  })}
</div>
<textarea
  className="w-full mt-4 p-2 border rounded resize-none"
  placeholder="Agrega un comentario..."
></textarea>

            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enviar Comentario
            </button>
           </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
