import { useState } from "react";
import "./App.css";
import ConsultaSolicitud from "./ConsultaSolicitud";

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [folioGenerado, setFolioGenerado] = useState("");

  const [formulario, setFormulario] = useState({
    solicitante: "",
    articulo: "",
    categoria: "",
    unidad: "",
    justificacion: "",
    observaciones: "",
  });

  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  }

  function abrirNuevaSolicitud() {
    setFolioGenerado("");
    setPantalla("nueva");
  }

  function registrarSolicitud(evento) {
    evento.preventDefault();

    const solicitudesGuardadas =
      JSON.parse(localStorage.getItem("solicitudes")) || [];

    const numeroSolicitud = solicitudesGuardadas.length + 1;
    const añoActual = new Date().getFullYear();

    const folio = `COD-${añoActual}-${String(numeroSolicitud).padStart(
      4,
      "0"
    )}`;

    const nuevaSolicitud = {
      ...formulario,
      folio: folio,
      fecha: new Date().toLocaleDateString("es-MX"),
      estado: "Recibida",
    };

    solicitudesGuardadas.push(nuevaSolicitud);

    localStorage.setItem(
      "solicitudes",
      JSON.stringify(solicitudesGuardadas)
    );

    setFolioGenerado(folio);

    setFormulario({
      solicitante: "",
      articulo: "",
      categoria: "",
      unidad: "",
      justificacion: "",
      observaciones: "",
    });
  }

  return (
    <div className="app">
      <header className="encabezado">
        <div>
          <h1>Portal de Codificación</h1>
          <p>Gestión de solicitudes de artículos</p>
        </div>

        <nav>
          <button onClick={() => setPantalla("inicio")}>
            Inicio
          </button>

          <button onClick={abrirNuevaSolicitud}>
            Nueva solicitud
          </button>

          <button onClick={() => setPantalla("consulta")}>
            Consultar solicitud
          </button>
        </nav>
      </header>

      <main className="contenido">
        {pantalla === "inicio" && (
          <>
            <section className="bienvenida">
              <p className="etiqueta">PORTAL DE SERVICIO</p>

              <h2>Solicita la codificación de un artículo</h2>

              <p>
                Registra una nueva solicitud o consulta su estado mediante el
                folio proporcionado.
              </p>

              <div className="acciones">
                <button
                  className="principal"
                  onClick={abrirNuevaSolicitud}
                >
                  Crear nueva solicitud
                </button>

                <button
                  className="secundario"
                  onClick={() => setPantalla("consulta")}
                >
                  Consultar solicitud
                </button>
              </div>
            </section>

            <section className="tarjetas">
              <article>
                <span>1</span>
                <h3>Captura los datos</h3>
                <p>
                  Completa la información necesaria del artículo.
                </p>
              </article>

              <article>
                <span>2</span>
                <h3>Recibe tu folio</h3>
                <p>
                  El sistema generará un folio para identificar la solicitud.
                </p>
              </article>

              <article>
                <span>3</span>
                <h3>Consulta el avance</h3>
                <p>
                  Utiliza el folio para revisar el estado de atención.
                </p>
              </article>
            </section>
          </>
        )}

        {pantalla === "nueva" && (
          <section className="seccion-formulario">
            <p className="etiqueta">NUEVA SOLICITUD</p>

            <h2>Datos del artículo</h2>

            <p>
              Completa todos los campos marcados como obligatorios.
            </p>

            {folioGenerado && (
              <div className="confirmacion">
                <p>Solicitud registrada correctamente.</p>

                <p>
                  Tu folio es: <strong>{folioGenerado}</strong>
                </p>

                <button
                  type="button"
                  className="secundario"
                  onClick={() => setPantalla("consulta")}
                >
                  Consultar solicitud
                </button>
              </div>
            )}

            <form onSubmit={registrarSolicitud}>
              <label>
                Nombre del solicitante *
                <input
                  type="text"
                  name="solicitante"
                  value={formulario.solicitante}
                  onChange={actualizarCampo}
                  placeholder="Escribe tu nombre"
                  required
                />
              </label>

              <label>
                Descripción del artículo *
                <input
                  type="text"
                  name="articulo"
                  value={formulario.articulo}
                  onChange={actualizarCampo}
                  placeholder="Describe el artículo"
                  required
                />
              </label>

              <label>
                Categoría *
                <select
                  name="categoria"
                  value={formulario.categoria}
                  onChange={actualizarCampo}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Flota">Flota</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Servicios">Servicios</option>
                  <option value="Otro">Otro</option>
                </select>
              </label>

              <label>
                Unidad de medida *
                <select
                  name="unidad"
                  value={formulario.unidad}
                  onChange={actualizarCampo}
                  required
                >
                  <option value="">Selecciona una unidad</option>
                  <option value="Pieza">Pieza</option>
                  <option value="Caja">Caja</option>
                  <option value="Servicio">Servicio</option>
                  <option value="Kilogramo">Kilogramo</option>
                  <option value="Litro">Litro</option>
                </select>
              </label>

              <label className="campo-completo">
                Justificación *
                <textarea
                  name="justificacion"
                  value={formulario.justificacion}
                  onChange={actualizarCampo}
                  placeholder="Explica por qué se necesita el artículo"
                  rows="4"
                  required
                />
              </label>

              <label className="campo-completo">
                Observaciones
                <textarea
                  name="observaciones"
                  value={formulario.observaciones}
                  onChange={actualizarCampo}
                  placeholder="Agrega información adicional"
                  rows="3"
                />
              </label>

              <div className="campo-completo acciones-formulario">
                <button type="submit" className="principal">
                  Registrar solicitud
                </button>

                <button
                  type="button"
                  className="secundario"
                  onClick={() => setPantalla("inicio")}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}

        {pantalla === "consulta" && <ConsultaSolicitud />}
      </main>

      <footer>
        <p>
          Portal de Solicitudes de Codificación · Proyecto académico
        </p>
      </footer>
    </div>
  );
}

export default App;