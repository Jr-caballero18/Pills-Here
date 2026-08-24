import "./HistorialClinico.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerHistorialPaciente } from "../../services/tratamientoService"; import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientes from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import iconUsuario from "../../assets/images/icon-perfilP.png";
import iconVer from "../../assets/images/icon-ver.png";

function HistorialClinico() {
    const navigate = useNavigate();
    const { idPaciente } = useParams();

    const [paciente, setPaciente] = useState(null);
    const [historial, setHistorial] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("TODOS");

    useEffect(() => {
        const cargarHistorial = async () => {
            try {
                setCargando(true);
                setError("");

                const data = await obtenerHistorialPaciente(idPaciente);

                console.log("RESPUESTA COMPLETA:", data);
                console.log("HISTORIAL:", data.historial);

                setPaciente(data);
                setHistorial(data.historial || []);
            } catch (err) {
                console.error("Error al cargar historial del paciente:", err);
                setError("No se pudo cargar la información del paciente.");
            } finally {
                setCargando(false);
            }
        };

        if (idPaciente) {
            cargarHistorial();
        }
    }, [idPaciente]);

    const historialFiltrado = historial.filter((item) => {
        if (filtroEstado === "TODOS") {
            return true;
        }

        return item.estado?.toUpperCase() === filtroEstado;
    });

    if (cargando) {
        return <div className="historial-loading">Cargando historial...</div>;
    }

    if (error) {
        return <div className="historial-error">{error}</div>;
    }

    if (!paciente) {
        return <div className="historial-error">No se encontró el paciente.</div>;
    }

    return (
        <div className="inicio-medico-page">
            <aside className="historial-sidebar">
                <div className="logo-container">
                    <img src={logo} alt="Pills Here" className="logo-img" />
                </div>

                <nav className="sidebar-nav">
                    <button className="nav-item" onClick={() => navigate("/inicio-medico")}>
                        <img src={iconHome} alt="Inicio" className="nav-icon" />
                        <span>Inicio</span>
                    </button>

                    <button className="nav-item active" onClick={() => navigate("/lista-pacientes")}>
                        <img src={iconPacientes} alt="Pacientes" className="nav-icon" />
                        <span>Pacientes</span>
                    </button>

                    <button className="nav-item" onClick={() => navigate("/nuevo-paciente")}>
                        <img src={iconAgregarPaciente} alt="Nuevo Paciente" className="nav-icon" />
                        <span>Nuevo Paciente</span>
                    </button>
                </nav>

                <div className="historial-sidebar-bottom">
                    <img
                        src={iconRegreso}
                        alt="Regresar"
                        className="historial-back-icon"
                        onClick={() => navigate("/inicio-medico")}
                    />
                </div>
            </aside>



            <main className="contenido-medico">
                <div className="encabezado-superior">
                    <h1>Historial Clínico de: {paciente.nombreCompleto}</h1>

                    <div className="acciones-superiores">

                        <button className="btn-perfil"
                            onClick={() => navigate("/perfil-medico")}>
                            <img src={iconPerfil} alt="Perfil" width="28" />
                        </button>
                    </div>
                </div>

                <section className="historial-info">
                    <img src={iconUsuario} alt="Usuario" className="historial-avatar" />

                    <div className="historial-datos">
                        <p><strong>Nombre:</strong> {paciente.nombreCompleto}</p>
                        <p><strong>Código:</strong> {paciente.codigoPaciente}</p>
                        <p><strong>Fecha de nacimiento:</strong> {paciente.fechaNacimiento}</p>
                    </div>
                    <div className="historial-datos">
                        <p><strong>Sexo:</strong> {paciente.sexo}</p>
                        <p><strong>Tipo de sangre:</strong> {paciente.tipoSangre || "No especificado"}</p>
                        <p><strong>Alergias:</strong> {paciente.alergias || "Ninguna"}</p>
                    </div>
                </section>

                <section className="historial-tabla">

                    <div className="tabla-head historial-head">
                        <span>Fecha</span>
                        <span>Diagnóstico</span>
                        <span>Médico</span>
                        <span>Estado</span>

                        <span className="historial-filtro-contenedor">
                            <select
                                className="historial-filtro"
                                value={filtroEstado}
                                onChange={(e) => setFiltroEstado(e.target.value)}
                            >
                                <option value="TODOS" disabled hidden>
                                    Filtrar
                                </option>

                                <option value="ACTIVO">Activos</option>
                                <option value="FINALIZADO">Finalizados</option>
                                <option value="CANCELADO">Cancelados</option>
                            </select>
                        </span>
                    </div>

                    {historialFiltrado.map((item, index) => (
                        <div key={index} className="tabla-row historial-row">

                            <span>{item.fecha}</span>

                            <span>{item.diagnostico}</span>

                            <span>{item.medico}</span>

                            <span>
                                <span
                                    className={`estado-badge ${item.estado?.toUpperCase() === "ACTIVO"
                                        ? "estado-activo"
                                        : item.estado?.toUpperCase() === "CANCELADO"
                                            ? "estado-cancelado"
                                            : "estado-finalizado"
                                        }`}
                                >
                                    ● {item.estado}
                                </span>
                            </span>

                            <span className="historial-ver-contenedor">
                                <button
                                    type="button"
                                    className="historial-btn-ver"
                                    onClick={() =>
                                        navigate(`/editar-tratamiento/${item.idTratamiento}`)
                                    }
                                    title="Ver tratamiento"
                                >
                                    <img
                                        src={iconVer}
                                        alt="Ver tratamiento"
                                        className="historial-icon-ver"
                                    />
                                </button>
                            </span>

                        </div>
                    ))}

                    {historialFiltrado.length === 0 && (
                        <div className="historial-sin-resultados">
                            No hay tratamientos con este estado.
                        </div>
                    )}

                </section>

            </main>
        </div>
    );
}

export default HistorialClinico;