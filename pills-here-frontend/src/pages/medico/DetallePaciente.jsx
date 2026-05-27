import "./DetallePaciente.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerDetallePaciente } from "../../services/medicoPacienteService";
import { obtenerTratamientoPorPaciente, cancelarTratamiento, agregarComentarioTratamiento } from "../../services/tratamientoService";
import iconEditar from "../../assets/images/editar-icon.png";
import iconBorrar from "../../assets/images/borrar-icon.png";
import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientes from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import { crearAviso } from "../../services/avisoService";
function DetallePaciente() {
  const navigate = useNavigate();
  const { idPaciente } = useParams();

  const [paciente, setPaciente] = useState(null);
  const [tratamiento, setTratamiento] = useState(null);
  const [comentario, setComentario] = useState("");
  const [tituloAviso, setTituloAviso] = useState("");
  const [contenidoAviso, setContenidoAviso] = useState("");
  const [observacionesAviso, setObservacionesAviso] = useState("");

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const data = await obtenerDetallePaciente(idPaciente);
        setPaciente(data);

        try {
          const tratamientoData = await obtenerTratamientoPorPaciente(idPaciente);
          setTratamiento(tratamientoData);
        } catch (error) {
          if (error.response?.status === 204) {
            setTratamiento(null);
          } else {
            console.error("Error al obtener tratamiento:", error);
          }
        }
      } catch (error) {
        console.error("Error al obtener detalle del paciente:", error);
      }
    };

    cargarDetalle();
  }, [idPaciente]);

  if (!paciente) {
    return <p>Cargando paciente...</p>;
  }

  const cancelarTratamientoPaciente = async () => {
    const confirmar = window.confirm("¿Seguro que deseas cancelar este tratamiento?");

    if (!confirmar) return;

    try {
      await cancelarTratamiento(tratamiento.idTratamiento);

      alert("Tratamiento cancelado correctamente");
      setTratamiento(null);
    } catch (error) {
      console.error("Error al cancelar tratamiento:", error);
      alert("Error al cancelar tratamiento");
    }
  };

  const guardarComentario = async () => {
    if (!comentario.trim()) {
      alert("Escribe un comentario");
      return;
    }

    try {
      await agregarComentarioTratamiento(tratamiento.idTratamiento, comentario);

      const tratamientoActualizado = await obtenerTratamientoPorPaciente(idPaciente);
      setTratamiento(tratamientoActualizado);

      alert("Comentario agregado correctamente");
      setComentario("");
    } catch (error) {
      console.error("Error al agregar comentario:", error);
      alert("Error al agregar comentario");
    }
  };

  const guardarAviso = async () => {
  if (!tituloAviso.trim() || !contenidoAviso.trim()) {
    alert("Escribe el título y el aviso");
    return;
  }

  try {
    const idMedico = localStorage.getItem("idMedico");

    await crearAviso({
      idMedico: Number(idMedico),
      idPaciente: Number(idPaciente),
      titulo: tituloAviso,
      contenido: contenidoAviso,
      observaciones: observacionesAviso,
    });

    alert("Aviso enviado correctamente");
    setTituloAviso("");
    setContenidoAviso("");
    setObservacionesAviso("");
  } catch (error) {
    console.error("Error al enviar aviso:", error);
    alert("Error al enviar aviso");
  }
};

  return (
    <div className="detalle-paciente-page">
      <aside className="detalle-sidebar">
        <div className="detalle-sidebar-logo">
          <img src={logo} alt="Logo Pills Here" className="detalle-logo-img" />
        </div>

        <nav className="detalle-sidebar-nav">
          <button className="detalle-nav-item" type="button" onClick={() => navigate("/inicio-medico")}>
            <img src={iconHome} alt="Inicio" className="detalle-nav-icon" />
            <span>Inicio</span>
          </button>

          <button className="detalle-nav-item active" type="button" onClick={() => navigate("/lista-pacientes")}>
            <img src={iconPacientes} alt="Pacientes" className="detalle-nav-icon" />
            <span>Pacientes</span>
          </button>

          <button className="detalle-nav-item" type="button" onClick={() => navigate("/nuevo-paciente")}>
            <img src={iconAgregarPaciente} alt="Nuevo Paciente" className="detalle-nav-icon" />
            <span>Nuevo Paciente</span>
          </button>
        </nav>

        <div className="detalle-sidebar-bottom">
          <button className="detalle-back-btn" type="button" onClick={() => navigate("/inicio-medico")}>
            <img src={iconRegreso} alt="Regresar" />
          </button>
        </div>
      </aside>

      <main className="detalle-paciente-content">
        <div className="detalle-paciente-header">
          <h1>Paciente: {paciente.nombreCompleto}</h1>

          <div className="detalle-header-icons">
            <button className="detalle-btn-notificacion" type="button" aria-label="Notificaciones">
              <img src={iconNotificacion} alt="Notificaciones" />
            </button>

            <button className="detalle-btn-perfil" type="button" aria-label="Perfil"
            onClick={() => navigate("/perfil-medico")}>
              <img src={iconPerfil} alt="Perfil" />
            </button>
          </div>
        </div>

        <section className="detalle-paciente-panel">
          <div className="detalle-avatar-wrapper">
            <img src={iconPerfil} alt="Paciente" className="detalle-avatar" />
          </div>

          <div className="detalle-info-box">
            <p>{paciente.nombreCompleto}</p>
            <p>Edad: {paciente.edad}</p>
            <p>Sexo: {paciente.sexo}</p>
            <p>Tipo de sangre: {paciente.tipoSangre || "No especificado"}</p>
          </div>

          {tratamiento ? (
            <>
              <div className="detalle-tratamiento-box">
                <span>Tratamiento</span>

                <div className="detalle-tratamiento-actions">
                  <button
                    className="detalle-tratamiento-icon-btn"
                    type="button"
                    onClick={() => navigate(`/editar-tratamiento/${tratamiento.idTratamiento}`)}
                  >
                    <img src={iconEditar} alt="Editar tratamiento" />
                  </button>

                  <button
                    className="detalle-tratamiento-icon-btn"
                    type="button"
                    onClick={cancelarTratamientoPaciente}
                  >
                    <img src={iconBorrar} alt="Cancelar tratamiento" />
                  </button>
                </div>
              </div>

              <textarea
                className="detalle-comentario-textarea"
                placeholder="Agregar comentario."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              ></textarea>

              <button className="detalle-agregar-btn" type="button" onClick={guardarComentario}>
                Agregar
              </button>
            </>
          ) : (
            <>
              <p className="detalle-sin-tratamiento">No hay tratamiento existente</p>

              <button
                className="detalle-crear-btn"
                type="button"
                onClick={() => navigate(`/crear-tratamiento/${idPaciente}`)}
              >
                Crear tratamiento
              </button>
            </>
          )}
        </section>

        <section className="detalle-avisos-panel">
          <h2>Avisos</h2>

          <input
            className="detalle-aviso-input"
            type="text"
            placeholder="Titulo."
            value={tituloAviso}
            onChange={(e) => setTituloAviso(e.target.value)}
          />

          <textarea
            className="detalle-aviso-textarea"
            placeholder="Agregar aviso."
            value={contenidoAviso}
            onChange={(e) => setContenidoAviso(e.target.value)}
          ></textarea>

          <textarea
            className="detalle-aviso-textarea"
            placeholder="Observaciones."
            value={observacionesAviso}
            onChange={(e) => setObservacionesAviso(e.target.value)}
          ></textarea>

          <button className="detalle-aviso-btn" type="button"  onClick={guardarAviso}>
            Agregar
          </button>
        </section>

      </main>
    </div>
  );
}

export default DetallePaciente;