import "./ListaPacientes.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientes from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconVer from "../../assets/images/icon-ver.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import {
  obtenerPacientesDelMedico,
  registrarConsultaPaciente
} from "../../services/medicoPacienteService";

function ListaPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        const idUsuario = localStorage.getItem("idUsuario");
        const data = await obtenerPacientesDelMedico(idUsuario);
        setPacientes(data);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      }
    };

    cargarPacientes();
  }, []);

  const irADetallePaciente = async (idPaciente) => {
    try {
      const idUsuario = localStorage.getItem("idUsuario");
      await registrarConsultaPaciente(idUsuario, idPaciente);
      navigate(`/detalle-paciente/${idPaciente}`);
    } catch (error) {
      console.error("Error al registrar consulta:", error);
    }
  };

  return (
    <div className="lista-pacientes-page">
      <aside className="lista-sidebar">
        <div className="lista-sidebar-logo">
          <img src={logo} alt="Logo Pills Here" className="lista-logo-img" />
        </div>

        <nav className="lista-sidebar-nav">
          <button className="lista-nav-item" type="button" onClick={() => navigate("/inicio-medico")}>
            <img src={iconHome} alt="Inicio" className="lista-nav-icon" />
            <span>Inicio</span>
          </button>

          <button className="lista-nav-item active" type="button" onClick={() => navigate("/lista-pacientes")}>
            <img src={iconPacientes} alt="Pacientes" className="lista-nav-icon" />
            <span>Pacientes</span>
          </button>

          <button className="lista-nav-item" type="button" onClick={() => navigate("/nuevo-paciente")}>
            <img src={iconAgregarPaciente} alt="Nuevo Paciente" className="lista-nav-icon" />
            <span>Nuevo Paciente</span>
          </button>
        </nav>

        <div className="lista-sidebar-bottom">
          <button className="lista-back-btn" type="button" onClick={() => navigate("/inicio-medico")}>
            <img src={iconRegreso} alt="Regresar" />
          </button>
        </div>
      </aside>

      <main className="lista-pacientes-content">
        <div className="lista-pacientes-header">
          <h1>Pacientes Actuales</h1>

          <div className="lista-header-icons">
            <button className="lista-btn-notificacion" type="button" aria-label="Notificaciones">
              <img src={iconNotificacion} alt="Notificaciones" />
            </button>

            <button className="lista-btn-perfil" type="button" aria-label="Perfil">
              <img src={iconPerfil} alt="Perfil" />
            </button>
          </div>
        </div>

        <section className="lista-panel">
          <div className="lista-panel-header">
            <h2>Lista de pacientes</h2>

            <div className="lista-search-box">
              <input type="text" />
              <span>⌕</span>
            </div>
          </div>

          <div className="lista-tabla-wrapper">
            <div className="lista-tabla-head">
              <span>Nombre</span>
              <span>Edad / sexo</span>
              <span>Historial</span>
            </div>

            {pacientes.map((paciente) => (
              <div key={paciente.idPaciente} className="lista-tabla-row">
                <button
                  className="lista-nombre-btn"
                  type="button"
                  onClick={() => irADetallePaciente(paciente.idPaciente)}
                >
                  {paciente.nombre}
                </button>

                <span>{paciente.edadSexo}</span>

                <span className="lista-historial-col">
                  <button
                    className="lista-btn-ver"
                    type="button"
                    onClick={() => navigate(`/historial-clinico/${paciente.idPaciente}`)}
                  >
                    <img src={iconVer} alt="Ver historial" />
                  </button>
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ListaPacientes;