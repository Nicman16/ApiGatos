import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./Multimedia.css";

export default function MultimediaFeed() {
  const [imagenes, setImagenes] = useState([]);
  const [gatos, setGatos] = useState([]);
  const [gatoSeleccionado, setGatoSeleccionado] = useState("");
  const [nuevaUrl, setNuevaUrl] = useState("");
  const [error, setError] = useState(null);

  // Cargar gatos para el selector
  useEffect(() => {
    const fetchGatos = async () => {
      const { data, error } = await supabase.from("gato").select("id, nombre");
      if (data) setGatos(data);
    };
    fetchGatos();
  }, []);

  // Cargar imágenes de gatos
  useEffect(() => {
    const fetchMultimedia = async () => {
      const { data, error } = await supabase
        .from("multimedia")
        .select("id, url, gato:gato_id (id, nombre)")
        .order("id", { ascending: false });
      if (error) setError(error.message);
      else setImagenes(data);
    };
    fetchMultimedia();
  }, []);

  // Subir nueva imagen
  const handleAgregarUrl = async (e) => {
    e.preventDefault();
    if (!nuevaUrl.trim() || !gatoSeleccionado) return;
    const { error } = await supabase
      .from("multimedia")
      .insert([{ url: nuevaUrl, gato_id: gatoSeleccionado }]);
    if (error) {
      setError("Error al agregar la imagen: " + error.message);
    } else {
      setNuevaUrl("");
      setGatoSeleccionado("");
      setError(null);
      // Recargar imágenes
      const { data } = await supabase
        .from("multimedia")
        .select("id, url, gato:gato_id (id, nombre)")
        .order("id", { ascending: false });
      setImagenes(data);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Galería de Fotos de Gatos</h2>
      <form onSubmit={handleAgregarUrl} style={{ marginBottom: 24, display: "flex", gap: 8 }}>
        <select
          value={gatoSeleccionado}
          onChange={e => setGatoSeleccionado(e.target.value)}
          required
        >
          <option value="">Selecciona un gato</option>
          {gatos.map(gato => (
            <option key={gato.id} value={gato.id}>{gato.nombre}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="URL de la foto"
          value={nuevaUrl}
          onChange={e => setNuevaUrl(e.target.value)}
          required
        />
        <button type="submit">Subir foto</button>
      </form>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      <ul className="galeria-gatos-lista">
        {imagenes.map((img) => (
          <li key={img.id}>
            <img src={img.url} alt="Foto de gato" />
            <div>
              <strong>{img.gato?.nombre || "Sin nombre"}</strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}