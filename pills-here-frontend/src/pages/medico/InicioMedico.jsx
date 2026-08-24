import { useEffect, useState } from "react";
import "./InicioMedico.css";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientesMenu from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconPacientesCard from "../../assets/images/icon-pacientes.png";
import iconTratamientosActivos from "../../assets/images/icon-tratamientos.png";
import iconTratamientosCompletados from "../../assets/images/icon-check.png";
import iconVer from "../../assets/images/icon-ver.png";
import iconAyuda from "../../assets/images/icon-ayuda.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import {
  contarTratamientosActivosMedico,
  contarTratamientosFinalizadosMedico,
} from "../../services/tratamientoService";
import { obtenerDashboardMedico } from "../../services/medicoService";
import ManualMedico from "../../components/ManualMedico/ManualMedico";

function InicioMedico() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [totalPacientes, setTotalPacientes] = useState(0);
  const [tratamientosActivos, setTratamientosActivos] = useState(0);
  const [tratamientosCompletados, setTratamientosCompletados] = useState(0);
  const [pacientesRecientes, setPacientesRecientes] = useState([]);
  const [manualAbierto, setManualAbierto] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const idUsuario = sessionStorage.getItem("idUsuario");
        const idMedico = sessionStorage.getItem("idMedico");

        if (!idUsuario) return;

        const data = await obtenerDashboardMedico(idUsuario);

        setNombreUsuario(data.nombre || "");
        setTotalPacientes(data.totalPacientes || 0);
        setPacientesRecientes(data.pacientesRecientes || []);

        if (idMedico) {
          const activos = await contarTratamientosActivosMedico(idMedico);
          const finalizados = await contarTratamientosFinalizadosMedico(idMedico);

          setTratamientosActivos(activos || 0);
          setTratamientosCompletados(finalizados || 0);
        }

      } catch (error) {
        console.error("Error al cargar dashboard médico:", error);
      }
    };

    cargarDashboard();
  }, [location.key]);

  return (
    <div className="inicio-medico-page">
      <aside className="sidebar-medico">
        <div className="logo-container">
          <img src={logo} alt="Logo Pills Here" className="logo-img" />
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active" type="button" onClick={() => navigate("/inicio-medico")}>
            <img src={iconHome} alt="Inicio" className="nav-icon" />
            <span>Inicio</span>
          </button>

          <button className="nav-item" type="button" onClick={() => navigate("/lista-pacientes")}>
            <img src={iconPacientesMenu} alt="Pacientes" className="nav-icon" />
            <span>Pacientes</span>
          </button>

          <button className="nav-item" type="button" onClick={() => navigate("/nuevo-paciente")}>
            <img src={iconAgregarPaciente} alt="Nuevo Paciente" className="nav-icon" />
            <span>Nuevo Paciente</span>
          </button>
        </nav>
      </aside>

      <main className="contenido-medico">
        <div className="encabezado-superior">
          <h1>Bienvenido Dr. {nombreUsuario}</h1>

          <div className="acciones-superiores">

            <button className="btn-perfil" type="button" aria-label="Perfil"
              onClick={() => navigate("/perfil-medico")}>
              <img src={iconPerfil} alt="Perfil" />
            </button>
          </div>
        </div>

        <section className="bloque-gris">
          <div className="bloque-titulo">Resumen de actividad</div>

          <div className="resumen-cards">
            <article className="resumen-card naranja">
              <img src={iconPacientesCard} alt="Pacientes" className="card-icon-img" />
              <div className="card-texto">
                <h3>{totalPacientes}</h3>
                <p>Pacientes</p>
              </div>
            </article>

            <article className="resumen-card amarillo">
              <img
                src={iconTratamientosActivos}
                alt="Tratamientos activos"
                className="card-icon-img"
              />
              <div className="card-texto">
                <h3>{tratamientosActivos}</h3>
                <p>Tratamientos Activos</p>
              </div>
            </article>

            <article className="resumen-card verde">
              <img
                src={iconTratamientosCompletados}
                alt="Tratamientos completados"
                className="card-icon-img"
              />
              <div className="card-texto">
                <h3>{tratamientosCompletados}</h3>
                <p>Tratamientos Completados</p>
              </div>
            </article>
          </div>
        </section>

        <section className="bloque-gris">
          <div className="consultado-header">
            <div className="bloque-titulo sin-margen">Consultado recientemente</div>
          </div>

          <div className="tabla-wrapper">
            <div className="tabla-head">
              <span>Nombre</span>
              <span>Edad / sexo</span>
              <span>Historial</span>
            </div>

            {pacientesRecientes.length === 0 ? (
              <div className="tabla-row sin-datos">
                <span>No hay pacientes consultados recientemente.</span>
                <span></span>
                <span></span>
              </div>
            ) : (
              pacientesRecientes.map((paciente, index) => (
                <div key={index} className="tabla-row">
                  <button
                    className="tabla-nombre-btn"
                    type="button"
                    onClick={() => navigate(`/detalle-paciente/${paciente.idPaciente}`)}
                  >
                    {paciente.nombre}
                  </button>

                  <span>{paciente.edadSexo}</span>

                  <span className="historial-col">
                    <button
                      className="btn-ver"
                      type="button"
                      onClick={() => navigate(`/historial-clinico/${paciente.idPaciente}`)}
                    >
                      <img src={iconVer} alt="Ver historial" />
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <button
        className="btn-ayuda"
        type="button"
        onClick={() => setManualAbierto(true)}
      >
        <img src={iconAyuda} alt="Ayuda" />
      </button>

      {manualAbierto && (
        <ManualMedico onCerrar={() => setManualAbierto(false)} />
      )}
      
    </div>
  );
}

export default InicioMedico;