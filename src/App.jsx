import React from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/INICIO/IndexPage";
import LoginPage from "./pages/INICIO/LoginPage";
import Register from "./pages/INICIO/Registre";
import Contenido from "./pages/LIBROS/Contenido";
import BookDetails from "./pages/LIBROS/BookDetails";
import Meritos from "./pages/LIBROS/Meritos";
import User from "./pages/USUARIO/User";
import EditUser from "./pages/USUARIO/EditUser";
import ForgotPassword from "./pages/USUARIO/ForgotPassword";
import ReservationPage from "./pages/RESERVAS/Reservationpage";
import SesionExpirada from "./pages/USUARIO/SesionExpirada";

import Reseñas from "./pages/LIBROS/Reseñas";
import DetallesReserva from "./pages/RESERVAS/detallesReserva";
import EditReservation from "./pages/RESERVAS/editReservation";
import EditarComentarios from "./pages/USUARIO/EditarComentarios";
import ContenidoAdmin from "./pages/ADMIN/ContenidoAdmin";
import FormularioAdmin from "./pages/ADMIN/FormularioAdmin";
import EliminarUsuario from "./pages/ADMIN/EliminarUsuario";
import CompletarFormulario from "./pages/ADMIN/CompletarFormulario";

function App() {
  return (
    <div>
      <SesionExpirada />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Contenido" element={<Contenido />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/Meritos" element={<Meritos />} />
        <Route path="/User" element={<User />} />
        <Route path="/EditUser" element={<EditUser />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reserva/:id" element={<ReservationPage />} />
        <Route path="/Reseñas" element={<Reseñas />} />
        <Route path="/detalleReserva/:id" element={<DetallesReserva />} />
        <Route path="/editReserva/:id" element={<EditReservation />} />
        <Route path="/editarComentario/:isbn" element={<EditarComentarios />} />
        <Route
          path="/ContenidoAdmin/:isSuperAdmin"
          element={<ContenidoAdmin />}
        />
        <Route path="/FormularioAdmin" element={<FormularioAdmin />} />
        <Route path="/EliminarUsuario" element={<EliminarUsuario />} />
        <Route path="login/CompletarFormulario" element={<CompletarFormulario />} />
      </Routes>
    </div>
  );
}

export default App;
