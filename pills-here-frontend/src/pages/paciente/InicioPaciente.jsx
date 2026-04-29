import { useEffect, useState } from "react";
import "./InicioPaciente.css";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconNotas from "../../assets/images/icon-notas.png";
import iconHistorial from "../../assets/images/icon-historial.png";
import iconTratamientos from "../../assets/images/icon-tratamientosP.png";
import iconCalendario from "../../assets/images/icon-calendario.png";
import iconEstadisticas from "../../assets/images/icon-estadisticas.png";
import iconAyuda from "../../assets/images/icon-ayuda.png";

import { obtenerDashboardPaciente } from "../../services/pacienteService";

function InicioPaciente() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const idUsuario = localStorage.getItem("idUsuario");
        if (!idUsuario) return;

        const data = await obtenerDashboardPaciente(idUsuario);
        setNombreUsuario(data.nombre || "");
      } catch (error) {
        console.error("Error al cargar dashboard paciente:", error);
      }
    };

    cargarDashboard();
  }, []);

  return (
    <div className="inicio-paciente-page">
      <header className="paciente-header">
        <div className="paciente-header-left">
          <img src={logo} alt="Logo Pills Here" className="paciente-logo" />
          <h1>Bienvenido  {nombreUsuario}</h1>
        </div>

        <div className="paciente-header-right">
          <button
            className="paciente-icon-btn"
            type="button"
            aria-label="Notificaciones"
          >
            <img src={iconNotificacion} alt="Notificaciones" />
          </button>

          <button
            className="paciente-profile-btn"
            type="button"
            aria-label="Perfil"
              onClick={() => navigate("/perfil-paciente")}
          >
            <img src={iconPerfil} alt="Perfil" />
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
              <a href="/">Ver notas recientes</a>
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
              <a href="/">Ver calendario</a>
            </div>
          </article>
        </section>

        <aside className="paciente-estadistica-panel">
          <div className="estadistica-titulo">
            <img src={iconEstadisticas} alt="Estadísticas" />
            <h2>Estadística de cumplimiento</h2>
          </div>

          <div className="estadistica-contenido">
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
          </div>
        </aside>
      </main>

      <button className="btn-ayuda-paciente" type="button" aria-label="Ayuda">
        <img src={iconAyuda} alt="Ayuda" />
      </button>
    </div>
  );
}

export default InicioPaciente;