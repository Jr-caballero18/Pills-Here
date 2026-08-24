import "./DetallePaciente.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerDetallePaciente } from "../../services/medicoPacienteService";
import {
  obtenerTratamientoPorPaciente, cancelarTratamiento, agregarComentarioTratamiento, obtenerEstadisticasGeneralesPaciente,
} from "../../services/tratamientoService";
import iconEditar from "../../assets/images/editar-icon.png";
import iconBorrar from "../../assets/images/borrar-icon.png";
import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientes from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import { crearAviso } from "../../services/avisoService";
import iconTratamiento from "../../assets/images/icon-tratamiento.png";
import iconSinTratamientos from "../../assets/images/icon-sin-tratamientos.png";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Swal from "sweetalert2";

function DetallePaciente() {
  const navigate = useNavigate();
  const { idPaciente } = useParams();

  const [paciente, setPaciente] = useState(null);
  const [tratamientos, setTratamientos] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [tituloAviso, setTituloAviso] = useState("");
  const [contenidoAviso, setContenidoAviso] = useState("");
  const [observacionesAviso, setObservacionesAviso] = useState("");
  const [estadisticasGenerales, setEstadisticasGenerales] = useState({
    tomadas: 0,
    pendientes: 0,
    omitidas: 0,
    porcentajeCumplimiento: 0,
  });

  const [cargandoEstadisticas, setCargandoEstadisticas] = useState(true);

  const datosLeyenda = [
    {
      nombre: "Tomadas",
      valor: estadisticasGenerales.tomadas,
      color: "#6fcf97",
    },
    {
      nombre: "Pendientes",
      valor: estadisticasGenerales.pendientes,
      color: "#f2a65a",
    },
    {
      nombre: "Omitidas",
      valor: estadisticasGenerales.omitidas,
      color: "#eb5757",
    },
  ];

  const datosGrafica = datosLeyenda.filter(
    (dato) => dato.valor > 0
  );

  const totalTomas =
    estadisticasGenerales.tomadas +
    estadisticasGenerales.pendientes +
    estadisticasGenerales.omitidas;

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

        const estadisticasData =
          await obtenerEstadisticasGeneralesPaciente(idPaciente);

        setEstadisticasGenerales({
          tomadas: estadisticasData.tomadas || 0,
          pendientes: estadisticasData.pendientes || 0,
          omitidas: estadisticasData.omitidas || 0,
          porcentajeCumplimiento:
            estadisticasData.porcentajeCumplimiento || 0,
        });

        setCargandoEstadisticas(false);


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
    const resultado = await Swal.fire({
      icon: "warning",
      title: "¿Cancelar tratamiento?",
      text: "Esta acción cancelará el tratamiento seleccionado.",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
      confirmButtonColor: "#c0392b",
      cancelButtonColor: "#173f6c",
    });

    if (!resultado.isConfirmed) return;

    try {

      await cancelarTratamiento(idTratamiento);

      Swal.fire({
        icon: "success",
        title: "Tratamiento cancelado",
        text: "El tratamiento fue cancelado correctamente.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#173f6c",
      });
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
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        text: "Escribe el título y el contenido del aviso.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#173f6c",
      });
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

      Swal.fire({
        icon: "success",
        title: "Aviso enviado",
        text: "El aviso se envió correctamente al paciente.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#173f6c",
      });
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

            <button className="detalle-btn-perfil" type="button" aria-label="Perfil"
              onClick={() => navigate("/perfil-medico")}>
              <img src={iconPerfil} alt="Perfil" />
            </button>
          </div>
        </div>

        <div className="detalle-layout">

          <div className="detalle-columna-izquierda">

            <section className="detalle-paciente-panel">
              <div className="detalle-avatar-wrapper">
                <img
                  src={iconPerfil}
                  alt="Paciente"
                  className="detalle-avatar"
                />
              </div>

              <div className="detalle-info-box">
                <p>{paciente.nombreCompleto}</p>
                <p>Edad: {paciente.edad}</p>
                <p>Sexo: {paciente.sexo}</p>
                <p>
                  Tipo de sangre:{" "}
                  {paciente.tipoSangre || "No especificado"}
                </p>
              </div>
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

              <button
                className="detalle-aviso-btn"
                type="button"
                onClick={guardarAviso}
              >
                Agregar
              </button>
            </section>

          </div>

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

          <aside className="detalle-estadisticas-panel">

            <div className="detalle-estadisticas-header">
              <span className="detalle-estadisticas-icono">📊</span>
              <h2>Estadística General</h2>
            </div>

            <div className="detalle-estadisticas-contenido">

              <div className="detalle-estadisticas-grafica">
                {cargandoEstadisticas ? (
                  <span>Cargando...</span>
                ) : totalTomas === 0 ? (
                  <div className="detalle-grafica-placeholder">
                    <span>Sin datos</span>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={290}>
                    <PieChart>
                      <Pie
                        data={datosGrafica}
                        dataKey="valor"
                        nameKey="nombre"
                        cx="50%"
                        cy="50%"
                        outerRadius={125}
                        stroke="#222222"
                        strokeWidth={2}
                        label={({ percent }) =>
                          `${Math.round(percent * 100)}%`
                        }
                        labelLine={false}
                      >
                        {datosGrafica.map((dato) => (
                          <Cell
                            key={dato.nombre}
                            fill={dato.color}
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        formatter={(valor, nombre) => [
                          valor,
                          nombre,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="detalle-estadisticas-separador"></div>

              <div className="detalle-estadisticas-leyenda">

                <div className="detalle-leyenda-item">
                  <span className="detalle-leyenda-color tomadas"></span>
                  <span>Tomadas:</span>
                  <strong>{estadisticasGenerales.tomadas}</strong>
                </div>

                <div className="detalle-leyenda-item">
                  <span className="detalle-leyenda-color pendientes"></span>
                  <span>Pendientes:</span>
                  <strong>{estadisticasGenerales.pendientes}</strong>
                </div>

                <div className="detalle-leyenda-item">
                  <span className="detalle-leyenda-color omitidas"></span>
                  <span>Omitidas:</span>
                  <strong>{estadisticasGenerales.omitidas}</strong>
                </div>

              </div>

              <div className="detalle-estadisticas-separador"></div>

              <div className="detalle-estadisticas-footer">
                <strong>
                  Cumplimiento:{" "}
                  {cargandoEstadisticas
                    ? "--"
                    : `${Math.round(
                      estadisticasGenerales.porcentajeCumplimiento
                    )}%`}
                </strong>
              </div>

            </div>

          </aside>

        </div>

      </main>
    </div>
  );
}

export default DetallePaciente;