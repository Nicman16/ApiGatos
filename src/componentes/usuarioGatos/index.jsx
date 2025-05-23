import React, { useState, useEffect } from 'react';
import Filtro from '../gatosFiltro'; 
import './usuario-gatos.css';

const usuariosConGatos = [
  { id: 1, nombre: 'Miau Lover 1', fotoPerfil: 'https://cataas.com/cat/says/Hello%201' },
  { id: 2, nombre: 'Purrfect User 2', fotoPerfil: 'https://cataas.com/cat/says/Meow%202' },
  { id: 3, nombre: 'Gato Fanático 3', fotoPerfil: 'https://cataas.com/cat/says/Purr%203' },
  { id: 4, nombre: 'Kitty Kat 4', fotoPerfil: 'https://cataas.com/cat/says/Hisss%204' },
  { id: 5, nombre: 'Feline Friend 5', fotoPerfil: 'https://cataas.com/cat/says/Scratch%205' },
];

function UsuarioGatos() {
  const [usuarios, setUsuarios] = useState(usuariosConGatos);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const seleccionarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  return (
    <div className="usuario-gatos-container">
      <h1 className="usuario-gatos-titulo">Explora los Gatos y sus Amigos</h1>
      <p className="usuario-gatos-descripcion">
        Selecciona una raza para ver las imágenes de gatos correspondientes.
      </p>

      <section className="usuario-gatos-lista-usuarios">
        <h2 className="lista-usuarios-titulo">Amantes de los Gatos</h2>
        <ul className="lista-usuarios-lista">
          {usuarios.map((usuario) => (
            <li
              key={usuario.id}
              className={`usuario-item ${usuarioSeleccionado?.id === usuario.id ? 'seleccionado' : ''}`}
              onClick={() => seleccionarUsuario(usuario)}
            >
              <img
                src={usuario.fotoPerfil}
                alt={`Foto de perfil de ${usuario.nombre}`}
                className="usuario-foto-perfil"
              />
              <span className="usuario-nombre">{usuario.nombre}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="usuario-gatos-filtro-contenedor">
        <Filtro />
      </div>

      {usuarioSeleccionado && (
        <div className="usuario-seleccionado-info">
          <h2>Perfil de {usuarioSeleccionado.nombre}</h2>
          <img
            src={usuarioSeleccionado.fotoPerfil}
            alt={`Foto de perfil grande de ${usuarioSeleccionado.nombre}`}
            className="usuario-foto-perfil-grande"
          />
          <p>¡Este usuario es un gran amante de los gatos!</p>
          {/* Aquí podrías añadir más información sobre el usuario si tuvieras */}
        </div>
      )}

      {/* Otras posibles funcionalidades */}
      <section className="usuario-gatos-interacciones">
        <h2>Interactúa con los Gatos</h2>
        <button onClick={() => alert('¡Miau!')}>Saludar a un Gato</button>
        {/* Aquí podrías añadir más botones o elementos interactivos */}
      </section>
    </div>
  );
}

export default usuariosConGatos;