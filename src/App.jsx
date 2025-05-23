import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AppProvider } from './contexto/contexto';
import { supabase } from "./supabase";

import Filtro from './componentes/gatosFiltro'
import Favoritos from './componentes/gatosFavoritos'
import Listas from './componentes/gatosLista'
import Gatos from './componentes/gatos'
import Gifs from './componentes/gatosGifs'
import UsuariosConGatos from './componentes/usuarioGatos'
import Menu from './componentes/menuGatos' 
import './App.css'

function App() {

  return (
    <Router>

      <Menu />

      <Routes>
        <Route path='/' element={<Listas />} />
        <Route path='/gatosFiltro' element={<Filtro />} />
        <Route path='/gatos' element={<Gatos />} />
        <Route path='/gatosFavoritos' element={<Favoritos />} />
        <Route path='/usuarioGatos' element={<UsuariosConGatos />} />
        <Route path='/gatosGifs' element={<Gifs />} />
      </Routes>
    </Router>
  )
}

export default App