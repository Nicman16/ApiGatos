import { useState, useEffect } from 'react';
import './style.css';

function Filtro({ onRazaChange }) {
  const [razas, setRazas] = useState([]);
  const apiKey = 'live_9gL7vTfzTWM9YC9VblOPOg1x1AXN0iEYB0Wfsk2EtmR0luh9UoqYN4WbVGwSY4yM';

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
        setRazas(['All', ...json.map(raza => raza.id)]);
      } catch (error) {
        console.error("Error fetching razas:", error);
        setRazas(['All']);
      }
    };

    obtenerRazas();
  }, []);

  return (
    <div className="c-filtro">
      {razas.map((unaRaza, index) => (
        <button className='' key={index} onClick={() => onRazaChange(unaRaza)}>
          {unaRaza}
        </button>
      ))}
    </div>
  );
}

export default Filtro;