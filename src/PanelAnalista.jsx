import { useState } from "react";

const ESTADOS = [
  "Recibida",
  "En revisión",
  "En proceso",
  "Completada",
  "Rechazada",
];

function leerSolicitudes() {
  const datos = JSON.parse(localStorage.getItem("solicitudes") || "[]");

  if (!Array.isArray(datos)) {
    throw new Error("El formato de las solicitudes no es válido.");
  }

  return datos;
}

export default function PanelAnalista() {
  const [cargaInicial] = useState(() => {
    try {
      return { datos: leerSolicitudes(), error: "" };
    } catch {
      return {
        datos: [],
        error: "No se pudieron leer las solicitudes guardadas.",
      };
    }
  });

  const [solicitudes, setSolicitudes] = useState(cargaInicial.datos);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [cambios, setCambios] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(cargaInicial.error);

  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    const coincideFolio = solicitud.folio
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase());

    const coincideEstado =
      filtroEstado === "" || solicitud.estado === filtroEstado;

    return coincideFolio && coincideEstado;
  });

  function guardarEstado(folio) {
    setMensaje("");
    setError("");

    const nuevoEstado = cambios[folio];

    if (!ESTADOS.includes(nuevoEstado)) {
      setError("Selecciona un estado válido antes de guardar.");
      return;
    }

    try {
      // Recupera los datos más recientes antes de modificarlos.
      const guardadas = leerSolicitudes();

      if (!guardadas.some((solicitud) => solicitud.folio === folio)) {
        setError("La solicitud ya no está disponible.");
        return;
      }

      const actualizadas = guardadas.map((solicitud) =>
        solicitud.folio === folio
          ? { ...solicitud, estado: nuevoEstado }
          : solicitud
      );

      localStorage.setItem("solicitudes", JSON.stringify(actualizadas));
      setSolicitudes(actualizadas);

      setCambios((anteriores) => {
        const pendientes = { ...anteriores };
        delete pendientes[folio];
        return pendientes;
      });

      setMensaje(`Estado de ${folio} guardado: ${nuevoEstado}.`);
    } catch {
      setError(
        "No se pudo guardar el cambio. Los datos existentes no se sobrescribieron."
      );
    }
  }

  return (
    <section className="panel-analista">
      <p className="etiqueta">ATENCIÓN DE SOLICITUDES</p>
      <h2>Panel del analista</h2>
      <p>Consulta las solicitudes y actualiza su estado de atención.</p>

      <div className="panel-filtros">
        <label>
          Buscar por folio
          <input
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Ejemplo: COD-2026-0001"
          />
        </label>

        <label>
          Filtrar por estado
          <select
            value={filtroEstado}
            onChange={(evento) => setFiltroEstado(evento.target.value)}
          >
            <option value="">Todos los estados</option>
            {ESTADOS.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="secundario"
          onClick={() => {
            setBusqueda("");
            setFiltroEstado("");
          }}
        >
          Limpiar filtros
        </button>
      </div>

      {mensaje && (
        <p className="aviso-exito" role="status">
          {mensaje}
        </p>
      )}

      {error && (
        <p className="aviso-error" role="alert">
          {error}
        </p>
      )}

      <p aria-live="polite">
        Mostrando {solicitudesFiltradas.length} de {solicitudes.length} solicitudes.
      </p>

      {solicitudes.length === 0 ? (
        <p>No hay solicitudes disponibles para mostrar.</p>
      ) : solicitudesFiltradas.length === 0 ? (
        <p>No se encontraron solicitudes con esos filtros.</p>
      ) : (
        <div className="panel-tabla-contenedor">
          <table className="panel-tabla">
            <caption>Solicitudes registradas en este navegador</caption>
            <thead>
              <tr>
                <th scope="col">Folio</th>
                <th scope="col">Solicitante</th>
                <th scope="col">Artículo</th>
                <th scope="col">Categoría</th>
                <th scope="col">Fecha</th>
                <th scope="col">Estado actual</th>
                <th scope="col">Actualizar estado</th>
              </tr>
            </thead>

            <tbody>
              {solicitudesFiltradas.map((solicitud) => (
                <tr key={solicitud.folio}>
                  <td>{solicitud.folio}</td>
                  <td>{solicitud.solicitante}</td>
                  <td>{solicitud.articulo}</td>
                  <td>{solicitud.categoria}</td>
                  <td>{solicitud.fecha}</td>
                  <td>
                    <span className="estado-solicitud">
                      {solicitud.estado}
                    </span>
                  </td>
                  <td>
                    <div className="panel-cambio">
                      <select
                        aria-label={`Nuevo estado de ${solicitud.folio}`}
                        value={
                          cambios[solicitud.folio] ?? solicitud.estado
                        }
                        onChange={(evento) => {
                          setCambios({
                            ...cambios,
                            [solicitud.folio]: evento.target.value,
                          });
                          setMensaje("");
                        }}
                      >
                        {ESTADOS.map((estado) => (
                          <option key={estado} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        className="principal"
                        disabled={
                          !cambios[solicitud.folio] ||
                          cambios[solicitud.folio] === solicitud.estado
                        }
                        onClick={() => guardarEstado(solicitud.folio)}
                      >
                        Guardar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}