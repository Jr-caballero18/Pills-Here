import "./NuevoPaciente.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientes from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import { vincularPacientePorCodigo } from "../../services/medicoPacienteService";

function NuevoPaciente() {

 const navigate = useNavigate();

  const [codigoPaciente, setCodigoPaciente] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const handleAgregarPaciente = async () => {
    try {
      setMensajeError("");

      const idUsuarioMedico = localStorage.getItem("idUsuario");

      const respuesta = await vincularPacientePorCodigo(idUsuarioMedico, codigoPaciente);

      if (!respuesta.success) {
        setMensajeError(respuesta.mensaje || "No se pudo vincular el paciente");
        return;
      }

      navigate(`/detalle-paciente/${respuesta.idPaciente}`);
    } catch (error) {
      console.error("Error al vincular paciente:", error);
      setMensajeError(
        error.response?.data?.mensaje || "No se pudo vincular el paciente"
      );
    }
  };


  return (
    <div className="nuevo-paciente-page">
      <aside className="nuevo-sidebar">
        <div className="nuevo-sidebar-logo">
          <img src={logo} alt="Logo Pills Here" className="nuevo-logo-img" />
        </div>

        <nav className="nuevo-sidebar-nav">
          <button className="nuevo-nav-item" type="button" onClick={() => navigate("/inicio-medico")}>
            <img src={iconHome} alt="Inicio" className="nuevo-nav-icon" />
            <span>Inicio</span>
          </button>

          <button className="nuevo-nav-item" type="button" onClick={() => navigate("/lista-pacientes")}>
            <img src={iconPacientes} alt="Pacientes" className="nuevo-nav-icon" />
            <span>Pacientes</span>
          </button>

          <button className="nuevo-nav-item active" type="button">
            <img src={iconAgregarPaciente} alt="Nuevo Paciente" className="nuevo-nav-icon" />
            <span>Nuevo Paciente</span>
          </button>
        </nav>

        <div className="nuevo-sidebar-bottom">
          <button className="nuevo-back-btn" type="button"  onClick={() => navigate("/inicio-medico")}>
            <img src={iconRegreso} alt="Regresar" />
          </button>
        </div>
      </aside>

      <main className="nuevo-paciente-content">
        <div className="nuevo-paciente-header">
          <h1>Agregar un nuevo paciente</h1>

          <div className="nuevo-header-icons">
            <button className="nuevo-btn-notificacion" type="button" aria-label="Notificaciones">
              <img src={iconNotificacion} alt="Notificaciones" />
            </button>

            <button className="nuevo-btn-perfil" type="button" aria-label="Perfil">
              <img src={iconPerfil} alt="Perfil" />
            </button>
          </div>
        </div>

        <section className="nuevo-paciente-panel">
          <label className="nuevo-paciente-label">Ingresar código de paciente</label>

          <input
            type="text"
            className="nuevo-paciente-input"
            value={codigoPaciente}
            onChange={(e) => setCodigoPaciente(e.target.value)}
          />

          {mensajeError && <p className="nuevo-paciente-error">{mensajeError}</p>}

          <button className="nuevo-paciente-btn" type="button" onClick={handleAgregarPaciente}>
            Agregar paciente
          </button>
        </section>
      </main>
    </div>
  );
}

export default NuevoPaciente;