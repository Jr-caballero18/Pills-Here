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
import iconTratamiento from "../../assets/images/icon-tratamiento.png";
import iconSinTratamientos from "../../assets/images/icon-sin-tratamientos.png";

function DetallePaciente() {
  const navigate = useNavigate();
  const { idPaciente } = useParams();

  const [paciente, setPaciente] = useState(null);
  const [tratamientos, setTratamientos] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [tituloAviso, setTituloAviso] = useState("");
  const [contenidoAviso, setContenidoAviso] = useState("");
  const [observacionesAviso, setObservacionesAviso] = useState("");

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const data = await obtenerDetallePaciente(idPaciente);
        setPaciente(data);

        const tratamientoData = await obtenerTratamientoPorPaciente(idPaciente);

        if (Array.isArray(tratamientoData)) {
          setTratamientos(tratamientoData);
        } else if (tratamientoData) {
          setTratamientos([tratamientoData]);
        } else {
          setTratamientos([]);
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

  const cancelarTratamientoPaciente = async (idTratamiento) => {
    const confirmar = window.confirm("¿Seguro que deseas cancelar este tratamiento?");

    if (!confirmar) return;

    try {

      await cancelarTratamiento(idTratamiento);

      alert("Tratamiento cancelado correctamente");

      setTratamientos((prev) =>
        prev.filter((tratamiento) => tratamiento.idTratamiento !== idTratamiento)
      );

    } catch (error) {
      console.error("Error al cancelar tratamiento:", error);
      alert("Error al cancelar tratamiento");
    }
  };

  const guardarComentario = async (idTratamiento) => {
    const comentario = comentarios[idTratamiento] || "";
    if (!comentario.trim()) {
      alert("Escribe un comentario");
      return;
    }

    try {
      await agregarComentarioTratamiento(idTratamiento, comentario);

      alert("Comentario agregado correctamente");
      setComentarios((prev) => ({
        ...prev,
        [idTratamiento]: "",
      }));
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

        <div className="detalle-layout">

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

          </section>

          <section className="detalle-tratamientos-panel">
            {tratamientos.length === 0 ? (
              <div className="detalle-sin-tratamientos-card">
                <div className="detalle-sin-tratamientos-icon">
                  <img
                    src={iconSinTratamientos}
                    alt="Sin tratamientos"
                    className="detalle-sin-tratamientos-img"
                  />
                </div>

                <h2>Este paciente aún no tiene tratamientos</h2>

                <p>
                  Crea un tratamiento para registrar el diagnóstico,
                  medicamentos y recomendaciones.
                </p>

                <button
                  className="detalle-crear-btn"
                  type="button"
                  onClick={() => navigate(`/crear-tratamiento/${idPaciente}`)}
                >
                  + Crear tratamiento
                </button>
              </div>
            ) : (
              <>
                <div className="detalle-tratamientos-header">
                  <h2>Tratamientos del paciente</h2>

                  <button
                    className="detalle-nuevo-tratamiento-btn"
                    type="button"
                    onClick={() => navigate(`/crear-tratamiento/${idPaciente}`)}
                  >
                    + Nuevo tratamiento
                  </button>
                </div>

                <div className="detalle-tratamientos-lista">
                  {tratamientos.map((tratamiento, index) => (
                    <div className="medico-tratamiento-card" key={tratamiento.idTratamiento}>
                      <div className="medico-tratamiento-icono">
                        <img src={iconTratamiento} alt="Tratamiento" />
                      </div>

                      <div className="medico-tratamiento-info">
                        <h3>Tratamiento de {tratamiento.nombreTratamiento}</h3>
                        <p>{tratamiento.diagnostico}</p>

                        <span className="medico-tratamiento-estado">
                          ● Activo
                        </span>
                      </div>

                      <div className="medico-tratamiento-opciones">
                  

                        <div className="medico-tratamiento-actions">
                          <button
                            className="medico-tratamiento-icon-btn"
                            type="button"
                            onClick={() => navigate(`/editar-tratamiento/${tratamiento.idTratamiento}`)}
                          >
                            <img src={iconEditar} alt="Editar tratamiento" />
                          </button>

                          <button
                            className="medico-tratamiento-icon-btn"
                            type="button"
                            onClick={() => cancelarTratamientoPaciente(tratamiento.idTratamiento)}
                          >
                            <img src={iconBorrar} alt="Eliminar tratamiento" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

            <button className="detalle-aviso-btn" type="button" onClick={guardarAviso}>
              Agregar
            </button>
          </section>

        </div>

      </main>
    </div>
  );
}

export default DetallePaciente;