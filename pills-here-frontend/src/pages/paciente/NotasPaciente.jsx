import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./NotasPaciente.css";

import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";

import iconNota from "../../assets/images/icon-not.png";
import iconDetalleNota from "../../assets/images/icon-detalles-not.png";

import { obtenerNotificacionesPaciente } from "../../services/notificacionesService";
import NotificacionesPaciente from "../../components/NotificacionesPaciente/NotificacionesPaciente";
import iconComentarioNotif from "../../assets/images/comentario-notificacion.png";
import iconRecordatorioNotif from "../../assets/images/recordatorionotificacion.png";

function NotasPaciente() {
    const navigate = useNavigate();

    const [avisos, setAvisos] = useState([]);
    const [avisoSeleccionado, setAvisoSeleccionado] = useState(null);


    useEffect(() => {
        const cargarAvisos = async () => {
            try {
                const idPaciente = localStorage.getItem("idPaciente");
                if (!idPaciente) return;

                const data = await obtenerNotificacionesPaciente(idPaciente);

                setAvisos(
                    data.filter(
                        (item) => item.tipo !== "MEDICAMENTO"
                    )
                );
            } catch (error) {
                console.error("Error al cargar avisos:", error);
            }
        };

        cargarAvisos();
    }, []);



    return (
        <div className="notas-paciente-page">
            <header className="notas-paciente-header">

                <div className="notas-paciente-header-left">

                    <img
                        src={logo}
                        alt="Logo Pills Here"
                        className="notas-paciente-logo"
                    />

                    <h1>Notas del Médico</h1>

                </div>

                <div className="notas-paciente-header-right">

                    <NotificacionesPaciente
                        className="notas-paciente-icon-btn"
                    />

                    <button
                        className="notas-paciente-profile-btn"
                        type="button"
                        onClick={() =>
                            navigate("/perfil-paciente")
                        }
                    >
                        <img
                            src={iconPerfil}
                            alt="Perfil"
                        />
                    </button>

                </div>

            </header>

            <main className="notas-paciente-main">
                <section className="notas-lista">
                    {avisos.length === 0 ? (
                        <p className="notas-vacio">No hay notas recientes.</p>
                    ) : (
                        avisos.map((aviso) => (
                            <article className="nota-card" key={aviso.id}>
                                <img src={iconNota} alt="Nota" className="nota-card-icon" />

                                <div className="nota-card-info">
                                    <h2>{aviso.titulo || "Aviso del médico"}</h2>
                                    <p>{aviso.contenido}</p>
                                </div>

                                <button
                                    className="nota-detalles-btn"
                                    type="button"
                                    onClick={() => setAvisoSeleccionado(aviso)}
                                >
                                    Ver detalles
                                </button>
                            </article>
                        ))
                    )}
                </section>

                {avisoSeleccionado && (
                    <aside className="nota-seleccionada">
                        <div className="nota-seleccionada-header">
                            <img src={iconDetalleNota} alt="Detalle" />
                            <h2>Nota Seleccionada</h2>
                        </div>

                        <div className="nota-seleccionada-content">
                            <p className="nota-fecha">
                                {avisoSeleccionado.fecha || "Fecha no disponible"}
                            </p>

                            <h3>{avisoSeleccionado.titulo || "Aviso del médico"}</h3>

                            <p className="nota-texto">{avisoSeleccionado.contenido}</p>

                            <div className="nota-medico">
                                <img src={iconPerfil} alt="Médico" />
                                <span>Dr. {avisoSeleccionado.nombreMedico}</span>
                            </div>

                            <h4>Observaciones</h4>

                            <ul>
                                <li>
                                    {avisoSeleccionado.observaciones ||
                                        "Sin observaciones registradas."}
                                </li>
                            </ul>
                        </div>
                    </aside>
                )}
            </main>

            <button
                className="notas-regresar-btn"
                type="button"
                onClick={() => navigate("/inicio-paciente")}
            >
                <img src={iconRegreso} alt="Regresar" />
            </button>
        </div>
    );
}

export default NotasPaciente;