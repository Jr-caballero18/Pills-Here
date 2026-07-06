import "./PerfilPaciente.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerHistorialPaciente } from "../../services/pacienteService";

import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import iconMail from "../../assets/images/icon-mail.png";
import iconCode from "../../assets/images/icon-code.png";
import iconNacimiento from "../../assets/images/icon-nacimiento.png";
import { obtenerNotificacionesPaciente } from "../../services/notificacionesService";
import iconComentarioNotif from "../../assets/images/comentario-notificacion.png";
import iconRecordatorioNotif from "../../assets/images/recordatorionotificacion.png";

function PerfilPaciente() {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  const notificacionesRef = useRef(null);
  useEffect(() => {
    const cargarPaciente = async () => {
      try {
        const idPaciente = localStorage.getItem("idPaciente");
        const data = await obtenerHistorialPaciente(idPaciente);
        console.log("Perfil paciente:", data);
        localStorage.getItem("idPaciente")
        setPaciente(data);
        const notificacionesData = await obtenerNotificacionesPaciente(idPaciente);
        setNotificaciones(notificacionesData);
      } catch (error) {
        console.error("Error al cargar perfil paciente:", error);
      }
    };

    cargarPaciente();
  }, []);

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

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!paciente) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-paciente-page">
      <header className="perfil-paciente-header">
        <img src={logo} alt="Logo Pills Here" className="perfil-paciente-logo" />

        <h1>Perfil de Paciente: {paciente.nombreCompleto}.</h1>

        <div className="perfil-paciente-icons" ref={notificacionesRef}>
          <button type="button" onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}>
            <img src={iconNotificacion} alt="Notificaciones" />
          </button>
          {mostrarNotificaciones && (
            <div className="paciente-notificaciones-panel">
              <div className="notificaciones-flecha"></div>

              <div className="notificaciones-header">
                <img src={iconNotificacion} alt="Notificaciones" />
              </div>

              {notificaciones.length === 0 ? (
                <div className="notificacion-vacia">
                  No tienes notificaciones nuevas.
                </div>
              ) : (
                notificaciones.map((notificacion) => {
                  const esMedicamento = notificacion.tipo === "MEDICAMENTO";
                  const esComentario = notificacion.tipo === "COMENTARIO";

                  return (
                    <div
                      className={`notificacion-card ${esMedicamento ? "notificacion-medicamento" : "notificacion-comentario"
                        }`}
                      key={`${notificacion.tipo}-${notificacion.id}`}
                    >
                      <div className="notificacion-icono">
                        <img
                          src={esMedicamento ? iconRecordatorioNotif : iconComentarioNotif}
                          alt="Tipo de notificación"
                        />
                      </div>

                      <div className="notificacion-contenido">
                        <div className="notificacion-titulo">
                          <span className="notificacion-punto"></span>

                          <strong>
                            {esMedicamento
                              ? notificacion.titulo
                              : `Dr. ${notificacion.nombreMedico} ha dejado un nuevo ${esComentario ? "comentario" : "aviso"
                              }.`}
                          </strong>
                        </div>

                        <p>{notificacion.contenido}</p>

                        <div className="notificacion-footer">
                          <span>Hace 10 min</span>

                          <button
                            type="button"
                            onClick={() => {
                              if (esMedicamento) {
                                navigate("/tratamientos-paciente");
                              }
                            }}
                          >
                            Ver {esMedicamento ? "dosis" : esComentario ? "comentario" : "aviso"} &gt;
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          <button type="button">
            <img src={iconPerfil} alt="Perfil" />
          </button>
        </div>
      </header>

      <main className="perfil-paciente-content">
        <section className="perfil-paciente-panel">
          <div className="perfil-paciente-avatar-box">
            <img src={iconPerfil} alt="Paciente" />
          </div>

          <div className="perfil-paciente-info">
            <h2>{paciente.nombreCompleto}</h2>

            <p>ID: #{paciente.idPaciente}</p>
            <p>Edad: {paciente.edad} años</p>
            <p>Sexo: {paciente.sexo}</p>

            <h3>Información de contacto:</h3>

            <div className="perfil-contacto-item">
              <img src={iconMail} alt="Correo" />
              <span>{paciente.correo || "Correo no registrado"}</span>
            </div>

            <div className="perfil-contacto-item">
              <img src={iconCode} alt="Código paciente" />
              <span>{paciente.codigoPaciente || "Código no registrado"}</span>
            </div>

            <div className="perfil-contacto-item">
              <img src={iconNacimiento} alt="Fecha de nacimiento" />
              <span>{paciente.fechaNacimiento || "Fecha no registrada"}</span>
            </div>

            <div className="perfil-paciente-linea"></div>

            <button
              className="perfil-paciente-cerrar-btn"
              type="button"
              onClick={cerrarSesion}
            >
              Cerrar sesion
            </button>
          </div>
        </section>

        <button
          className="perfil-paciente-back"
          type="button"
          onClick={() => navigate(-1)}
        >
          <img src={iconRegreso} alt="Regresar" />
        </button>
      </main>
    </div>
  );
}

export default PerfilPaciente;