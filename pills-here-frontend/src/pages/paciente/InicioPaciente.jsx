import { useEffect, useState, useRef } from "react";
import "./InicioPaciente.css";
import { useNavigate, useLocation } from "react-router-dom";
import ManualPaciente from "../../components/ManualPaciente/ManualPaciente";
import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconNotas from "../../assets/images/icon-notas.png";
import iconHistorial from "../../assets/images/icon-historial.png";
import iconTratamientos from "../../assets/images/icon-tratamientosP.png";
import iconCalendario from "../../assets/images/icon-calendario.png";
import iconEstadisticas from "../../assets/images/icon-estadisticas.png";
import iconAyuda from "../../assets/images/icon-ayuda.png";
import { obtenerNotificacionesPaciente } from "../../services/notificacionesService";
import { obtenerEstadisticasGeneralesPaciente } from "../../services/tratamientoService";
import { obtenerDashboardPaciente } from "../../services/pacienteService";
import iconComentarioNotif from "../../assets/images/comentario-notificacion.png";
import iconRecordatorioNotif from "../../assets/images/recordatorionotificacion.png";
import NotificacionesPaciente
  from "../../components/NotificacionesPaciente/NotificacionesPaciente";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


function InicioPaciente() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navigate = useNavigate();
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const notificacionesRef = useRef(null);
  const [estadisticas, setEstadisticas] = useState({
    tomadas: 0,
    pendientes: 0,
    omitidas: 0,
    porcentajeCumplimiento: 0,
  });
  const [mostrarManual, setMostrarManual] = useState(false);


  const datosGrafica = [
    {
      nombre: "Tomadas",
      valor: estadisticas.tomadas,
      color: "#78c98b",
    },
    {
      nombre: "Pendientes",
      valor: estadisticas.pendientes,
      color: "#f2a65a",
    },
    {
      nombre: "Omitidas",
      valor: estadisticas.omitidas,
      color: "#ef6b6b",
    },
  ];

  const totalTomas =
    estadisticas.tomadas +
    estadisticas.pendientes +
    estadisticas.omitidas;
  const [cargandoEstadisticas, setCargandoEstadisticas] = useState(true);

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const idUsuario = sessionStorage.getItem("idUsuario");
        if (!idUsuario) return;

        const data = await obtenerDashboardPaciente(idUsuario);
        setNombreUsuario(data.nombre || "");
      } catch (error) {
        console.error("Error al cargar dashboard paciente:", error);

        const nombreGuardado = sessionStorage.getItem("nombre");
        if (nombreGuardado) {
          setNombreUsuario(nombreGuardado);
        }
      }
    };



    const cargarEstadisticas = async () => {
      try {
        setCargandoEstadisticas(true);

        const idPaciente = sessionStorage.getItem("idPaciente");

        if (!idPaciente) {
          console.error("No se encontró idPaciente en localStorage");
          return;
        }

        const data =
          await obtenerEstadisticasGeneralesPaciente(idPaciente);

        setEstadisticas({
          tomadas: data.tomadas || 0,
          pendientes: data.pendientes || 0,
          omitidas: data.omitidas || 0,
          porcentajeCumplimiento:
            data.porcentajeCumplimiento || 0,
        });
      } catch (error) {
        console.error(
          "Error al cargar estadísticas generales:",
          error
        );
      } finally {
        setCargandoEstadisticas(false);
      }
    };

    cargarDashboard();
    cargarEstadisticas();


  }, []);

  return (
    <div className="inicio-paciente-page">
      <header className="paciente-header">
        <div className="paciente-header-left">
          <img src={logo} alt="Logo Pills Here" className="paciente-logo" />
          <h1>Bienvenido  {nombreUsuario}</h1>
        </div>

        <div className="paciente-header-right">

          <NotificacionesPaciente />

          <button
            className="paciente-profile-btn"
            type="button"
            aria-label="Perfil"
            onClick={() => navigate("/perfil-paciente")}
          >
            <img
              src={iconPerfil}
              alt="Perfil"
            />
          </button>

        </div>
      </header>

      <main className="paciente-main">
        <section className="paciente-accesos">
          <article className="paciente-card">
            <div className="paciente-card-icon">
              <img src={iconNotas} alt="Notas del médico" />
            </div>

            <div className="paciente-card-content">
              <h2>Notas del Médico</h2>
              <a href="/notas-paciente">Ver notas recientes</a>
            </div>
          </article>

          <article className="paciente-card">
            <div className="paciente-card-icon">
              <img src={iconHistorial} alt="Historial clínico" />
            </div>

            <div className="paciente-card-content">
              <h2>Historial Clínico</h2>
              <a href="/historial-paciente">Ver historial clínico</a>
            </div>
          </article>

          <article className="paciente-card">
            <div className="paciente-card-icon">
              <img src={iconTratamientos} alt="Tratamientos actuales" />
            </div>

            <div className="paciente-card-content">
              <h2>Tratamientos Actuales</h2>
              <a href="/tratamientos-paciente" >Ver tratamientos actuales </a>
            </div>
          </article>

          <article className="paciente-card">
            <div className="paciente-card-icon">
              <img src={iconCalendario} alt="Calendario de medicación" />
            </div>

            <div className="paciente-card-content">
              <h2>Calendario de Medicación</h2>
              <a href="/calendario-paciente">Ver calendario</a>
            </div>
          </article>
        </section>

        <aside className="paciente-estadistica-panel">
          <div className="estadistica-titulo">
            <img src={iconEstadisticas} alt="Estadísticas" />
            <h2>Estadística de cumplimiento</h2>
          </div>

          <div className="estadistica-contenido">
            {cargandoEstadisticas ? (
              <div className="estadistica-mensaje">
                Cargando estadísticas...
              </div>
            ) : totalTomas === 0 ? (
              <>
                <div className="estadistica-placeholder">
                  <div className="grafica-placeholder">
                    <div className="grafica-centro">Sin datos</div>
                  </div>
                </div>

                <div className="estadistica-info">
                  <p>Aún no hay estadísticas disponibles.</p>
                  <p>
                    Las estadísticas se mostrarán cuando existan tratamientos y
                    registros de seguimiento.
                  </p>
                </div>

                <div className="estadistica-footer">
                  <strong>Cumplimiento: --</strong>
                </div>
              </>
            ) : (
              <>
                <div className="estadistica-grafica">
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={datosGrafica}
                        dataKey="valor"
                        nameKey="nombre"
                        cx="50%"
                        cy="50%"
                        outerRadius={105}
                        stroke="#202020"
                        strokeWidth={2}
                        label={({ percent }) =>
                          `${Math.round(percent * 100)}%`
                        }
                        labelLine={false}
                      >
                        {datosGrafica.map((dato) => (
                          <Cell
                            key={dato.nombre}
                            fill={dato.color}
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        formatter={(valor, nombre) => [
                          valor,
                          nombre,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="estadistica-separador"></div>

                <div className="estadistica-leyenda">
                  {datosGrafica.map((dato) => (
                    <div
                      className="estadistica-leyenda-item"
                      key={dato.nombre}
                    >
                      <span
                        className="estadistica-color"
                        style={{ backgroundColor: dato.color }}
                      ></span>

                      <span>{dato.nombre}:</span>

                      <strong>{dato.valor}</strong>
                    </div>
                  ))}
                </div>

                <div className="estadistica-separador"></div>

                <div className="estadistica-footer">
                  <strong>
                    Cumplimiento:{" "}
                    {Math.round(
                      estadisticas.porcentajeCumplimiento
                    )}
                    %
                  </strong>
                </div>
              </>
            )}
          </div>
        </aside>
      </main>

      <button
        className="btn-ayuda-paciente"
        type="button"
        aria-label="Ayuda"
        onClick={() => setMostrarManual(true)}
      >
        <img src={iconAyuda} alt="Ayuda" />
      </button>

      {mostrarManual && (
        <ManualPaciente
          onCerrar={() => setMostrarManual(false)}
        />
      )}
    </div>
  );
}

export default InicioPaciente;