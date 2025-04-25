import { useState, useEffect } from 'react';
import './style.css';

function Favoritos() {
  const [gatosFavoritos, setGatosFavoritos] = useState([]);

  useEffect(() => {
    const cargarFavoritos = () => {
      const favoritosGuardados = localStorage.getItem('gatosFavoritos');
      if (favoritosGuardados) {
        setGatosFavoritos(JSON.parse(favoritosGuardados));
      }
    };

    cargarFavoritos(); // Cargar al montar

    const handleFavoritosActualizados = () => {
      cargarFavoritos(); // Recargar al recibir el evento
    };

    window.addEventListener('favoritosActualizados', handleFavoritosActualizados);

    return () => {
      window.removeEventListener('favoritosActualizados', handleFavoritosActualizados);
    };
  }, []);

  const eliminarFavorito = (id) => {
    const nuevosFavoritos = gatosFavoritos.filter(gato => gato.id !== id);
    setGatosFavoritos(nuevosFavoritos);
    localStorage.setItem('gatosFavoritos', JSON.stringify(nuevosFavoritos));
    window.dispatchEvent(new Event('favoritosActualizados'));
  };

  return (
    <div className="favoritos-container">
      <h1>Gatos Favoritos</h1>
      {gatosFavoritos.length === 0 ? (
        <p>Aún no has añadido ningún gato a tus favoritos.</p>
      ) : (
        <ul className="favoritos-list">
          {gatosFavoritos.map(gato => (
            <li key={gato.id} className="favorito-item">
              <img src={gato.url} alt={gato.nombre || 'Gato Favorito'} width="100" height="100" style={{ borderRadius: '8px', marginRight: '10px' }} />
              <p>{gato.nombre || 'Sin nombre'}</p>
              <button onClick={() => eliminarFavorito(gato.id)} className="eliminar-favorito">
                💔 Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;