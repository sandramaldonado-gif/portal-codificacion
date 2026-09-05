import { useState } from "react";

function ConsultaSolicitud() {
  const [folio, setFolio] = useState("");
  const [resultado, setResultado] = useState(null);
  const [mensaje, setMensaje] = useState("");

  function buscarSolicitud(evento) {
    evento.preventDefault();

    const solicitudes =
      JSON.parse(localStorage.getItem("solicitudes")) || [];

    const solicitudEncontrada = solicitudes.find(
      (solicitud) =>
        solicitud.folio.toLowerCase() === folio.trim().toLowerCase()
    );

    if (solicitudEncontrada) {
      setResultado(solicitudEncontrada);
      setMensaje("");
    } else {
      setResultado(null);
      setMensaje("No se encontró una solicitud con ese folio.");
    }
  }

  return (
    <section className="seccion-consulta">
      <p className="etiqueta">CONSULTA DE SOLICITUD</p>
      <h2>Revisa el estado de tu solicitud</h2>
      <p>Escribe el folio que recibiste al realizar el registro.</p>

      <form className="formulario-consulta" onSubmit={buscarSolicitud}>
        <label>
          Folio de la solicitud
          <input
            type="text"
            value={folio}
            onChange={(evento) => setFolio(evento.target.value)}
            placeholder="Ejemplo: COD-2026-0001"
            required
          />
        </label>

        <button type="submit" className="principal">
          Buscar solicitud
        </button>
      </form>

      {mensaje && <div className="mensaje-error">{mensaje}</div>}

      {resultado && (
        <article className="resultado-consulta">
          <div className="resultado-encabezado">
            <div>
              <small>Folio</small>
              <h3>{resultado.folio}</h3>
            </div>

            <span className="estado">{resultado.estado}</span>
          </div>

          <div className="datos-solicitud">
            <p>
              <strong>Solicitante:</strong> {resultado.solicitante}
            </p>

            <p>
              <strong>Fecha de registro:</strong> {resultado.fecha}
            </p>

            <p>
              <strong>Artículo:</strong> {resultado.articulo}
            </p>

            <p>
              <strong>Categoría:</strong> {resultado.categoria}
            </p>

            <p>
              <strong>Unidad:</strong> {resultado.unidad}
            </p>

            <p>
              <strong>Justificación:</strong> {resultado.justificacion}
            </p>

            {resultado.observaciones && (
              <p>
                <strong>Observaciones:</strong> {resultado.observaciones}
              </p>
            )}
          </div>
        </article>
      )}
    </section>
  );
}

export default ConsultaSolicitud;