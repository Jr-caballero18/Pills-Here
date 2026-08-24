import "./PerfilPaciente.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerHistorialPaciente } from "../../services/pacienteService";

import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import iconMail from "../../assets/images/icon-mail.png";
import iconCode from "../../assets/images/icon-code.png";
import iconNacimiento from "../../assets/images/icon-nacimiento.png";
import { obtenerNotificacionesPaciente } from "../../services/notificacionesService";
import iconComentarioNotif from "../../assets/images/comentario-notificacion.png";
import iconRecordatorioNotif from "../../assets/images/recordatorionotificacion.png";
import NotificacionesPaciente from "../../components/NotificacionesPaciente/NotificacionesPaciente";

function PerfilPaciente() {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    const cargarPaciente = async () => {
      try {
        const idPaciente = sessionStorage.getItem("idPaciente");
        const data = await obtenerHistorialPaciente(idPaciente);
        console.log("Perfil paciente:", data);
        sessionStorage.getItem("idPaciente")
        setPaciente(data);
      } catch (error) {
        console.error("Error al cargar perfil paciente:", error);
      }
    };

    cargarPaciente();
  }, []);



  const cerrarSesion = () => {
    sessionStorage.clear();
    navigate("/");
  };

  if (!paciente) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-paciente-page">
      <header className="perfil-paciente-header">

        <img
          src={logo}
          alt="Logo Pills Here"
          className="perfil-paciente-logo"
        />

        <h1>
          Perfil de Paciente: {paciente.nombreCompleto}.
        </h1>

        <div className="perfil-paciente-icons">

          <NotificacionesPaciente
            className="perfil-paciente-btn-notificacion"
          />

          <button type="button">
            <img
              src={iconPerfil}
              alt="Perfil"
            />
          </button>

        </div>

      </header>

      <main className="perfil-paciente-content">
        <section className="perfil-paciente-panel">
          <div className="perfil-paciente-avatar-box">
            <img src={iconPerfil} alt="Paciente" />
          </div>

          <div className="perfil-paciente-info">
            <h2>{paciente.nombreCompleto}</h2>

            <p>ID: #{paciente.idPaciente}</p>
            <p>Edad: {paciente.edad} años</p>
            <p>Sexo: {paciente.sexo}</p>

            <h3>Información de contacto:</h3>

            <div className="perfil-contacto-item">
              <img src={iconMail} alt="Correo" />
              <span>{paciente.correo || "Correo no registrado"}</span>
            </div>

            <div className="perfil-contacto-item">
              <img src={iconCode} alt="Código paciente" />
              <span>{paciente.codigoPaciente || "Código no registrado"}</span>
            </div>

            <div className="perfil-contacto-item">
              <img src={iconNacimiento} alt="Fecha de nacimiento" />
              <span>{paciente.fechaNacimiento || "Fecha no registrada"}</span>
            </div>

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
          onClick={() => navigate(-1)}
        >
          <img src={iconRegreso} alt="Regresar" />
        </button>
      </main>
    </div>
  );
}

export default PerfilPaciente;