import "./DetalleTratamientoPaciente.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerDetalleTratamiento } from "../../services/tratamientoService";
import { iniciarTratamientoPaciente, marcarDosisComoTomada, obtenerTomasTratamiento, obtenerEstadisticasTratamiento } from "../../services/tratamientoService";
import { obtenerNotificacionesPaciente } from "../../services/notificacionesService";
import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";

import iconTomada from "../../assets/images/icon-palomita.png";
import iconPendiente from "../../assets/images/icon-pendiente.png";
import iconNoTomada from "../../assets/images/icon-no-tomadas.png";
import iconHorarios from "../../assets/images/icon-horarios.png";
import iconHorarioSelect from "../../assets/images/icon-horario-select.png";
import iconComentarioNotif from "../../assets/images/comentario-notificacion.png";
import iconRecordatorioNotif from "../../assets/images/recordatorionotificacion.png";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function DetalleTratamientoPaciente() {
    const navigate = useNavigate();
    const { idTratamiento } = useParams();

    const [tratamiento, setTratamiento] = useState(null);
    const [tratamientoIniciado, setTratamientoIniciado] = useState(false);
    const [medicamentoAbierto, setMedicamentoAbierto] = useState(null);
    const [tabActiva, setTabActiva] = useState("PENDIENTES");
    const [horariosSeleccionados, setHorariosSeleccionados] = useState({});
    const [registrosMedicacion, setRegistrosMedicacion] = useState([]);
    const [estadisticas, setEstadisticas] = useState([]);
    const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
    const [notificaciones, setNotificaciones] = useState([]);
    const notificacionesRef = useRef(null);
    const [tomaProcesando, setTomaProcesando] = useState(null);

    useEffect(() => {
        const cargarTratamiento = async () => {
            try {
                const data = await obtenerDetalleTratamiento(idTratamiento);
                setTratamiento(data);

                const tomas = await obtenerTomasTratamiento(idTratamiento);

                const estadisticasData = await obtenerEstadisticasTratamiento(idTratamiento);
                setEstadisticas(estadisticasData);

                if (tomas.length > 0) {
                    setRegistrosMedicacion(tomas);
                    setTratamientoIniciado(true);
                } else {
                    setRegistrosMedicacion([]);
                    setTratamientoIniciado(false);
                }
            } catch (error) {
                console.error("Error al cargar tratamiento:", error);
            }
        };

        const cargarNotificaciones = async () => {
            try {
                const idPaciente = localStorage.getItem("idPaciente");
                if (!idPaciente) return;

                const data = await obtenerNotificacionesPaciente(idPaciente);
                setNotificaciones(data);
            } catch (error) {
                console.error("Error al cargar notificaciones:", error);
            }
        };

        cargarTratamiento();
        cargarNotificaciones();

    }, [idTratamiento]);

    useEffect(() => {
        const cerrarAlDarClickFuera = (e) => {
            if (
                notificacionesRef.current &&
                !notificacionesRef.current.contains(e.target)
            ) {
                setMostrarNotificaciones(false);
            }
        };

        document.addEventListener("mousedown", cerrarAlDarClickFuera);

        return () => {
            document.removeEventListener("mousedown", cerrarAlDarClickFuera);
        };
    }, []);

    if (!tratamiento) {
        return <p>Cargando tratamiento...</p>;
    }

    const generarHorarios = (intervaloHoras) => {
        const horasInicio = [5, 6, 7];

        return horasInicio.map((horaInicio) => {
            const horarios = [];
            let hora = horaInicio;

            for (let i = 0; i < 4; i++) {
                horarios.push(
                    new Date(2026, 0, 1, hora, 0).toLocaleTimeString("es-MX", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })
                );

                hora += intervaloHoras;
            }

            return horarios;
        });
    };

    const confirmarHorarios = async () => {
        try {

            if (
                Object.keys(horariosSeleccionados).length !==
                tratamiento.medicamentos.length
            ) {
                alert("Selecciona un horario para todos los medicamentos");
                return;
            }

            const horarios = tratamiento.medicamentos.map((medicamento) => {

                const indiceSeleccionado =
                    horariosSeleccionados[medicamento.idDosis];

                const grupoHorario =
                    generarHorarios(medicamento.intervaloHoras)[indiceSeleccionado];

                const primeraHora = grupoHorario[0];

                const hora24 = convertirHoraA24(primeraHora);

                return {
                    idDosis: medicamento.idDosis,
                    horaInicioPaciente: hora24,
                };
            });

            console.log("Horarios enviados:", JSON.stringify(horarios, null, 2));
            await iniciarTratamientoPaciente(horarios);

            const tomas = await obtenerTomasTratamiento(idTratamiento);

            setRegistrosMedicacion(tomas);

            const estadisticasData = await obtenerEstadisticasTratamiento(idTratamiento);
            setEstadisticas(estadisticasData);
            setMedicamentoAbierto(null);
            setTratamientoIniciado(true);

        } catch (error) {
            console.error(error);
            alert("Error al iniciar tratamiento");
        }
    };

    const convertirHoraA24 = (horaTexto) => {

        const [horaParte, periodo] =
            horaTexto.replace(/\./g, "").split(" ");

        let [hora, minutos] =
            horaParte.split(":").map(Number);

        if (periodo.toLowerCase() === "pm" && hora !== 12) {
            hora += 12;
        }

        if (periodo.toLowerCase() === "am" && hora === 12) {
            hora = 0;
        }

        return `${String(hora).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:00`;
    };

    const marcarComoTomada = async (idDosis) => {

        if (tomaProcesando !== null) {
            return;
        }

        try {
            setTomaProcesando(idDosis);

            await marcarDosisComoTomada(idDosis);

            const [tomasActualizadas, estadisticasActualizadas] =
                await Promise.all([
                    obtenerTomasTratamiento(idTratamiento),
                    obtenerEstadisticasTratamiento(idTratamiento)
                ]);

            setRegistrosMedicacion(tomasActualizadas);
            setEstadisticas(estadisticasActualizadas);

        } catch (error) {
            console.error("Error al marcar dosis como tomada:", error);
            alert("Error al marcar dosis como tomada");
        } finally {
            setTomaProcesando(null);
        }
    };


    return (
        <div className="detalle-tratamiento-paciente-page">
            <header className="detalle-tratamiento-paciente-header">
                <img src={logo} alt="Logo" className="detalle-tratamiento-paciente-logo" />

                <h1>Tratamiento de {tratamiento.nombreTratamiento || tratamiento.diagnostico}</h1>

                <div className="detalle-tratamiento-paciente-icons" ref={notificacionesRef}>
                    <button
                        className="detalle-tratamiento-paciente-btn-notificacion"
                        type="button"
                        onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}
                    >
                        <img src={iconNotificacion} alt="Notificaciones" />
                    </button>

                    {mostrarNotificaciones && (
                        <div className="paciente-notificaciones-panel" ref={notificacionesRef}>
                            <div className="notificaciones-flecha"></div>

                            <div className="notificaciones-header">
                                <img src={iconNotificacion} alt="Notificaciones" />
                                <h2>Notificaciones</h2>
                            </div>
                            <div className="notificaciones-lista">
                                {notificaciones.length === 0 ? (
                                    <div className="notificacion-vacia">
                                        No tienes notificaciones nuevas.
                                    </div>
                                ) : (
                                    notificaciones.map((notificacion) => {
                                        const esMedicamento = notificacion.tipo === "MEDICAMENTO";
                                        const esComentario = notificacion.tipo === "COMENTARIO";

                                        return (
                                            <div
                                                className={`notificacion-card ${esMedicamento ? "notificacion-medicamento" : "notificacion-comentario"
                                                    }`}
                                                key={`${notificacion.tipo}-${notificacion.id}`}
                                            >
                                                <div className="notificacion-icono">
                                                    <img
                                                        src={esMedicamento ? iconRecordatorioNotif : iconComentarioNotif}
                                                        alt="Tipo de notificación"
                                                    />
                                                </div>

                                                <div className="notificacion-contenido">
                                                    <div className="notificacion-titulo">
                                                        <span className="notificacion-punto"></span>

                                                        <strong>
                                                            {esMedicamento
                                                                ? notificacion.titulo
                                                                : `Dr. ${notificacion.nombreMedico} ha dejado un nuevo ${esComentario ? "comentario" : "aviso"
                                                                }.`}
                                                        </strong>
                                                    </div>

                                                    <p>{notificacion.contenido}</p>

                                                    <div className="notificacion-footer">
                                                        <span>Hace 10 min</span>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (esMedicamento) {
                                                                    navigate("/tratamientos-paciente");
                                                                }
                                                            }}
                                                        >
                                                            Ver {esMedicamento ? "dosis" : esComentario ? "comentario" : "aviso"} &gt;
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}

                    <button type="button">
                        <img src={iconPerfil} alt="Perfil" onClick={() => navigate("/perfil-paciente")} />
                    </button>
                </div>
            </header>

            <main className="detalle-tratamiento-paciente-content" onClick={() => setMedicamentoAbierto(null)}
            >
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

                <section className="editar-tratamiento-estado-box">
                    El tratamiento se encuentra en estado: {tratamiento.estado}.
                    Cumplimiento {tratamiento.porcentajeCumplimiento ?? 0}%
                </section>

                <section className="detalle-tratamiento-resumen">
                    <p>Medicamentos:</p>
                    <ul>
                        {tratamiento.medicamentos.map((medicamento, index) => (
                            <li key={index}>
                                {medicamento.nombre}. {medicamento.dosis} cada {medicamento.intervaloHoras} horas por {medicamento.duracionDias} dias
                            </li>
                        ))}
                    </ul>

                    <p>Recomendaciones:</p>
                    <div className="detalle-tratamiento-recomendaciones">
                        {tratamiento.notasMedicas || "Sin recomendaciones registradas."}
                    </div>
                </section>

                <h2 className="detalle-tratamiento-subtitulo">Cumplimiento de Medicación.</h2>

                <section className="detalle-tratamiento-grafica-recharts">
                    {estadisticas.length === 0 ? (
                        <p className="grafica-sin-datos">
                            Aún no hay datos de medicación para graficar.
                        </p>
                    ) : (
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={estadisticas}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="fecha" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="tomadas" stackId="a" fill="#86c98b" name="Tomadas" />
                                <Bar dataKey="pendientes" stackId="a" fill="#f5df61" name="Pendientes" />
                                <Bar dataKey="omitidas" stackId="a" fill="#ec6464" name="No tomadas" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
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

                {!tratamientoIniciado ? (
                    <section className="detalle-tratamiento-iniciar-box"
                        onClick={() => setMedicamentoAbierto(null)}>
                        {tratamiento.medicamentos.map((medicamento, index) => (

                            <div className="medicamento-iniciar-card" key={index} onClick={(e) => e.stopPropagation()}
                            >
                                <div className="medicamento-iniciar-titulo">
                                    {medicamento.nombre}
                                </div>

                                <div className="medicamento-iniciar-cuerpo">
                                    <div>
                                        <p>{medicamento.dosis}</p>
                                        <small>
                                            Cada {medicamento.intervaloHoras} horas por {medicamento.duracionDias} dias
                                        </small>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setMedicamentoAbierto(index)}
                                    >
                                        Iniciar Tratamiento
                                    </button>
                                </div>

                                {medicamentoAbierto === index && (
                                    <div className="horarios-popup">
                                        {generarHorarios(medicamento.intervaloHoras).map(
                                            (grupo, i) => (
                                                <div className="horario-opcion" key={i}>
                                                    <span>{grupo.join(" → ")}</span>

                                                    <button
                                                        type="button"
                                                        className="btn-seleccionar-horario"
                                                        onClick={() => {
                                                            setHorariosSeleccionados({
                                                                ...horariosSeleccionados,
                                                                [medicamento.idDosis]: i,
                                                            });
                                                        }}
                                                    >
                                                        <img src={iconHorarios} alt="Seleccionar horario" />
                                                    </button>
                                                    {horariosSeleccionados[medicamento.idDosis] === i && (
                                                        <img
                                                            src={iconHorarioSelect}
                                                            alt="Horario seleccionado"
                                                            className="icon-horario-select"
                                                        />
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="confirmar-horarios-wrapper">
                            <button
                                type="button"
                                className="btn-confirmar-horarios"
                                onClick={confirmarHorarios}
                            >
                                Confirmar
                            </button>
                        </div>
                    </section>
                ) : (
                    <>
                        <div className="detalle-tratamiento-tabs">
                            <button
                                type="button"
                                className={tabActiva === "PENDIENTES" ? "tab-activa" : ""}
                                onClick={() => setTabActiva("PENDIENTES")}
                            >
                                Pendientes <span>{registrosMedicacion.filter(r => r.estado === "PENDIENTE").length}</span>
                            </button>

                            <button
                                type="button"
                                className={tabActiva === "OMITIDAS" ? "tab-activa" : ""}
                                onClick={() => setTabActiva("OMITIDAS")}
                            >
                                Omitidas <span>{registrosMedicacion.filter(r => r.estado === "OMITIDA").length}</span>
                            </button>

                            <button
                                type="button"
                                className={tabActiva === "TOMADAS" ? "tab-activa" : ""}
                                onClick={() => setTabActiva("TOMADAS")}
                            >
                                Tomadas <span>{registrosMedicacion.filter(r => r.estado === "TOMADA").length}</span>
                            </button>
                        </div>

                        <section className="detalle-tratamiento-registros">
                            {registrosMedicacion
                                .filter((registro) => registro.estado === tabActiva.slice(0, -1))
                                .map((registro) => (
                                    <div className="registro-card" key={registro.idToma}>
                                        <div className="registro-titulo">{registro.nombre}</div>
                                        <div className="registro-cuerpo">
                                            <div className="registro-hora">
                                                <img
                                                    src={
                                                        registro.estado === "TOMADA"
                                                            ? iconTomada
                                                            : registro.estado === "OMITIDA"
                                                                ? iconNoTomada
                                                                : iconPendiente
                                                    }
                                                    alt={registro.estado}
                                                />
                                                <span>{registro.hora}</span>
                                            </div>

                                            <div className="registro-dosis">
                                                <p>{registro.dosis}</p>
                                                <small>
                                                    Diariamente cada {registro.intervaloHoras} horas
                                                </small>
                                            </div>

                                            {registro.estado === "TOMADA" ? (
                                                <button
                                                    type="button"
                                                    className="tomada"
                                                >
                                                    Tomada
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => marcarComoTomada(registro.idToma)}
                                                    disabled={tomaProcesando !== null}
                                                >
                                                    {tomaProcesando === registro.idToma
                                                        ? "Procesando..."
                                                        : "Marcar como tomada"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </section>
                    </>
                )}
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