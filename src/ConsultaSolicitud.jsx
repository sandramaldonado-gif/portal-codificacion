import { useState } from "react";

export default function ConsultaSolicitud() {
  const [folio, setFolio] = useState("");
  const [solicitud, setSolicitud] = useState(null);
  const [mensaje, setMensaje] = useState("");

  function consultar(evento) {
    evento.preventDefault();
    setSolicitud(null);
    setMensaje("");

    const folioBuscado = folio.trim().toLowerCase();

    if (!folioBuscado) {
      setMensaje("Escribe el folio que deseas consultar.");
      return;
    }

    try {
      const guardadas = JSON.parse(
        localStorage.getItem("solicitudes") || "[]"
      );

      if (!Array.isArray(guardadas)) {
        throw new Error("Formato de datos inválido.");
      }

      const encontrada = guardadas.find(
        (item) => item.folio.toLowerCase() === folioBuscado
      );

      if (encontrada) {
        setSolicitud(encontrada);
      } else {
        setMensaje("No se encontró una solicitud con ese folio.");
      }
    } catch {
      setMensaje("No se pudieron leer las solicitudes guardadas.");
    }
  }

  return (
    <section className="seccion-formulario consulta-actualizada">
      <p className="etiqueta">CONSULTA DE SOLICITUD</p>
      <h2>Revisa el estado de tu solicitud</h2>
      <p>Escribe el folio que recibiste al registrar el artículo.</p>

      <form onSubmit={consultar}>
        <label className="campo-completo">
          Folio de la solicitud
          <input
            type="text"
            value={folio}
            onChange={(evento) => {
              setFolio(evento.target.value);
              setSolicitud(null);
              setMensaje("");
            }}
            placeholder="Ejemplo: COD-2026-0001"
            required
          />
        </label>

        <div className="campo-completo">
          <button type="submit" className="principal">
            Buscar solicitud
          </button>
        </div>
      </form>

      {mensaje && (
        <p className="aviso-error" role="alert">
          {mensaje}
        </p>
      )}

      {solicitud && (
        <article className="consulta-resultado" aria-live="polite">
          <div className="consulta-cabecera">
            <h3>{solicitud.folio}</h3>
            <span className="estado-solicitud">
              {solicitud.estado}
            </span>
          </div>

          <dl className="consulta-datos">
            <div>
              <dt>Solicitante</dt>
              <dd>{solicitud.solicitante}</dd>
            </div>

            <div>
              <dt>Fecha de registro</dt>
              <dd>{solicitud.fecha}</dd>
            </div>

            <div>
              <dt>Artículo</dt>
              <dd>{solicitud.articulo}</dd>
            </div>

            <div>
              <dt>Categoría</dt>
              <dd>{solicitud.categoria}</dd>
            </div>

            <div>
              <dt>Unidad de medida</dt>
              <dd>{solicitud.unidad}</dd>
            </div>

            <div>
              <dt>Justificación</dt>
              <dd>{solicitud.justificacion}</dd>
            </div>

            <div>
              <dt>Observaciones</dt>
              <dd>{solicitud.observaciones || "Sin observaciones"}</dd>
            </div>
          </dl>
        </article>
      )}
    </section>
  );
}