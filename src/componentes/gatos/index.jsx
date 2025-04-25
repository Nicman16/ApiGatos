import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './gatos.css'; // Importa tu archivo de estilos específico para este componente

function Gatos() {
  const { id } = useParams();
  const [datagato, setDatagato] = useState(null);
  const [favoritos, setFavoritos] = useState(() => {
    const favoritosGuardados = localStorage.getItem('gatosFavoritos');
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  });
  const [error, setError] = useState(null);
  const apiKey = 'live_9gL7vTfzTWM9YC9VblOPOg1x1AXN0iEYB0Wfsk2EtmR0luh9UoqYN4WbVGwSY4yM';

  const fetchGato = async () => {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg,png&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", {
        headers: {
          'x-api-key': apiKey,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatagato(data[0]);
    } catch (e) {
      setError(e.message);
      console.error('Error fetching cat:', e);
    }
  };

  useEffect(() => {
    fetchGato();
  }, []);

  useEffect(() => {
    localStorage.setItem('gatosFavoritos', JSON.stringify(favoritos));
    window.dispatchEvent(new Event('favoritosActualizados'));
  }, [favoritos]);

  const generarNuevoGato = () => {
    fetchGato();
  };

  const esFavoritoActual = datagato && favoritos.some(fav => fav.id === datagato.id);

  const toggleFavorito = () => {
    if (datagato) {
      const gatoFavorito = {
        id: datagato.id,
        nombre: datagato.breeds?.[0]?.name || 'Sin raza',
        url: datagato.url,
      };

      const yaEsFavorito = favoritos.some(fav => fav.id === gatoFavorito.id);

      if (yaEsFavorito) {
        setFavoritos(favoritos.filter(fav => fav.id !== gatoFavorito.id));
      } else {
        setFavoritos([...favoritos, gatoFavorito]);
      }
    }
  };

  if (error) {
    return <div className="gato-error">Error: {error}</div>;
  }

  if (!datagato) {
    return <div className="gato-cargando">Cargando gato...</div>;
  }

  return (
    <div className="gato-detalle-container">
      <img
        src={datagato.url}
        alt={datagato.breeds?.[0]?.name || 'Gato'}
        className="gato-imagen"
      />

      {datagato.breeds && datagato.breeds.length > 0 && (
        <div className="gato-info">
          <p className="gato-raza">Raza: {datagato.breeds[0].name}</p>
          <p className="gato-raza-id">ID de la raza: {datagato.breeds[0].id}</p>
          {datagato.breeds[0].description && <p className="gato-descripcion">Descripción: {datagato.breeds[0].description}</p>}
          {datagato.breeds[0].origin && <p className="gato-origen">Origen: {datagato.breeds[0].origin}</p>}
        </div>
      )}
      {!datagato.breeds || datagato.breeds.length === 0 && (
        <p className="gato-raza">Raza: Desconocida</p>
      )}
      <p className="gato-id">ID del gato: {datagato.id}</p>

      <div className="gato-acciones">
        <button onClick={toggleFavorito} className="gato-boton-favorito">
          {esFavoritoActual ? '❤️ Quitar de Favoritos' : '🤍 Añadir a Favoritos'}
        </button>
        <button onClick={generarNuevoGato} className="gato-boton-generar">
          ✨ Generar Nuevo Gato
        </button>
      </div>
    </div>
  );
}

export default Gatos;