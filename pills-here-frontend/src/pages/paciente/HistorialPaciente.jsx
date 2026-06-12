import "./HistorialPaciente.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef  } from "react";
import { obtenerHistorialPaciente } from "../../services/pacienteService";
import { obtenerNotificacionesPaciente } from "../../services/notificacionesService";

import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import iconUsuario from "../../assets/images/icon-perfilP.png";

function HistorialPaciente() {
  const navigate = useNavigate();
  const idPaciente = localStorage.getItem("idPaciente");

  const [paciente, setPaciente] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  const notificacionesRef = useRef(null);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const data = await obtenerHistorialPaciente(idPaciente);
        setPaciente(data);
        setHistorial(data.historial || []);
      } catch (error) {
        console.error("Error al cargar historial:", error);
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

    cargarHistorial();
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

  if (!paciente) {
    return <p>Cargando historial...</p>;
  }

  return (
    <div className="historial-paciente-page">
      <header className="historial-paciente-header">
        <img src={logo} alt="Logo Pills Here" className="historial-paciente-logo" />

        <h1>Historial Clinico</h1>

        <div className="historial-paciente-icons" ref={notificacionesRef}>
            <button
              className="historial-paciente-btn-notificacion"
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
                          : `Dr. ${notificacion.nombreMedico} ha dejado un nuevo ${notificacion.tipo === "COMENTARIO" ? "comentario" : "aviso"
                          }.`}
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
                          : notificacion.tipo === "COMENTARIO"
                            ? "comentario"
                            : "aviso"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

          <button type="button">
            <img src={iconPerfil} alt="Perfil"  onClick={() => navigate("/perfil-paciente")} />
          </button>
        </div>
      </header>

      <main className="historial-paciente-content">
        <section className="historial-paciente-info">
          <img src={iconUsuario} alt="Paciente" className="historial-paciente-avatar" />

          <div className="historial-paciente-datos">
            <p>{paciente.nombreCompleto} ID:#{paciente.idPaciente}</p>
            <p>Edad: {paciente.edad} años.</p>
            <p>Sexo: {paciente.sexo}</p>
            <p>Fecha de nacimiento: {paciente.fechaNacimiento}</p>
            <p>.</p>
          </div>
        </section>

        <section className="historial-paciente-tabla">
          <div className="historial-paciente-head">
            <span>Fecha</span>
            <span>Diagnostico</span>
            <span>Medico</span>
            <span>Estado</span>
          </div>

          {historial.map((item, index) => (
            <div className="historial-paciente-row" key={index}>
              <span>{item.fecha}</span>
              <span>{item.diagnostico}</span>
              <span>{item.medico}</span>
              <span>
                <span
                  className={`estado-badge ${item.estado?.toUpperCase() === "ACTIVO"
                    ? "estado-activo"
                    : "estado-finalizado"
                    }`}
                >
                  ● {item.estado}
                </span>
              </span>
            </div>
          ))}
        </section>

        <button
          className="historial-paciente-back"
          type="button"
          onClick={() => navigate("/inicio-paciente")}
        >
          <img src={iconRegreso} alt="Regresar" />
        </button>
      </main>
    </div>
  );
}

export default HistorialPaciente;