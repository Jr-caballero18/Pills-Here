import { useMemo } from "react";
import "./InicioMedico.css";

import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientesMenu from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPacientesCard from "../../assets/images/icon-pacientes.png";
import iconTratamientosActivos from "../../assets/images/icon-tratamientos.png";
import iconTratamientosCompletados from "../../assets/images/icon-check.png";
import iconVer from "../../assets/images/icon-ver.png";
import iconAyuda from "../../assets/images/icon-ayuda.png";
function InicioMedico() {
  const nombreUsuario = localStorage.getItem("nombre") || "Dr. Jorge Gonzalez";

  const pacientesRecientes = useMemo(
    () => [
      { id: 1, nombre: "Karla Martínez Duarte", edadSexo: "48 años, Femenino" },
      { id: 2, nombre: "Manuel Torres", edadSexo: "44 años, Masculino" },
      { id: 3, nombre: "Karla Martínez Duarte", edadSexo: "48 años, Femenino" },
      { id: 4, nombre: "Karla Martínez Duarte", edadSexo: "48 años, Femenino" },
      { id: 5, nombre: "Karla Martínez Duarte", edadSexo: "48 años, Femenino" },
    ],
    []
  );

  return (
    <div className="inicio-medico-page">
      <aside className="sidebar-medico">
        <div className="logo-container">
          <img src={logo} alt="Logo Pills Here" className="logo-img" />
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active" type="button">
            <img src={iconHome} alt="Inicio" className="nav-icon" />
            <span>Inicio</span>
          </button>

          <button className="nav-item" type="button">
            <img src={iconPacientesMenu} alt="Pacientes" className="nav-icon" />
            <span>Pacientes</span>
          </button>

          <button className="nav-item" type="button">
            <img src={iconAgregarPaciente} alt="Nuevo Paciente" className="nav-icon" />
            <span>Nuevo Paciente</span>
          </button>
        </nav>
      </aside>

      <main className="contenido-medico">
        <div className="encabezado-superior">
          <h1>Bienvenido {nombreUsuario}</h1>

          <div className="acciones-superiores">
            <button className="btn-notificacion" type="button" aria-label="Notificaciones">
              <img src={iconNotificacion} alt="Notificaciones" />
            </button>

            <button className="btn-perfil" type="button" aria-label="Perfil">
              <span>👤</span>
            </button>
          </div>
        </div>

        <section className="bloque-gris">
          <div className="bloque-titulo">Resumen de actividad</div>

          <div className="resumen-cards">
            <article className="resumen-card naranja">
              <img src={iconPacientesCard} alt="Pacientes" className="card-icon-img" />
              <div className="card-texto">
                <h3>12</h3>
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
                <h3>8</h3>
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
                <h3>4</h3>
                <p>Tratamientos Completados</p>
              </div>
            </article>
          </div>
        </section>

        <section className="bloque-gris">
          <div className="consultado-header">
            <div className="bloque-titulo sin-margen">Consultado recientemente</div>

            <div className="search-pill">
              <input type="text" />
              <span>⌕</span>
            </div>
          </div>

          <div className="tabla-wrapper">
            <div className="tabla-head">
              <span>Nombre</span>
              <span>Edad / sexo</span>
              <span>Historial</span>
            </div>

            {pacientesRecientes.map((paciente) => (
              <div key={paciente.id} className="tabla-row">
                <span>{paciente.nombre}</span>
                <span>{paciente.edadSexo}</span>
                <span className="historial-col">
                  <button className="btn-ver" type="button">
                    <img src={iconVer} alt="Ver historial" />
                  </button>
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <button className="btn-ayuda">
        <img src={iconAyuda} alt="Ayuda" />
      </button>
    </div>
  );
}

export default InicioMedico;