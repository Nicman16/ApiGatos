import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './listas.css';

function Listas() {
  const [dataGatos, setDataGatos] = useState([]);
  const navigate = useNavigate();
  const [busquedaGato, setBusquedaGato] = useState('');
  const apiKey = 'live_9gL7vTfzTWM9YC9VblOPOg1x1AXN0iEYB0Wfsk2EtmR0luh9UoqYN4WbVGwSY4yM';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatosGatos = async () => {
      setLoading(true);
      setError(null);
      const limit = 100; 
      const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=true`;

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
        console.error("Error fetching gatos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosGatos();
  }, []);

  let resultadosGatos = dataGatos;

  if (busquedaGato.length >= 3) {
    resultadosGatos = dataGatos.filter(gato =>
      gato.breeds.some(breed =>
        breed.name && breed.name.toLowerCase().includes(busquedaGato.toLowerCase())
      )
    );
  }

  if (loading) {
    return <div className="lista-cargando">Cargando gatos...</div>;
  }

  if (error) {
    return <div className="lista-error">Error al cargar los gatos: {error}</div>;
  }

  return (
    <div className="lista-container">
      <input
        type="text"
        placeholder="Buscar Gato por Raza"
        value={busquedaGato}
        onChange={(e) => setBusquedaGato(e.target.value)}
        className="lista-buscador"
      />
      <section className="lista-grid">
        {resultadosGatos.map((gato, index) => (
          <div
            className="lista-gato-item"
            onClick={() => navigate(`/gato/${gato.id}`)}
            key={index}
          >
            <img
              src={gato.url}
              alt={gato.breeds[0]?.name || 'Gato sin raza'}
              className="lista-gato-imagen"
              loading="lazy"
            />
            <p className="lista-gato-nombre">{gato.breeds?.[0]?.name || 'Sin raza'}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Listas;