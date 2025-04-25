import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';

function Listas() {
  const [dataGatos, setDataGatos] = useState([]);
  const navigate = useNavigate();
  const [busquedaGato, setBusquedaGato] = useState('');

  useEffect(() => {
    const obtenerDatosGatos = async () => {
      const limit = 10; // Puedes ajustar el número de gatos por página
      const apiKey = 'live_9gL7vTfzTWM9YC9VblOPOg1x1AXN0iEYB0Wfsk2EtmR0luh9UoqYN4WbVGwSY4yM'; // Reemplaza con tu API key si la tienes

      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}`, {
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
        // Manejar el error (mostrar un mensaje al usuario, etc.)
      }
    };

    obtenerDatosGatos();
  }, []); // Se ejecuta solo al montar el componente por ahora

  let resultadosGatos = dataGatos;

  if (busquedaGato.length >= 3) {
    resultadosGatos = dataGatos.filter(gato => {
      // Verificar si el gato tiene información de raza y si el nombre de alguna raza coincide con la búsqueda
      return gato.breeds.some(breed =>
        breed.name && breed.name.toLowerCase().includes(busquedaGato.toLowerCase())
      );
    });
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar Gato por Raza"
        value={busquedaGato}
        onChange={(e) => setBusquedaGato(e.target.value)}
        className="c-buscador"
      />
      <section className='c-lista'>
        {resultadosGatos.map((gato, index) => (
          <div
            className='c-lista-gato'
            onClick={() => navigate(`/gato/${gato.id}`)} // Asumiendo que quieres una ruta de detalle por ID
            key={index}
          >
            <img
              src={gato.url}
              alt={gato.breeds[0]?.name || 'Gato sin raza'}
              width='auto'
              height='100'
              loading='lazy'
            />
            <p>{gato.breeds?.[0]?.name || 'Sin raza'}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Listas;