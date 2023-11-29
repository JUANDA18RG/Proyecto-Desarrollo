import React from 'react';
import Header from './Header';
import InfoLibro from './InfoLibro';
import Inicio from './Inicio';
import Books from './Books';
import Carruseles from './Carruseles/Carruseles';
import Chat from './Help';
import Footer from './Footer';
import Busqueda from './Busqueda';

export default function Contenido() {
  const handleBuscarLibro = (busqueda, filtro, disponibilidadFiltro) => {
    console.log('Búsqueda:', busqueda);
    console.log('Filtro:', filtro);
    console.log('Disponibilidad Filtro:', disponibilidadFiltro);
  };

  return (
    <>
      {/*-----------------Header-----------------*/}
      <Header />
      {/*-----------------Bienvenida a el usuario-----------------*/}
      <Inicio />
      {/*-----------------Carruseles-----------------*/}
      <Carruseles />
      {/*-----------------Busqueda-----------------*/}
      <Busqueda onBuscar={handleBuscarLibro} />
      {/*-----------------Libros mas reservados-----------------*/}
      <Books />
      {/*-----------------Info sobre los libros-----------------*/}
      <InfoLibro />
      {/*-----------------Chat-----------------*/}
      <Chat />
      {/*-----------------Footer-----------------*/}
      <Footer />
    </>
  );
}