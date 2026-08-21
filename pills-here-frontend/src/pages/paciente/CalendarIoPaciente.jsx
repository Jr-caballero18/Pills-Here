import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import themePlugin from "@fullcalendar/react/themes/classic";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "./CalendarioPaciente.css";
import NotificacionesPaciente from "../../components/NotificacionesPaciente/NotificacionesPaciente";
import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import {
    obtenerTratamientoPorPaciente,
    obtenerEstadisticasCalendarioDia
} from "../../services/tratamientoService";

const formatearFecha = (fecha) => {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
};


const sumarUnDia = (fecha) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1);
    return nuevaFecha;
};


const coloresTratamientos = [
    "#2d8cf0",
    "#bb2cf0",
    "#22b573",
    "#f39c12",
    "#e74c3c",
    "#16a085",
    "#8e44ad",
    "#3498db"
];


const obtenerColorTratamiento = (idTratamiento) => {
    return coloresTratamientos[
        Math.abs(idTratamiento) % coloresTratamientos.length
    ];
};
const CalendarioPaciente = () => {
    const navigate = useNavigate();

    const [tratamientosHover, setTratamientosHover] = useState([]);


    const [eventos, setEventos] = useState([]);
    const [detallePosicion, setDetallePosicion] = useState(null);

    const mostrarDetalleDia = async (fecha, celda) => {
        try {
            const idPaciente =
                localStorage.getItem("idPaciente");

            if (!idPaciente) {
                return;
            }

            const fechaStr =
                formatearFecha(fecha);

            const estadisticas =
                await obtenerEstadisticasCalendarioDia(
                    idPaciente,
                    fechaStr
                );


            console.log(
                "ESTADISTICAS DEL DIA:",
                fechaStr,
                estadisticas
            );

            if (!estadisticas?.length) {
                setTratamientosHover([]);
                setDetallePosicion(null);
                return;
            }


            const tratamientosConColor =
                estadisticas.map((tratamiento) => ({
                    ...tratamiento,

                    color: obtenerColorTratamiento(
                        tratamiento.idTratamiento
                    )
                }));

            setTratamientosHover(
                tratamientosConColor
            );

            if (
                celda &&
                wrapperRef.current
            ) {
                const rectCelda =
                    celda.getBoundingClientRect();

                const rectWrapper =
                    wrapperRef.current
                        .getBoundingClientRect();

                let izquierda =
                    rectCelda.left -
                    rectWrapper.left +
                    105;

                const anchoDetalle = 505;

                if (
                    izquierda + anchoDetalle >
                    rectWrapper.width
                ) {
                    izquierda =
                        rectWrapper.width -
                        anchoDetalle -
                        5;
                }

                if (izquierda < 0) {
                    izquierda = 5;
                }

                setDetallePosicion({
                    top:
                        rectCelda.bottom -
                        rectWrapper.top -
                        5,

                    left: izquierda
                });
            }

        } catch (error) {
            console.error(
                "Error al obtener estadísticas del día:",
                error
            );
        }
    };

    const ocultarDetalleDia = () => {
        setTratamientosHover([]);
        setDetallePosicion(null);
    };

    const wrapperRef = useRef(null);

    useEffect(() => {
        const cargarTratamientos = async () => {
            try {
                const idPaciente = localStorage.getItem("idPaciente");

                if (!idPaciente) {
                    console.error("No se encontró idPaciente");
                    return;
                }

                const tratamientos =
                    await obtenerTratamientoPorPaciente(idPaciente);

                const nuevosEventos = [];

                tratamientos.forEach((tratamiento) => {

                    console.log(
                        "CALENDARIO TRATAMIENTO:",
                        tratamiento.idTratamiento,
                        tratamiento.nombreTratamiento,
                        "INICIO REAL:",
                        tratamiento.fechaInicioReal,
                        "FIN:",
                        tratamiento.fechaFin
                    );


                    if (
                        !tratamiento.fechaInicioReal ||
                        !tratamiento.fechaFin
                    ) {
                        return;
                    }

                    const inicioReal = new Date(
                        tratamiento.fechaInicioReal
                    );

                    const inicio = new Date(
                        inicioReal.getFullYear(),
                        inicioReal.getMonth(),
                        inicioReal.getDate()
                    );

                    const fin = new Date(
                        `${tratamiento.fechaFin}T00:00:00`
                    );

                    let fechaActual = new Date(inicio);

                    const color = obtenerColorTratamiento(
                        tratamiento.idTratamiento
                    );

                    while (fechaActual <= fin) {

                        const fechaStr =
                            formatearFecha(fechaActual);

                        nuevosEventos.push({
                            id: `${tratamiento.idTratamiento}-${fechaStr}`,
                            title: tratamiento.nombreTratamiento,
                            start: fechaStr,
                            allDay: true,
                            color: color,

                            extendedProps: {
                                idTratamiento:
                                    tratamiento.idTratamiento,

                                nombreTratamiento:
                                    tratamiento.nombreTratamiento,

                                color: color
                            }
                        });

                        fechaActual =
                            sumarUnDia(fechaActual);
                    }
                });


                setEventos(nuevosEventos);

            } catch (error) {
                console.error(
                    "Error al cargar tratamientos del calendario:",
                    error
                );
            }
        };

        cargarTratamientos();
    }, []);

    const obtenerEventosDelDia = (fecha) => {
        const fechaStr = formatearFecha(fecha);

        return eventos.filter(
            (evento) => evento.start === fechaStr
        );
    };

    return (
        <div className="calendario-paciente-page">

            <header className="calendario-paciente-header">

                <img
                    src={logo}
                    alt="Pills Here"
                    className="calendario-paciente-logo"
                />

                <h1>Calendario de Medicación</h1>

                <div className="calendario-paciente-icons">

                    <NotificacionesPaciente
                        className="calendario-paciente-btn-notificacion"
                    />

                    <button
                        type="button"
                        onClick={() => navigate("/perfil-paciente")}
                    >
                        <img
                            src={iconPerfil}
                            alt="Perfil"
                        />
                    </button>

                </div>

            </header>

            <main className="calendario-paciente-content">

                <div className="calendario-wrapper" ref={wrapperRef}>

                    <FullCalendar
                        key={eventos.map((evento) => evento.id).join("-")}
                        plugins={[dayGridPlugin,
                            themePlugin

                        ]}

                        initialView="dayGridMonth"

                        locale="es"


                        headerToolbar={{
                            start: "title",
                            center: "",
                            end: "",
                        }}

                        fixedWeekCount={false}
                        showNonCurrentDates={false}
                        displayEventTime={false}

                        height="auto"

                        toolbarClass="calendario-toolbar"

                        toolbarTitleClass="calendario-titulo-mes"

                        tableHeaderClass="calendario-header-dias"

                        tableBodyClass="calendario-cuerpo"

                        dayRowClass="calendario-fila"

                        dayCellClass="calendario-celda"

                        dayHeaderClass="calendario-dia-header"

                        dayHeaderFormat={{
                            weekday: "short",
                        }}

                        dayCellDidMount={(info) => {
                            const fecha = info.date;

                            const eventosDia = obtenerEventosDelDia(fecha);

                            if (eventosDia.length > 0) {
                                const contenedorBarras =
                                    document.createElement("div");

                                contenedorBarras.className =
                                    "calendario-barras-dia";

                                eventosDia.forEach((evento) => {
                                    const barra =
                                        document.createElement("div");

                                    barra.className =
                                        "barra-tratamiento-calendario";

                                    barra.style.backgroundColor =
                                        evento.extendedProps.color;

                                    contenedorBarras.appendChild(
                                        barra
                                    );
                                });

                                info.el.appendChild(
                                    contenedorBarras
                                );
                            }

                            const entrar = () => {
                                mostrarDetalleDia(
                                    fecha,
                                    info.el
                                );
                            };

                            const salir = () => {
                                ocultarDetalleDia();
                            };

                            info.el.addEventListener(
                                "mouseenter",
                                entrar
                            );

                            info.el.addEventListener(
                                "mouseleave",
                                salir
                            );
                        }}

                    />


                    {tratamientosHover.length > 0 && detallePosicion && (
                        <div
                            className="calendario-detalle"
                            style={{
                                top: detallePosicion.top,
                                left: detallePosicion.left
                            }}
                        >
                            {tratamientosHover.map((tratamiento) => (
                                <div
                                    key={tratamiento.idTratamiento}
                                    className="calendario-detalle-tratamiento"
                                >
                                    <div className="calendario-detalle-titulo">

                                        <span
                                            className="calendario-color-tratamiento"
                                            style={{
                                                backgroundColor: tratamiento.color
                                            }}
                                        />

                                        <strong>
                                            {tratamiento.nombreTratamiento}.
                                        </strong>

                                    </div>

                                    <div className="calendario-medicamentos-dia">
                                        {(tratamiento.medicamentos || []).map(
                                            (medicamento, index) => (
                                                <div
                                                    key={`${tratamiento.idTratamiento}-${medicamento}`}
                                                    className="calendario-medicamento-item"
                                                >
                                                    <span
                                                        className={`calendario-punto-medicamento medicamento-color-${index % 8}`}
                                                    />

                                                    <span
                                                        className={`calendario-medicamento-etiqueta medicamento-etiqueta-${index % 8}`}
                                                    >
                                                        {medicamento}.
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </main>


            <button
                type="button"
                className="calendario-paciente-back"
                onClick={() => navigate(-1)}
            >
                <img
                    src={iconRegreso}
                    alt="Regresar"
                />
            </button>

        </div>
    );
};

export default CalendarioPaciente;