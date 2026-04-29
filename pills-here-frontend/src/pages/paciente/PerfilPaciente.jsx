import "./PerfilPaciente.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerDashboardPaciente } from "../../services/pacienteService";

import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";

function PerfilPaciente() {
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    const cargarPaciente = async () => {
      try {
        const idUsuario = localStorage.getItem("idUsuario");
        const data = await obtenerDashboardPaciente(idUsuario);
        setPaciente(data);
      } catch (error) {
        console.error("Error al cargar perfil paciente:", error);
      }
    };

    cargarPaciente();
  }, []);

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!paciente) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-paciente-page">
      <header className="perfil-paciente-header">
        <img src={logo} alt="Logo Pills Here" className="perfil-paciente-logo" />

        <h1>Perfil de Paciente: {paciente.nombre}.</h1>

        <div className="perfil-paciente-icons">
          <button type="button">
            <img src={iconNotificacion} alt="Notificaciones" />
          </button>

          <button type="button">
            <img src={iconPerfil} alt="Perfil" />
          </button>
        </div>
      </header>

      <main className="perfil-paciente-content">
        <section className="perfil-paciente-panel">
          <div className="perfil-paciente-avatar-box">
            <img src={iconPerfil} alt="Paciente" />
          </div>

          <div className="perfil-paciente-info">
            <h2>{paciente.nombre}</h2>

            <p>ID: #{paciente.idPaciente || paciente.idUsuario}</p>
            <p>Edad: {paciente.edad || "No especificada"} años</p>
            <p>Sexo: {paciente.sexo || "No especificado"}</p>

            <h3>Información de contacto:</h3>

            <p>✉️ {paciente.correo || "Correo no registrado"}</p>
            <p>📞 {paciente.telefono || "Teléfono no registrado"}</p>
            <p>📍 {paciente.direccion || "Dirección no registrada"}</p>

            <div className="perfil-paciente-linea"></div>

            <button
              className="perfil-paciente-cerrar-btn"
              type="button"
              onClick={cerrarSesion}
            >
              Cerrar sesion
            </button>
          </div>
        </section>

        <button
          className="perfil-paciente-back"
          type="button"
          onClick={() => navigate("/inicio-paciente")}
        >
          <img src={iconRegreso} alt="Regresar" />
        </button>
      </main>
    </div>
  );
}

export default PerfilPaciente;