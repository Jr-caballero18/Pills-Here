import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconComentarioNotif from "../../assets/images/comentario-notificacion.png";
import iconRecordatorioNotif from "../../assets/images/recordatorionotificacion.png";

import { obtenerNotificacionesPaciente } from "../../services/notificacionesService";

import "./NotificacionesPaciente.css";

function NotificacionesPaciente({ className = "" }) {
  const navigate = useNavigate();

  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  const notificacionesRef = useRef(null);

  const cargarNotificaciones = async () => {
    try {
      const idPaciente = sessionStorage.getItem("idPaciente");

      if (!idPaciente) {
        return;
      }

      const notificacionesData =
        await obtenerNotificacionesPaciente(idPaciente);

      const ordenadas = [...notificacionesData].sort((a, b) => {
        const fechaA = a.fechaHora
          ? new Date(a.fechaHora).getTime()
          : 0;

        const fechaB = b.fechaHora
          ? new Date(b.fechaHora).getTime()
          : 0;

        return fechaB - fechaA;
      });

      setNotificaciones(ordenadas);
    } catch (error) {
      console.error(
        "Error al cargar notificaciones:",
        error
      );
    }
  };

  useEffect(() => {
    cargarNotificaciones();

    const intervaloNotificaciones =
      setInterval(() => {
        cargarNotificaciones();
      }, 30000);

    return () => {
      clearInterval(intervaloNotificaciones);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificacionesRef.current &&
        !notificacionesRef.current.contains(event.target)
      ) {
        setMostrarNotificaciones(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const obtenerTiempoNotificacion = (notificacion) => {
    if (!notificacion.fechaHora) {
      return "";
    }

    const ahora = new Date();

    const fechaNotificacion =
      new Date(notificacion.fechaHora);

    const minutosPasados = Math.max(
      0,
      Math.floor(
        (
          ahora.getTime() -
          fechaNotificacion.getTime()
        ) / 60000
      )
    );

    if (minutosPasados < 1) {
      return "Ahora";
    }

    if (minutosPasados === 1) {
      return "Hace 1 min";
    }

    if (minutosPasados < 60) {
      return `Hace ${minutosPasados} min`;
    }

    const horas =
      Math.floor(minutosPasados / 60);

    if (horas === 1) {
      return "Hace 1 h";
    }

    if (horas < 24) {
      return `Hace ${horas} h`;
    }

    const dias =
      Math.floor(horas / 24);

    if (dias === 1) {
      return "Hace 1 día";
    }

    return `Hace ${dias} días`;
  };

  return (
    <div
      className="notificaciones-paciente-container"
      ref={notificacionesRef}
    >
      <button
        className={`paciente-icon-btn ${className}`}
        type="button"
        aria-label="Notificaciones"
        onClick={() =>
          setMostrarNotificaciones(
            !mostrarNotificaciones
          )
        }
      >
        <img
          src={iconNotificacion}
          alt="Notificaciones"
        />
      </button>

      {mostrarNotificaciones && (
        <div className="paciente-notificaciones-panel">
          <div className="notificaciones-flecha"></div>

          <div className="notificaciones-header">
            <img
              src={iconNotificacion}
              alt="Notificaciones"
            />

            <h2>Notificaciones</h2>
          </div>

          <div className="notificaciones-lista">
            {notificaciones.length === 0 ? (
              <div className="notificacion-vacia">
                No tienes notificaciones nuevas.
              </div>
            ) : (
              notificaciones.map((notificacion) => {
                const esMedicamento =
                  notificacion.tipo === "MEDICAMENTO";

                const esComentario =
                  notificacion.tipo === "COMENTARIO";

                return (
                  <div
                    className={`notificacion-card ${
                      esMedicamento
                        ? "notificacion-medicamento"
                        : "notificacion-comentario"
                    }`}
                    key={`${notificacion.tipo}-${notificacion.id}`}
                  >
                    <div className="notificacion-icono">
                      <img
                        src={
                          esMedicamento
                            ? iconRecordatorioNotif
                            : iconComentarioNotif
                        }
                        alt="Tipo de notificación"
                      />
                    </div>

                    <div className="notificacion-contenido">
                      <div className="notificacion-titulo">
                        <span className="notificacion-punto"></span>

                        <strong>
                          {esMedicamento
                            ? notificacion.titulo
                            : `Dr. ${notificacion.nombreMedico} ha dejado un nuevo ${
                                esComentario
                                  ? "comentario"
                                  : "aviso"
                              }.`
                          }
                        </strong>
                      </div>

                      <p>
                        {notificacion.contenido}
                      </p>

                      <div className="notificacion-footer">
                        <span>
                          {obtenerTiempoNotificacion(
                            notificacion
                          )}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            if (
                              esMedicamento &&
                              notificacion.idTratamiento
                            ) {
                              navigate(
                                `/tratamiento-paciente/${notificacion.idTratamiento}`
                              );

                              setMostrarNotificaciones(false);
                            }
                          }}
                        >
                          Ver{" "}
                          {esMedicamento
                            ? "dosis"
                            : esComentario
                            ? "comentario"
                            : "aviso"}{" "}
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificacionesPaciente;