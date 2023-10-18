import Header from './Header';
import InfoLibro from './InfoLibro';
import Inicio from './Inicio';
import Books from './Books';
import Carruseles from './Carruseles/Carruseles';
import Chat from './Help';
import Footer from './Footer';

export default function Contenido() {

  return (
    <>
    {/*-----------------Header-----------------*/}
    <Header/>
    {/*-----------------Bienvenida a el usuario-----------------*/}
    <Inicio/>

    {/*-----------------Carruseles-----------------*/}
    <Carruseles/>
    {/*-----------------Libros mas reservados-----------------*/}
    <Books/>
    {/*-----------------Info sobre los libros-----------------*/}
    <InfoLibro/>
    {/*-----------------Chat-----------------*/}
    <Chat/>
    {/*-----------------Footer-----------------*/}
    <Footer/>
    </>

);
} 