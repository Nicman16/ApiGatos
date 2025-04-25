import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import './style.css'

function Gatos() {
  const { id } = useParams(); 
  const [datagato, setDatagato] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const esFavorito = favoritos.some(p => p.id === datagato.id);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); 
  }, [id]); 

  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.id !== datagato.id));
    } else {
      setFavoritos([...favoritos, { id: datagato.id, nombre: datagato.breeds[0].name }]);
    }
  };

  return (
    <div>
      <img 
        src={datagato.url} 
        alt={datagato.breeds[0].name} 
        width="200"
      />

      <p>{datagato.breeds[0].name}</p>
      <p>{datagato.id}</p>
      <p>Raza: {datagato.breeds[0].name}</p>

      <button onClick={toggleFavorito}>
          {esFavorito ? '❤️' : '🤍'}
        </button>
  
  </div>
  )
}

export default Gatos