import React, { useState, useEffect } from 'react';
import './listas-gatos.css'; // Crea un archivo CSS llamado filtro.css

function Filtro() {
  const [razas, setRazas] = useState([]);
  const [razaSeleccionada, setRazaSeleccionada] = useState('All');
  const [dataGatos, setDataGatos] = useState([]);
  const apiKey = 'live_9gL7vTfzTWM9YC9VblOPOg1x1AXN0iEYB0Wfsk2EtmR0luh9UoqYN4WbVGwSY4yM';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerRazas = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds', {
          headers: {
            'x-api-key': apiKey,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const razasConAll = [{ id: 'All', name: 'Todas las Razas' }, ...json];
        setRazas(razasConAll);
      } catch (error) {
        console.error("Error fetching razas:", error);
        setRazas([{ id: 'All', name: 'Todas las Razas' }]);
      }
    };

    obtenerRazas();
  }, []);

  useEffect(() => {
    const obtenerImagenesPorRaza = async () => {
      setLoading(true);
      setError(null);
      const limit = 10; // Ajusta la cantidad de imágenes a mostrar
      let apiUrl = `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=true`;

      if (razaSeleccionada !== 'All') {
        apiUrl = `https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${razaSeleccionada}&has_breeds=true`;
      }

      try {
        const response = await fetch(apiUrl, {
          headers: {
            'x-api-key': apiKey,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setDataGatos(json);
      } catch (error) {
        console.error("Error fetching imágenes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerImagenesPorRaza();
  }, [razaSeleccionada]);

  const handleRazaSeleccionada = (razaId) => {
    setRazaSeleccionada(razaId);
  };

  if (loading) {
    return <div className="filtro-cargando">Cargando gatos...</div>;
  }

  if (error) {
    return <div className="filtro-error">Error al cargar los datos.</div>;
  }

  return (
    <div className="filtro-container">
      <h2 className="filtro-titulo">Explora las Razas de Gatos</h2>
      <div className="filtro-razas">
        {razas.map((raza, index) => (
          <button
            key={index}
            className={`filtro-raza-boton ${raza.id === 'All' ? 'filtro-raza-boton-all' : ''}`}
            onClick={() => handleRazaSeleccionada(raza.id)}
          >
            {raza.name}
          </button>
        ))}
      </div>
      <section className="filtro-imagenes-grid">
        {dataGatos.map((gato) => (
          <img
            key={gato.id}
            src={gato.url}
            alt={gato.breeds[0]?.name || 'Gato'}
            className="filtro-imagen-gato"
            loading="lazy"
          />
        ))}
      </section>
    </div>
  );
}

export default Filtro;