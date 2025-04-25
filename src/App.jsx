import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Aleatorios from './componentes/gatosAleatorios'
import Favoritos from './componentes/gatosFavoritos'
import Listas from './componentes/gatosLista'
import Gatos from './componentes/gatos'
import Usuario from './componentes/usuarioGatos'
import Menu from './componentes/menuGatos' 
import './App.css'

function App() {

  return (
    <Router>

      <Menu />

      <Routes>
        <Route path='/' element={<Listas />} />
        <Route path='/gatosAleatorios' element={<Aleatorios />} />
        <Route path='/gatos' element={<Gatos />} />
        <Route path='/gatosFavoritos' element={<Favoritos />} />
        <Route path='/usuarioGatos' element={<Usuario />} />
      </Routes>
    </Router>
  )
}

export default App