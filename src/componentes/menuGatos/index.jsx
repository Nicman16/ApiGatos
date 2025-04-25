import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

function Menu() {
  return (
    <nav className="c-menu">
      <Link to="/">Lista de Gatos</Link>
      <Link to="/gatosAleatorios">Gatos Aleatorios</Link>
      <Link to="/gatos">Detalle del Gato</Link>
      <Link to="/usuarioGatos">Usuarios de Gatos</Link>
      <Link to="/gatosFavoritos">Gatos Favoritos</Link>
    </nav>
  );
}

export default Menu;