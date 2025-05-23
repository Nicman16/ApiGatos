import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import './usuario-gatos.css';

export default function UsuarioGatos() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    rol: ""
  });

  const [nuevaUrl, setNuevaUrl] = useState("");
  const [imagenes, setImagenes] = useState([]);

  // Obtener datos del usuario autenticado y su perfil
  useEffect(() => {
    async function fetchUsuario() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("usuario")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) {
          setUsuario(data);
          setForm({
            nombre: data.nombre,
            correo: data.correo,
            fecha_nacimiento: data.fecha_nacimiento,
            telefono: data.telefono,
            rol: data.rol
          });
          fetchImagenes(user.id);
        }
      }
    }
    fetchUsuario();
  }, []);

  // Obtener imágenes del usuario
  const fetchImagenes = async (usuario_id) => {
    const { data, error } = await supabase
      .from("multimedia")
      .select('id, url, usuario:usuario_id (id, nombre, correo)')
      .eq("usuario_id", usuario_id);
    if (data) setImagenes(data);
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Actualizar datos del usuario
  const handleUpdate = async () => {
    const { error } = await supabase
      .from("usuario")
      .update(form)
      .eq("id", usuario.id);
    if (error) alert("Error al actualizar");
    else alert("Datos actualizados");
  };

  // Agregar nueva imagen
  const handleAgregarUrl = async () => {
    if (!nuevaUrl.trim()) return;
    const { error } = await supabase
      .from("multimedia")
      .insert([{ url: nuevaUrl, usuario_id: usuario.id }]);
    if (error) {
      alert("Error al agregar la imagen");
    } else {
      setNuevaUrl("");
      fetchImagenes(usuario.id);
    }
  };

  // Eliminar imagen
  const handleEliminarImagen = async (id) => {
    const { error } = await supabase
      .from("multimedia")
      .delete()
      .eq("id", id);
    if (!error) {
      setImagenes(imagenes.filter((img) => img.id !== id));
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div className="usuario-gatos-container">
      <h2>Perfil de Usuario</h2>
      <label>Nombre:
        <input name="nombre" value={form.nombre} onChange={handleChange} />
      </label><br />
      <label>Correo:
        <input name="correo" value={form.correo} onChange={handleChange} />
      </label><br />
      <label>Fecha de nacimiento:
        <input type="date" name="fecha_nacimiento"
          value={form.fecha_nacimiento} onChange={handleChange} />
      </label><br />
      <label>Teléfono:
        <input name="telefono" value={form.telefono} onChange={handleChange} />
      </label><br />
      <label>Rol:
        <input name="rol" value={form.rol} onChange={handleChange} />
      </label><br />
      <button onClick={handleUpdate}>Guardar cambios</button>

      <hr />

      <h3>Agregar imagen</h3>
      <input
        type="text"
        placeholder="URL de la imagen"
        value={nuevaUrl}
        onChange={(e) => setNuevaUrl(e.target.value)}
      />
      <button onClick={handleAgregarUrl}>Agregar</button>

      <h3>Imágenes guardadas</h3>
      <ul>
        {imagenes.map((img) => (
          <li key={img.id}>
            <img src={img.url} alt="Imagen" width="150" />
            <br />
            <button onClick={() => handleEliminarImagen(img.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <hr />
      <h2>Quiero cerrar sesión</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <br /><br /><br /><br /><br />
    </div>
  );
}

