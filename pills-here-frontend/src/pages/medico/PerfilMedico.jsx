import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PerfilMedico.css";

import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientesMenu from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";

import iconMail from "../../assets/images/icon-mail.png";
import iconNacimiento from "../../assets/images/icon-nacimiento.png";
import iconCedula from "../../assets/images/icon-cedula.png";
import iconConsultorio from "../../assets/images/icon-consultorio.png";

import { obtenerPerfilMedico } from "../../services/medicoService";

function PerfilMedico() {
  const navigate = useNavigate();
  const [medico, setMedico] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const idMedico = sessionStorage.getItem("idMedico");
        const data = await obtenerPerfilMedico(idMedico);
        setMedico(data);
      } catch (error) {
        console.error("Error al cargar perfil médico:", error);
      }
    };

    cargarPerfil();
  }, []);

  if (!medico) {
    return <p>Cargando perfil médico...</p>;
  }

  return (
    <div className="perfil-medico-page">
      <aside className="sidebar-medico">
        <div className="logo-container">
          <img src={logo} alt="Logo Pills Here" className="logo-img" />
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item" type="button" onClick={() => navigate("/inicio-medico")}>
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

        <div className="perfil-medico-sidebar-bottom">
          <button type="button" onClick={() => navigate("/inicio-medico")}>
            <img src={iconRegreso} alt="Regresar" />
          </button>
        </div>
      </aside>

      <main className="perfil-medico-content">
        <div className="perfil-medico-header">
          <h1>Perfil de Médico: Dr. {medico.nombreCompleto}.</h1>

          <div className="acciones-superiores">

            <button className="btn-perfil" type="button" aria-label="Perfil"
              onClick={() => navigate("/perfil-medico")}>
              <img src={iconPerfil} alt="Perfil" />
            </button>
          </div>
        </div>

        <section className="perfil-medico-panel">
          <div className="perfil-medico-avatar">
            <img src={iconPerfil} alt="Médico" />
          </div>

          <div className="perfil-medico-info">
            <h2>Dr. {medico.nombreCompleto}.</h2>
            <p className="perfil-medico-especialidad">{medico.especialidad || "Especialidad no registrada"}</p>

            <h3>Información de contacto:</h3>

            <div className="perfil-medico-contacto-item">
              <img src={iconMail} alt="Correo" />
              <span>{medico.correo || "Correo no registrado"}</span>
            </div>

            <div className="perfil-medico-contacto-item">
              <img src={iconNacimiento} alt="Fecha nacimiento" />
              <span>{medico.fechaNacimiento || "Fecha no registrada"}</span>
            </div>

            <div className="perfil-medico-contacto-item">
              <img src={iconCedula} alt="Cédula" />
              <span>Número de Cédula Profesional: {medico.cedulaProfesional || "No registrada"}</span>
            </div>

            <h3>Consultorio:</h3>

            <div className="perfil-medico-contacto-item perfil-medico-consultorio">
              <img src={iconConsultorio} alt="Consultorio" />
              <span>{medico.consultorio || "Consultorio no registrado"}</span>
            </div>

            <div className="perfil-medico-linea"></div>
            <button
            className="perfil-medico-cerrar-btn"
            type="button"
            onClick={() => {
              sessionStorage.clear();
              navigate("/");
            }}
          >
            Cerrar sesion
          </button>
          </div>
          
        </section>
      </main>
    </div>
  );
}

export default PerfilMedico;