import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import "./style.css";

function Menu() {
  const [rol, setRol] = useState(null);

  useEffect(() => {
    async function fetchRol() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("usuario")
          .select("rol")
          .eq("id", user.id)
          .single();
        if (data) setRol(data.rol);
      }
    }
    fetchRol();
  }, []);

  return (
    <nav className="c-menu">
      <Link to="/">Lista de Gatos</Link>
      <Link to="/gatosFiltro">Gatos Por Filtro</Link>
      <Link to="/gatos">Detalle del Gato</Link>
      <Link to="/usuarioGatos">Usuarios de Gatos</Link>
      <Link to="/gatosFavoritos">Gatos Favoritos</Link>
      <Link to="/gatosGifs">Gatos GIF'S</Link>
      <Link to="/multimedia">Gatos Multimedia</Link>
      {rol === "admin" && (
        <Link to="/admin" style={{ background: "#6c5ce7" }}>Panel Admin</Link>
      )}
    </nav>
  );
}

export default Menu;