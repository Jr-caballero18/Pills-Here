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
  const [notificacionesNoVistas, setNotificacionesNoVistas] = useState(0);

  const notificacionesRef = useRef(null);

  const obtenerClaveNotificacion = (notificacion) => {
    return `${notificacion.tipo}-${notificacion.id}`;
  };

  const obtenerNotificacionesVistas = (idPaciente) => {
    const guardadas = localStorage.getItem(
      `notificacionesVistas_${idPaciente}`
    );

    return guardadas ? JSON.parse(guardadas) : [];
  };

  const marcarNotificacionesComoVistas = () => {
    const idPaciente = localStorage.getItem("idPaciente");

    if (!idPaciente || notificaciones.length === 0) {
      setNotificacionesNoVistas(0);
      return;
    }

    const vistasAnteriores =
      obtenerNotificacionesVistas(idPaciente);

    const nuevasVistas = [
      ...new Set([
        ...vistasAnteriores,
        ...notificaciones.map(obtenerClaveNotificacion),
      ]),
    ];

    localStorage.setItem(
      `notificacionesVistas_${idPaciente}`,
      JSON.stringify(nuevasVistas)
    );

    setNotificacionesNoVistas(0);
  };

  const cargarNotificaciones = async () => {
    try {
      const idPaciente = localStorage.getItem("idPaciente");

      if (!idPaciente) {
        return;
      }

      const notificacionesData =
        await obtenerNotificacionesPaciente(idPaciente);

      const eliminadas = JSON.parse(
        localStorage.getItem(
          `notificacionesEliminadas_${idPaciente}`
        ) || "[]"
      );

      const notificacionesVisibles =
        notificacionesData.filter(
          (notificacion) =>
            !eliminadas.includes(
              `${notificacion.tipo}-${notificacion.id}`
            )
        );

      const ordenadas = [...notificacionesVisibles].sort((a, b) => {
        const fechaA = a.fechaHora
          ? new Date(a.fechaHora).getTime()
          : 0;

        const fechaB = b.fechaHora
          ? new Date(b.fechaHora).getTime()
          : 0;

        return fechaB - fechaA;
      });

      setNotificaciones(ordenadas);

      const vistas =
        obtenerNotificacionesVistas(idPaciente);

      const cantidadNoVistas = ordenadas.filter(
        (notificacion) =>
          !vistas.includes(
            obtenerClaveNotificacion(notificacion)
          )
      ).length;

      setNotificacionesNoVistas(cantidadNoVistas);

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
    if (
      mostrarNotificaciones &&
      notificaciones.length > 0
    ) {
      marcarNotificacionesComoVistas();
    }
  }, [notificaciones, mostrarNotificaciones]);

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


  const eliminarNotificacion = (notificacion) => {
    const idPaciente = localStorage.getItem("idPaciente");

    if (!idPaciente) return;

    const clave = `${notificacion.tipo}-${notificacion.id}`;

    const guardadas = JSON.parse(
      localStorage.getItem(
        `notificacionesEliminadas_${idPaciente}`
      ) || "[]"
    );

    const actualizadas = [
      ...new Set([
        ...guardadas,
        clave
      ])
    ];

    localStorage.setItem(
      `notificacionesEliminadas_${idPaciente}`,
      JSON.stringify(actualizadas)
    );

    setNotificaciones((prev) =>
      prev.filter(
        (item) =>
          `${item.tipo}-${item.id}` !== clave
      )
    );
  };

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
        onClick={() => {
          const nuevoEstado = !mostrarNotificaciones;

          setMostrarNotificaciones(nuevoEstado);

          if (nuevoEstado) {
            marcarNotificacionesComoVistas();
          }
        }}
      >
        <img
          src={iconNotificacion}
          alt="Notificaciones"
        />

        {notificacionesNoVistas > 0 && (
          <span className="notificaciones-contador">
            {notificacionesNoVistas > 99
              ? "99+"
              : notificacionesNoVistas}
          </span>
        )}
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
                    className={`notificacion-card ${esMedicamento
                      ? "notificacion-medicamento"
                      : "notificacion-comentario"
                      }`}
                    key={`${notificacion.tipo}-${notificacion.id}`}
                  >

                    <button
                      type="button"
                      className="notificacion-eliminar"
                      aria-label="Eliminar notificación"
                      onClick={(e) => {
                        e.stopPropagation();
                        eliminarNotificacion(notificacion);
                      }}
                    >
                      ×
                    </button>

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
                            : `Dr. ${notificacion.nombreMedico} ha dejado un nuevo ${esComentario
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
                            } else {
                              navigate(
                                "/notas-paciente",
                                {
                                  state: {
                                    idAviso: notificacion.id
                                  }
                                }
                              );
                            }

                            setMostrarNotificaciones(false);
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