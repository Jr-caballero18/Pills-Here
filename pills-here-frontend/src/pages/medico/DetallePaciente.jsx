import "./DetallePaciente.css";

import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientes from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";

function DetallePaciente() {
  return (
    <div className="detalle-paciente-page">
      <aside className="detalle-sidebar">
        <div className="detalle-sidebar-logo">
          <img src={logo} alt="Logo Pills Here" className="detalle-logo-img" />
        </div>

        <nav className="detalle-sidebar-nav">
          <button className="detalle-nav-item" type="button">
            <img src={iconHome} alt="Inicio" className="detalle-nav-icon" />
            <span>Inicio</span>
          </button>

          <button className="detalle-nav-item" type="button">
            <img src={iconPacientes} alt="Pacientes" className="detalle-nav-icon" />
            <span>Pacientes</span>
          </button>

          <button className="detalle-nav-item active" type="button">
            <img src={iconAgregarPaciente} alt="Nuevo Paciente" className="detalle-nav-icon" />
            <span>Nuevo Paciente</span>
          </button>
        </nav>

        <div className="detalle-sidebar-bottom">
          <button className="detalle-back-btn" type="button">
            <img src={iconRegreso} alt="Regresar" />
          </button>
        </div>
      </aside>

      <main className="detalle-paciente-content">
        <div className="detalle-paciente-header">
          <h1>Paciente: Cristina Hernandez</h1>

          <div className="detalle-header-icons">
            <button className="detalle-btn-notificacion" type="button" aria-label="Notificaciones">
              <img src={iconNotificacion} alt="Notificaciones" />
            </button>

            <button className="detalle-btn-perfil" type="button" aria-label="Perfil">
              <img src={iconPerfil} alt="Perfil" />
            </button>
          </div>
        </div>

        <section className="detalle-paciente-panel">
          <div className="detalle-avatar-wrapper">
            <img src={iconPerfil} alt="Paciente" className="detalle-avatar" />
          </div>

          <div className="detalle-info-box">
            <p>Cristina Hernandez Figueroa</p>
            <p>Edad: 38</p>
            <p>Sexo: Femenino</p>
            <p>Tipo de sangre: O-</p>
          </div>

          <p className="detalle-sin-tratamiento">No hay tratamiento existente</p>

          <button className="detalle-crear-btn" type="button">
            Crear tratamiento
          </button>
        </section>
      </main>
    </div>
  );
}

export default DetallePaciente;