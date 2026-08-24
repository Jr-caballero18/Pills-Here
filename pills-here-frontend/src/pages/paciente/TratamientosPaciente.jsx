import "./TratamientosPaciente.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerTratamientosActivosPaciente } from "../../services/tratamientoService";
import { obtenerNotificacionesPaciente } from "../../services/notificacionesService";

import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import iconTratamiento from "../../assets/images/icon-tratamiento.png";
import iconComentarioNotif from "../../assets/images/comentario-notificacion.png";
import iconRecordatorioNotif from "../../assets/images/recordatorionotificacion.png";
import NotificacionesPaciente from "../../components/NotificacionesPaciente/NotificacionesPaciente";
function TratamientosPaciente() {
  const navigate = useNavigate();

  const idPaciente = sessionStorage.getItem("idPaciente");
  const nombrePaciente = sessionStorage.getItem("nombre");

  const [tratamientos, setTratamientos] = useState([]);


  useEffect(() => {
    const cargarTratamientos = async () => {
      try {
        const data = await obtenerTratamientosActivosPaciente(idPaciente);
        setTratamientos(data);
      } catch (error) {
        console.error("Error al cargar tratamientos:", error);
      }
    };



    cargarTratamientos();
  }, [idPaciente]);



  return (
    <div className="tratamientos-paciente-page">

      <header className="tratamientos-paciente-header">

        <img
          src={logo}
          alt="Logo"
          className="tratamientos-paciente-logo"
        />

        <h1>Bienvenido {nombrePaciente}</h1>

        <div className="tratamientos-paciente-icons">

          <NotificacionesPaciente />

          <button type="button">
            <img
              src={iconPerfil}
              alt="Perfil"
              onClick={() =>
                navigate("/perfil-paciente")
              }
            />
          </button>

        </div>

      </header>

      <main className="tratamientos-paciente-content">
        <h2>Tratamientos Actuales</h2>

        <div className="tratamientos-paciente-lista">
          {tratamientos.map((tratamiento) => (
            <div className="tratamiento-paciente-card" key={tratamiento.idTratamiento}>
              <div className="tratamiento-paciente-icono">
                <img src={iconTratamiento} alt="Tratamiento" />
              </div>

              <div className="tratamiento-paciente-info">
                <h3>Tratamiento de {tratamiento.nombreTratamiento}</h3>
                <p>{tratamiento.diagnostico}</p>

                <span className="tratamiento-paciente-estado">
                  ● Activo
                </span>
              </div>

              <button
                className="tratamiento-paciente-ver-btn"
                type="button"
                onClick={() =>
                  navigate(`/tratamiento-paciente/${tratamiento.idTratamiento}`)
                }
              >
                Ver Tratamiento
              </button>
            </div>
          ))}
        </div>

        <button
          className="tratamientos-paciente-back"
          type="button"
          onClick={() => navigate("/inicio-paciente")}
        >
          <img src={iconRegreso} alt="Regresar" />
        </button>
      </main>
    </div>
  );
}

export default TratamientosPaciente;