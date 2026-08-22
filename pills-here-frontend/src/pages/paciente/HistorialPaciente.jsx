import "./HistorialPaciente.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { obtenerHistorialPaciente } from "../../services/tratamientoService"; import { obtenerNotificacionesPaciente } from "../../services/notificacionesService";

import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import iconUsuario from "../../assets/images/icon-perfilP.png";
import iconComentarioNotif from "../../assets/images/comentario-notificacion.png";
import iconRecordatorioNotif from "../../assets/images/recordatorionotificacion.png";
import NotificacionesPaciente from "../../components/NotificacionesPaciente/NotificacionesPaciente";
import iconVer from "../../assets/images/icon-ver.png";

function HistorialPaciente() {
  const navigate = useNavigate();
  const idPaciente = localStorage.getItem("idPaciente");

  const [paciente, setPaciente] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");

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



    cargarHistorial();
  }, [idPaciente]);

  const historialFiltrado = historial.filter((item) => {
    if (filtroEstado === "TODOS") {
      return true;
    }

    return item.estado?.toUpperCase() === filtroEstado;
  });


  if (!paciente) {
    return <p>Cargando historial...</p>;
  }

  return (
    <div className="historial-paciente-page">
      <header className="historial-paciente-header">

        <img
          src={logo}
          alt="Logo Pills Here"
          className="historial-paciente-logo"
        />

        <h1>Historial Clinico</h1>

        <div className="historial-paciente-icons">

          <NotificacionesPaciente
            className="historial-paciente-btn-notificacion"
          />

          <button type="button">
            <img
              src={iconPerfil}
              alt="Perfil"
              onClick={() =>
                navigate("/perfil-paciente")
              }
            />
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

            <span className="historial-paciente-filtro-contenedor">
              <select
                className="historial-paciente-filtro"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="TODOS" disabled hidden>
                  Filtrar
                </option>

                <option value="ACTIVO">Activos</option>
                <option value="FINALIZADO">Finalizados</option>
                <option value="CANCELADO">Cancelados</option>
              </select>
            </span>
          </div>

          {historialFiltrado.map((item, index) => (
            <div className="historial-paciente-row" key={index}>

              <span>{item.fecha}</span>

              <span>{item.diagnostico}</span>

              <span>{item.medico}</span>

              <span>
                <span
                  className={`estado-badge ${item.estado?.toUpperCase() === "ACTIVO"
                      ? "estado-activo"
                      : item.estado?.toUpperCase() === "CANCELADO"
                        ? "estado-cancelado"
                        : "estado-finalizado"
                    }`}
                >
                  ● {item.estado}
                </span>
              </span>

              <span className="historial-paciente-ver-contenedor">
                <button
                  type="button"
                  className="historial-paciente-btn-ver"
                  onClick={() =>
                    navigate(`/tratamiento-paciente/${item.idTratamiento}`)
                  }
                  title="Ver tratamiento"
                >
                  <img
                    src={iconVer}
                    alt="Ver tratamiento"
                    className="historial-paciente-icon-ver"
                  />
                </button>
              </span>

            </div>
          ))}

          {historialFiltrado.length === 0 && (
            <div className="historial-paciente-sin-resultados">
              No hay tratamientos con este estado.
            </div>
          )}

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