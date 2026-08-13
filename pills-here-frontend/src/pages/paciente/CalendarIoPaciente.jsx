import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import themePlugin from "@fullcalendar/react/themes/classic";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "./CalendarioPaciente.css";

import logo from "../../assets/images/logo.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";

const CalendarioPaciente = () => {
    const navigate = useNavigate();

    const [tratamientosHover, setTratamientosHover] = useState([]);


    const eventos = [
        {
            id: "1",
            title: "Tratamiento de Asma",
            start: "2026-02-02",
            end: "2026-02-05",
            backgroundColor: "#2d8cf0",
            borderColor: "#2d8cf0",
            extendedProps: {
                tomadas: 3,
                pendientes: 2,
                omitidas: 1,
            },
        },

        {
            id: "2",
            title: "Tratamiento de Diabetes",
            start: "2026-02-02",
            end: "2026-02-05",
            backgroundColor: "#bb2cf0",
            borderColor: "#bb2cf0",
            extendedProps: {
                tomadas: 1,
                pendientes: 2,
                omitidas: 0,
            },
        },
    ];

    const obtenerTratamientosPorFecha = (fecha) => {
        const fechaStr = fecha.toISOString().split("T")[0];

        return eventos.filter((evento) => {
            const inicio = evento.start;
            const fin = evento.end;

            return fechaStr >= inicio && fechaStr < fin;
        });
    };


    return (
        <div className="calendario-paciente-page">

            {

            }

            <header className="calendario-paciente-header">

                <img
                    src={logo}
                    alt="Pills Here"
                    className="calendario-paciente-logo"
                />

                <h1>Calendario de Medicación</h1>

                <div className="calendario-paciente-icons">

                    <button type="button">
                        <img
                            src={iconNotificacion}
                            alt="Notificaciones"
                        />
                    </button>

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


            {


            }

            <main className="calendario-paciente-content">

                <div className="calendario-wrapper">

                    <FullCalendar
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

                        events={eventos}

                        fixedWeekCount={false}
                        showNonCurrentDates={false}

                        displayEventTime={false}

                        height="auto"

                        dayCellDidMount={(info) => {

                            const tratamientosDia =
                                obtenerTratamientosPorFecha(info.date);

                            if (tratamientosDia.length > 0) {

                                info.el.addEventListener("mouseenter", () => {
                                    setTratamientosHover(tratamientosDia);
                                });

                                info.el.addEventListener("mouseleave", () => {
                                    setTratamientosHover([]);
                                });
                            }
                        }}
                    />
                    {

                    }

                    {tratamientosHover.length > 0 && (

                        <div className="calendario-detalle">

                            {tratamientosHover.map((tratamiento) => (

                                <div
                                    className="calendario-detalle-tratamiento"
                                    key={tratamiento.id}
                                >

                                    <div className="calendario-detalle-titulo">

                                        <span
                                            className="calendario-color-tratamiento"
                                            style={{
                                                backgroundColor:
                                                    tratamiento.backgroundColor,
                                            }}
                                        />

                                        <strong>
                                            {tratamiento.title}.
                                        </strong>

                                    </div>

                                    <div className="calendario-detalle-estadisticas">

                                        <div className="calendario-estadistica">

                                            <span className="calendario-punto tomada" />

                                            <span className="calendario-etiqueta tomada-etiqueta">
                                                {tratamiento.extendedProps.tomadas} dosis tomadas
                                            </span>

                                        </div>

                                        <div className="calendario-estadistica">

                                            <span className="calendario-punto pendiente" />

                                            <span className="calendario-etiqueta pendiente-etiqueta">
                                                {tratamiento.extendedProps.pendientes} dosis pendientes
                                            </span>

                                        </div>

                                        <div className="calendario-estadistica">

                                            <span className="calendario-punto omitida" />

                                            <span className="calendario-etiqueta omitida-etiqueta">
                                                {tratamiento.extendedProps.omitidas} dosis omitidas
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </main>


            {

            }

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