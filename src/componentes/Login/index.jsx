import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase'
import './login.css';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg("")
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) setErrorMsg("Usuario o contraseña no válidos")
    else navigate("/")
  }

  const irARegistro = () => {
    navigate("/registro")
  }

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      {errorMsg && <div className="login-error">{errorMsg}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      <button className="login-form" style={{marginTop: 10}} onClick={irARegistro}>
        ¿No tienes cuenta? Regístrate
      </button>
    </div>
  )
}

export default Login