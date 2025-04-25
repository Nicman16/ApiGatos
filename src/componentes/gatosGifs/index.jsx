import React, { useState, useEffect } from 'react';
import './gatos-gifs.css'; 

function Gifs() {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = 'bzsze443RIwsDbwQCkrL33L7LqfyXpXY';  
  const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=gatos&limit=10&rating=g`; // Busca 10 GIFs de gatos con clasificación 'g'

  useEffect(() => {
    const obtenerGifsDeGatos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGifs(data.data.map((gif) => gif.images.fixed_width.url));
      } catch (error) {
        console.error("Error fetching GIFs de gatos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerGifsDeGatos();
  }, [apiUrl]); 

  if (loading) {
    return <div className="gatos-gifs-cargando">Cargando GIFs de gatos...</div>;
  }

  if (error) {
    return <div className="gatos-gifs-error">Error al cargar los GIFs: {error}</div>;
  }

  return (
    <div className="gatos-gifs-container">
      <h2>¡Gatos en Movimiento!</h2>
      <div className="gatos-gifs-grid">
        {gifs.map((gifUrl, index) => (
          <img
            key={index}
            src={gifUrl}
            alt="GIF de gato"
            className="gatos-gif-item"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default Gifs;