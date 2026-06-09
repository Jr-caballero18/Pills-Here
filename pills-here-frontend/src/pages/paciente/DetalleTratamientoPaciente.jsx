import "./DetalleTratamientoPaciente.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerDetalleTratamiento } from "../../services/tratamientoService";
import { iniciarTratamientoPaciente, marcarDosisComoTomada, obtenerTomasTratamiento } from "../../services/tratamientoService";
import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";

import iconTomada from "../../assets/images/icon-palomita.png";
import iconPendiente from "../../assets/images/icon-pendiente.png";
import iconNoTomada from "../../assets/images/icon-no-tomadas.png";
import iconHorarios from "../../assets/images/icon-horarios.png";
import iconHorarioSelect from "../../assets/images/icon-horario-select.png";

function DetalleTratamientoPaciente() {
    const navigate = useNavigate();
    const { idTratamiento } = useParams();

    const [tratamiento, setTratamiento] = useState(null);
    const [tratamientoIniciado, setTratamientoIniciado] = useState(false);
    const [medicamentoAbierto, setMedicamentoAbierto] = useState(null);
    const [tabActiva, setTabActiva] = useState("PENDIENTES");
    const [horariosSeleccionados, setHorariosSeleccionados] = useState({});
    const [registrosMedicacion, setRegistrosMedicacion] = useState([]);

    useEffect(() => {
        const cargarTratamiento = async () => {
            try {
                const data = await obtenerDetalleTratamiento(idTratamiento);
                setTratamiento(data);

                const tomas = await obtenerTomasTratamiento(idTratamiento);

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

        cargarTratamiento();
    }, [idTratamiento]);

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
        try {
            await marcarDosisComoTomada(idDosis);

            const tomasActualizadas = await obtenerTomasTratamiento(idTratamiento);

            setRegistrosMedicacion(tomasActualizadas);
        } catch (error) {
            console.error("Error al marcar dosis como tomada:", error);
            alert("Error al marcar dosis como tomada");
        }
    };


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

                <section className="detalle-tratamiento-estado">
                    El tratamiento se encuentra a medio proceso. Cumplimiento 50%
                </section>

                <section className="detalle-tratamiento-resumen">
                    <p>Medicamentos:</p>
                    <ul>
                        {tratamiento.medicamentos.map((medicamento, index) => (
                            <li key={index}>
                                {medicamento.nombre}. {medicamento.dosis} cada {medicamento.intervaloHoras} horas
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
                                            Diariamente cada {medicamento.intervaloHoras} horas
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
                                                    onClick={() =>
                                                        marcarComoTomada(registro.idToma)
                                                    }
                                                >
                                                    Marcar como tomada
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