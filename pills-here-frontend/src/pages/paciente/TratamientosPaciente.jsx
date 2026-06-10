import "./TratamientosPaciente.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerTratamientosActivosPaciente } from "../../services/tratamientoService";
import { obtenerNotificacionesPaciente } from "../../services/notificacionesService";

import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import iconTratamiento from "../../assets/images/icon-tratamiento.png";

function TratamientosPaciente() {
  const navigate = useNavigate();

  const idPaciente = localStorage.getItem("idPaciente");
  const nombrePaciente = localStorage.getItem("nombre");

  const [tratamientos, setTratamientos] = useState([]);

  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const notificacionesRef = useRef(null);

  useEffect(() => {
    const cargarTratamientos = async () => {
      try {
        const data = await obtenerTratamientosActivosPaciente(idPaciente);
        setTratamientos(data);
      } catch (error) {
        console.error("Error al cargar tratamientos:", error);
      }
    };

    const cargarNotificaciones = async () => {
      try {
        if (!idPaciente) return;
        const data = await obtenerNotificacionesPaciente(idPaciente);
        setNotificaciones(data);
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
      }
    };

    cargarTratamientos();
    cargarNotificaciones();
  }, [idPaciente]);

  useEffect(() => {
    const cerrarAlDarClickFuera = (e) => {
      if (
        notificacionesRef.current &&
        !notificacionesRef.current.contains(e.target)
      ) {
        setMostrarNotificaciones(false);
      }
    };

    document.addEventListener("mousedown", cerrarAlDarClickFuera);

    return () => {
      document.removeEventListener("mousedown", cerrarAlDarClickFuera);
    };
  }, []);

  return (
    <div className="tratamientos-paciente-page">
      <header className="tratamientos-paciente-header">
        <img src={logo} alt="Logo" className="tratamientos-paciente-logo" />

        <h1>Bienvenido {nombrePaciente}</h1>

        <div className="tratamientos-paciente-icons">

          <div ref={notificacionesRef}>
            <button
              type="button"
              onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}
            >
              <img src={iconNotificacion} alt="Notificaciones" />
            </button>

            {mostrarNotificaciones && (
              <div className="paciente-notificaciones-panel">
                <div className="notificaciones-flecha"></div>

                <div className="notificaciones-header">
                  <img src={iconNotificacion} alt="Notificaciones" />
                </div>

                {notificaciones.length === 0 ? (
                  <div className="notificacion-item">
                    <strong>No tienes notificaciones nuevas.</strong>
                  </div>
                ) : (
                  notificaciones.map((notificacion) => (
                    <div
                      className="notificacion-item"
                      key={`${notificacion.tipo}-${notificacion.id}`}
                    >
                      <strong>
                        {notificacion.tipo === "MEDICAMENTO"
                          ? notificacion.titulo
                          : `Dr. ${notificacion.nombreMedico} ha dejado un nuevo aviso.`}
                      </strong>

                      <p>{notificacion.contenido}</p>

                      <button
                        type="button"
                        onClick={() => {
                          if (notificacion.tipo === "MEDICAMENTO") {
                            navigate("/tratamientos-paciente");
                          }
                        }}
                      >
                        &gt; Ver{" "}
                        {notificacion.tipo === "MEDICAMENTO"
                          ? "tratamiento"
                          : "aviso"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <button type="button">
            <img src={iconPerfil} alt="Perfil" />
          </button>

        </div>
      </header>

      <main className="tratamientos-paciente-content">
        <h2>Tratamientos Actuales</h2>

        <div className="tratamientos-paciente-lista">
          {tratamientos.map((tratamiento) => (
            <div className="tratamiento-paciente-card" key={tratamiento.idTratamiento}>
              <div className="tratamiento-paciente-icono">
                <img src={iconTratamiento} alt="Tratamiento" />
              </div>

              <div className="tratamiento-paciente-info">
                <h3>Tratamiento de {tratamiento.nombreTratamiento}</h3>
                <p>{tratamiento.diagnostico}</p>

                <span className="tratamiento-paciente-estado">
                  ● Activo
                </span>
              </div>

              <button
                className="tratamiento-paciente-ver-btn"
                type="button"
                onClick={() =>
                  navigate(`/tratamiento-paciente/${tratamiento.idTratamiento}`)
                }
              >
                Ver Tratamiento
              </button>
            </div>
          ))}
        </div>

        <button
          className="tratamientos-paciente-back"
          type="button"
          onClick={() => navigate("/inicio-paciente")}
        >
          <img src={iconRegreso} alt="Regresar" />
        </button>
      </main>
    </div>
  );
}

export default TratamientosPaciente;