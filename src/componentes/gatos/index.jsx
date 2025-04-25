import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function Gatos() {
  const { id } = useParams();
  const [datagato, setDatagato] = useState(null); // Inicializar como null para verificar antes de usar
  const [favoritos, setFavoritos] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores
  const esFavorito = favoritos.some(p => p.id === (datagato && datagato.id));

  useEffect(() => {
    const fetchGato = async () => {
      try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDatagato(data[0]); // Suponiendo que la API devuelve un array con un objeto
      } catch (e) {
        setError(e.message);
        console.error('Error fetching cat:', e);
      }
    };

    fetchGato();
  }, [id]); // Dependencia en id por si en el futuro la búsqueda depende de este parámetro

  const toggleFavorito = () => {
    if (datagato) {
      if (esFavorito) {
        setFavoritos(favoritos.filter(p => p.id !== datagato.id));
      } else {
        setFavoritos([...favoritos, { id: datagato.id, nombre: datagato.breeds?.[0]?.name }]);
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!datagato) {
    return <div>Cargando...</div>; // Mostrar un estado de carga mientras se espera la respuesta de la API
  }

  return (
    <div>
      <img
        src={datagato.url}
        alt={datagato.breeds?.[0]?.name || 'Gato'}
        width="200"
      />

      <p>{datagato.breeds?.[0]?.name}</p>
      <p>{datagato.id}</p>
      <p>Raza: {datagato.breeds?.[0]?.name || 'Desconocida'}</p>

      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default Gatos;