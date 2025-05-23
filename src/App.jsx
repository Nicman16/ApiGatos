import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
// import { AppProvider } from './contexto/contexto';
import { supabase } from "./supabase";

import Filtro from './componentes/gatosFiltro'
import Favoritos from './componentes/gatosFavoritos'
import Listas from './componentes/gatosLista'
import Gatos from './componentes/gatos'
import Gifs from './componentes/gatosGifs'
import UsuariosConGatos from './componentes/usuarioGatos'
import Menu from './componentes/menuGatos'
import Login from './componentes/Login';
import Registro from './componentes/Registro'
import Multimedia from './componentes/Multimedia/MultimediaFeed';
import Administrador from './componentes/Administrador';
import './App.css'


function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }
    verificarSesion();

    // Escucha cambios en la sesión
    supabase.auth.onAuthStateChange((_event, session) => {

      setUsuario(session?.user || null);
    });
  }, []);

  if (cargando) return <p>Cargando...</p>;
  return (

      <Router>

        {usuario && <Menu />}

        <Routes>
          <Route path='/' element={usuario ? <Listas /> : <Navigate to="/Login" />} />
          <Route path='/gatosFiltro' element={usuario ? <Filtro /> : <Navigate to="/login" />} />
          <Route path='/gatos' element={usuario ? <Gatos /> : <Navigate to="/login" />} />
          <Route path='/gatosFavoritos' element={usuario ? <Favoritos /> : <Navigate to="/login" />} />
          <Route path='/usuarioGatos' element={usuario ? <UsuariosConGatos /> : <Navigate to="/login" />} />
          <Route path='/gatosGifs' element={usuario ? <Gifs /> : <Navigate to="/login" />} />
          <Route path='/multimedia' element={usuario ? <Multimedia /> : <Navigate to="/login" />} />
          <Route path='/admin' element={usuario ? <Administrador /> : <Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Router>

  )
}

export default App