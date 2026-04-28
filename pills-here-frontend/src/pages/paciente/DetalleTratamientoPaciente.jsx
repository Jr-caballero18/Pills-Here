import "./DetalleTratamientoPaciente.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerDetalleTratamiento } from "../../services/tratamientoService";

import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";

import iconTomada from "../../assets/images/icon-palomita.png";
import iconPendiente from "../../assets/images/icon-pendiente.png";
import iconNoTomada from "../../assets/images/icon-no-tomadas.png";

function DetalleTratamientoPaciente() {
    const navigate = useNavigate();
    const { idTratamiento } = useParams();

    const [tratamiento, setTratamiento] = useState(null);

    useEffect(() => {
        const cargarTratamiento = async () => {
            try {
                const data = await obtenerDetalleTratamiento(idTratamiento);
                setTratamiento(data);
            } catch (error) {
                console.error("Error al cargar tratamiento:", error);
            }
        };

        cargarTratamiento();
    }, [idTratamiento]);

    if (!tratamiento) {
        return <p>Cargando tratamiento...</p>;
    }

    return (
        <div className="detalle-tratamiento-paciente-page">
            <header className="detalle-tratamiento-paciente-header">
                <img src={logo} alt="Logo" className="detalle-tratamiento-paciente-logo" />

                <h1>Tratamiento de {tratamiento.nombreTratamiento || tratamiento.diagnostico}</h1>

                <div className="detalle-tratamiento-paciente-icons">
                    <button type="button">
                        <img src={iconNotificacion} alt="Notificaciones" />
                    </button>

                    <button type="button">
                        <img src={iconPerfil} alt="Perfil" />
                    </button>
                </div>
            </header>

            <main className="detalle-tratamiento-paciente-content">
                <section className="detalle-tratamiento-info">
                    <div className="detalle-tratamiento-avatar-box">
                        <img src={iconPerfil} alt="Paciente" />
                    </div>

                    <div className="detalle-tratamiento-datos">
                        <p>{tratamiento.paciente.nombreCompleto}</p>
                        <p>Edad: {tratamiento.paciente.edad} años.</p>
                        <p>Sexo: {tratamiento.paciente.sexo}.</p>
                    </div>

                    <div className="detalle-tratamiento-datos">
                        <p>Diagnostico: {tratamiento.diagnostico}</p>
                        <p>Medico: Dr. {tratamiento.nombreMedico}</p>
                        <p>Fecha de inicio: {tratamiento.fechaInicio}</p>
                    </div>
                </section>

                <section className="detalle-tratamiento-estado">
                    El tratamiento se encuentra a medio proceso. Cumplimiento 50%
                </section>

                <section className="detalle-tratamiento-resumen">
                    <p>Medicamentos:</p>
                    <ul>
                        {tratamiento.medicamentos.map((medicamento, index) => (
                            <li key={index}>
                                {medicamento.nombre}. {medicamento.dosis}
                            </li>
                        ))}
                    </ul>

                    <p>Recomendaciones:</p>
                    <div className="detalle-tratamiento-recomendaciones">
                        {tratamiento.notasMedicas || "Sin recomendaciones registradas."}
                    </div>
                </section>

                <h2 className="detalle-tratamiento-subtitulo">Cumplimiento de Medicación.</h2>

                <section className="detalle-tratamiento-grafica">
                    <div className="grafica-barras">
                        <div className="barra verde" style={{ height: "60px" }}></div>
                        <div className="barra amarilla" style={{ height: "35px" }}></div>
                        <div className="barra verde" style={{ height: "80px" }}></div>
                        <div className="barra roja" style={{ height: "25px" }}></div>
                        <div className="barra verde" style={{ height: "70px" }}></div>
                        <div className="barra amarilla" style={{ height: "55px" }}></div>
                    </div>

                    <div className="grafica-dias">
                        <span>5 Abril</span>
                        <span>6 Abril</span>
                        <span>7 Abril</span>
                        <span>8 Abril</span>
                        <span>9 Abril</span>
                        <span>10 Abril</span>
                    </div>
                </section>

                <div className="detalle-tratamiento-leyenda">
                    <div>
                        <img src={iconTomada} alt="Tomadas" />
                        <span>Tomadas</span>
                    </div>

                    <div>
                        <img src={iconPendiente} alt="Pendientes" />
                        <span>Pendientes</span>
                    </div>

                    <div>
                        <img src={iconNoTomada} alt="No tomadas" />
                        <span>No tomadas</span>
                    </div>
                </div>

                <div className="detalle-tratamiento-tabs">
                    <button type="button" className="tab-activa">
                        Pendientes <span>2</span>
                    </button>

                    <button type="button">
                        Omitidas <span>0</span>
                    </button>

                    <button type="button">
                        Tomadas <span>1</span>
                    </button>
                </div>

                <section className="detalle-tratamiento-registros">
                    <div className="registro-card">
                        <div className="registro-titulo">Omeprazol</div>

                        <div className="registro-cuerpo">
                            <div className="registro-hora">
                                <img src={iconPendiente} alt="Pendiente" />
                                <span>7:31 PM</span>
                            </div>

                            <div className="registro-dosis">
                                <p>1 toma</p>
                                <small>Diaramente cada 6 horas</small>
                            </div>

                            <button type="button">Marcar como tomada</button>
                        </div>
                    </div>

                    <div className="registro-card">
                        <div className="registro-titulo">Omeprazol</div>

                        <div className="registro-cuerpo">
                            <div className="registro-hora">
                                <img src={iconPendiente} alt="Pendiente" />
                                <span>7:31 PM</span>
                            </div>

                            <div className="registro-dosis">
                                <p>1-2 tomas</p>
                                <small>Diaramente cada 4 horas</small>
                            </div>

                            <button type="button">Marcar como tomada</button>
                        </div>
                    </div>

                    <div className="registro-card">
                        <div className="registro-titulo">Mota</div>

                        <div className="registro-cuerpo">
                            <div className="registro-hora">
                                <img src={iconTomada} alt="Tomada" />
                                <span>7:31 PM</span>
                            </div>

                            <div className="registro-dosis">
                                <p>25 Inhalaciones</p>
                                <small>Diaramente cada hora</small>
                            </div>

                            <button type="button" className="tomada">Tomada</button>
                        </div>
                    </div>
                </section>
                <button
                    className="detalle-tratamiento-back"
                    type="button"
                    onClick={() => navigate("/tratamientos-paciente")}
                >
                    <img src={iconRegreso} alt="Regresar" />
                </button>
            </main>
        </div>
    );
}

export default DetalleTratamientoPaciente;