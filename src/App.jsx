import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/INICIO/IndexPage';
import LoginPage from './pages/INICIO/LoginPage';
import Register from './pages/INICIO/Registre';
import Contenido from './pages/LIBROS/Contenido';
import BookDetails from './pages/LIBROS/BookDetails';
import Meritos from './pages/LIBROS/Meritos';
import User from './pages/USUARIO/User';
import EditUser from './pages/USUARIO/EditUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Contenido" element={<Contenido />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/Meritos" element={<Meritos />} />
      <Route path="/User" element={<User />} />
      <Route path="/EditUser" element={<EditUser />} />
    </Routes>
  );
}

export default App;
