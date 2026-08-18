import { useState } from "react";
import "./ManualMedico.css";

function ManualMedico({ onCerrar }) {
    const [seccionActiva, setSeccionActiva] = useState("introduccion");

    return (
        <div className="manual-overlay">
            <div className="manual-medico">

                <div className="manual-header">
                    <div>
                        <span className="manual-icono">?</span>
                        <h2>MANUAL DE USO - PILLS HERE</h2>
                    </div>

                    <button
                        type="button"
                        className="manual-cerrar"
                        onClick={onCerrar}
                    >
                        ×
                    </button>
                </div>

                <div className="manual-body">

                    <aside className="manual-menu">
                        <h3>INTRODUCCIÓN</h3>

                        <button
                            className={seccionActiva === "introduccion" ? "activo" : ""}
                            onClick={() => setSeccionActiva("introduccion")}
                        >
                            Introducción
                        </button>

                        <button
                            className={seccionActiva === "inicio" ? "activo" : ""}
                            onClick={() => setSeccionActiva("inicio")}
                        >
                            1. Inicio
                        </button>

                        <button
                            className={seccionActiva === "pacientes" ? "activo" : ""}
                            onClick={() => setSeccionActiva("pacientes")}
                        >
                            2. Pacientes
                        </button>

                        <button
                            className={seccionActiva === "agregar" ? "activo" : ""}
                            onClick={() => setSeccionActiva("agregar")}
                        >
                            3. Agregar paciente
                        </button>

                        <button
                            className={seccionActiva === "detalle" ? "activo" : ""}
                            onClick={() => setSeccionActiva("detalle")}
                        >
                            4. Detalle del paciente
                        </button>

                        <button
                            className={seccionActiva === "historial" ? "activo" : ""}
                            onClick={() => setSeccionActiva("historial")}
                        >
                            5. Historial clínico
                        </button>

                        <button
                            className={seccionActiva === "tratamientos" ? "activo" : ""}
                            onClick={() => setSeccionActiva("tratamientos")}
                        >
                            6. Tratamientos
                        </button>

                        <button
                            className={seccionActiva === "estadisticas" ? "activo" : ""}
                            onClick={() => setSeccionActiva("estadisticas")}
                        >
                            7. Estadísticas
                        </button>

                        <button
                            className={seccionActiva === "avisos" ? "activo" : ""}
                            onClick={() => setSeccionActiva("avisos")}
                        >
                            8. Avisos
                        </button>

                        <button
                            className={seccionActiva === "perfil" ? "activo" : ""}
                            onClick={() => setSeccionActiva("perfil")}
                        >
                            9. Perfil
                        </button>
                    </aside>

                    <main className="manual-contenido">

                        {seccionActiva === "introduccion" && (
                            <section>
                                <h1>Manual de uso del médico</h1>

                                <p>
                                    Bienvenido al <strong>Manual de Uso del Médico de Pills Here</strong>, 
                                    una guía diseñada para facilitar el uso de las principales funciones 
                                    disponibles dentro de la plataforma. El objetivo de este manual es orientar 
                                    al médico de manera clara y sencilla durante la navegación por el sistema, 
                                    explicando paso a paso cómo utilizar cada una de las herramientas incluidas en la aplicación.
                                </p>
                                <p>
                                    <strong>Pills Here</strong> es una plataforma de gestión médica enfocada en el control y 
                                    seguimiento de tratamientos. Desde la cuenta del médico es posible administrar pacientes, 
                                    consultar su información, revisar historiales clínicos, crear y modificar tratamientos, 
                                    asignar medicamentos, consultar el progreso del paciente y dar seguimiento al cumplimiento 
                                    de las dosis indicadas.
                                </p>
                                <p>
                                    Este manual se encuentra organizado por <strong>secciones</strong>, de manera que el médico pueda acceder 
                                    directamente a la función sobre la que necesita información. Para ello, puede utilizar el menú 
                                    ubicado en el lado izquierdo de esta ventana y seleccionar cualquiera de las opciones disponibles. 
                                    Al seleccionar una sección, se mostrarán únicamente las instrucciones correspondientes, 
                                    acompañadas de imágenes de referencia y una explicación paso a paso de las acciones que pueden realizarse.
                                </p>
                                <h2>Dentro de cada sección encontrará:</h2>
                                <ul>
                                    <li>Una breve descripción de la función.</li>
                                    <li>Una imagen de referencia de la pantalla correspondiente.</li>
                                    <li>Instrucciones paso a paso para utilizarla.</li>
                                    <li>Explicaciones sobre botones, opciones o información importante.</li>
                                    <li>Recomendaciones o avisos cuando sea necesario considerar alguna condición especial.</li>
                                </ul>
                                <p>
                                    Entre las principales funciones explicadas en este manual se encuentran la consulta del <strong>panel de inicio</strong>, 
                                    la administración de <strong>pacientes</strong>, el registro de <strong>nuevos pacientes</strong>, la consulta de sus <strong>detalles e historial clínico</strong>, 
                                    la creación y modificación de <strong>tratamientos</strong>, la interpretación de <strong>estadísticas de seguimiento</strong>, la gestión de <strong>avisos</strong> 
                                    y la consulta del <strong>perfil médico</strong>.
                                </p>
                                <p>
                                    El manual puede consultarse en cualquier momento presionando el <strong>ícono de ayuda (?)</strong> disponible dentro de la aplicación. 
                                    Al cerrar esta ventana, el médico podrá continuar utilizando Pills Here desde la pantalla en la que se encontraba anteriormente.
                                </p>
                                <p>
                                    Se recomienda consultar las instrucciones de cada sección antes de realizar una función por primera vez, 
                                    especialmente al momento de registrar pacientes o crear tratamientos, con el propósito de ingresar correctamente la información 
                                    y aprovechar todas las herramientas disponibles dentro de Pills Here.
                                </p>
                            </section>
                        )}

                        {seccionActiva === "inicio" && (
                            <section>
                                <h1>1. Inicio</h1>

                                <p>
                                    El panel principal permite al médico consultar rápidamente
                                    un resumen de su actividad recientemente dentro de Pills Here.
                                </p>

                                <div className="manual-imagen-placeholder">
                                    CAPTURA DE PANTALLA - INICIO MÉDICO
                                </div>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>Ingrese a su cuenta como médico.</li>
                                    <li>El sistema mostrará automáticamente el panel principal.</li>
                                    <li>Consulte el número de pacientes registrados.</li>
                                    <li>Consulte los tratamientos activos y completados.</li>
                                    <li>
                                        Utilice la sección "Consultado recientemente" para acceder
                                        rápidamente a un paciente.
                                    </li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "pacientes" && (
                            <section>
                                <h1>2. Pacientes</h1>

                                <p>
                                    Esta sección permite consultar todos los pacientes que se
                                    encuentran vinculados con el médico.
                                </p>

                                <div className="manual-imagen-placeholder">
                                    CAPTURA DE PANTALLA - LISTA DE PACIENTES
                                </div>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>Seleccione "Pacientes" en el menú principal.</li>
                                    <li>Localice al paciente que desea consultar.</li>
                                    <li>Seleccione al paciente para visualizar sus detalles.</li>
                                    <li>
                                        Utilice el botón correspondiente para consultar su historial.
                                    </li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "agregar" && (
                            <section>
                                <h1>3. Agregar paciente</h1>

                                <p>
                                    Esta función permite vincular un paciente existente con la
                                    cuenta del médico.
                                </p>

                                <div className="manual-imagen-placeholder">
                                    CAPTURA DE PANTALLA - AGREGAR PACIENTE
                                </div>

                                <h2>¿Cómo utilizar esta función?</h2>

                                <ol>
                                    <li>Seleccione "Nuevo Paciente".</li>
                                    <li>Ingrese el código proporcionado por el paciente.</li>
                                    <li>Presione el botón de búsqueda.</li>
                                    <li>Verifique que los datos correspondan al paciente correcto.</li>
                                    <li>Confirme la vinculación del paciente.</li>
                                </ol>

                                <div className="manual-aviso">
                                    <strong>Importante:</strong> El código del paciente debe tener
                                    el formato PAC-######.
                                </div>
                            </section>
                        )}

                        {seccionActiva === "detalle" && (
                            <section>
                                <h1>4. Detalle del paciente</h1>

                                <p>
                                    En esta sección puede consultar la información general del
                                    paciente y acceder a las acciones relacionadas con sus
                                    tratamientos.
                                </p>

                                <div className="manual-imagen-placeholder">
                                    CAPTURA DE PANTALLA - DETALLE DEL PACIENTE
                                </div>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>Seleccione un paciente.</li>
                                    <li>Revise sus datos personales.</li>
                                    <li>Consulte sus tratamientos existentes.</li>
                                    <li>
                                        Si es necesario, seleccione la opción para crear un nuevo
                                        tratamiento.
                                    </li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "historial" && (
                            <section>
                                <h1>5. Historial clínico</h1>

                                <p>
                                    Permite consultar los registros médicos y tratamientos
                                    asociados al paciente.
                                </p>

                                <div className="manual-imagen-placeholder">
                                    CAPTURA DE PANTALLA - HISTORIAL CLÍNICO
                                </div>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>Seleccione el historial del paciente.</li>
                                    <li>Consulte los tratamientos registrados.</li>
                                    <li>Revise el diagnóstico correspondiente.</li>
                                    <li>Consulte las fechas y el estado del tratamiento.</li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "tratamientos" && (
                            <section>
                                <h1>6. Tratamientos</h1>

                                <p>
                                    Desde esta sección el médico puede crear y administrar los
                                    tratamientos de sus pacientes.
                                </p>

                                <div className="manual-imagen-placeholder">
                                    CAPTURA DE PANTALLA - TRATAMIENTOS
                                </div>

                                <h2>Crear un tratamiento</h2>

                                <ol>
                                    <li>Seleccione al paciente correspondiente.</li>
                                    <li>Presione "Crear tratamiento".</li>
                                    <li>Ingrese el nombre del tratamiento.</li>
                                    <li>Ingrese el diagnóstico.</li>
                                    <li>Busque y seleccione un medicamento.</li>
                                    <li>Indique cantidad, frecuencia y duración.</li>
                                    <li>Agregue otros medicamentos si es necesario.</li>
                                    <li>Guarde el tratamiento.</li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "estadisticas" && (
                            <section>
                                <h1>7. Estadísticas</h1>

                                <p>
                                    Las estadísticas permiten analizar el progreso y cumplimiento
                                    de los tratamientos del paciente.
                                </p>

                                <div className="manual-imagen-placeholder">
                                    CAPTURA DE PANTALLA - ESTADÍSTICAS
                                </div>

                                <h2>Estados de las dosis</h2>

                                <ul>
                                    <li>
                                        <strong>Tomadas:</strong> dosis confirmadas por el paciente.
                                    </li>
                                    <li>
                                        <strong>Pendientes:</strong> dosis que todavía esperan ser
                                        registradas.
                                    </li>
                                    <li>
                                        <strong>Omitidas:</strong> dosis que no fueron tomadas dentro
                                        del periodo correspondiente.
                                    </li>
                                </ul>
                            </section>
                        )}

                        {seccionActiva === "avisos" && (
                            <section>
                                <h1>8. Avisos</h1>

                                <p>
                                    Esta función permite enviar información importante al paciente.
                                </p>

                                <div className="manual-imagen-placeholder">
                                    CAPTURA DE PANTALLA - AVISOS
                                </div>

                                <h2>¿Cómo enviar un aviso?</h2>

                                <ol>
                                    <li>Seleccione al paciente.</li>
                                    <li>Ingrese el título del aviso.</li>
                                    <li>Escriba el contenido.</li>
                                    <li>Agregue observaciones si es necesario.</li>
                                    <li>Presione el botón para enviar.</li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "perfil" && (
                            <section>
                                <h1>9. Perfil médico</h1>

                                <p>
                                    El perfil permite consultar la información registrada en la
                                    cuenta del médico.
                                </p>

                                <div className="manual-imagen-placeholder">
                                    CAPTURA DE PANTALLA - PERFIL MÉDICO
                                </div>

                                <h2>¿Cómo acceder?</h2>

                                <ol>
                                    <li>Presione el ícono de perfil ubicado en la parte superior.</li>
                                    <li>Consulte la información de su cuenta.</li>
                                    <li>
                                        Utilice las opciones disponibles para administrar su sesión.
                                    </li>
                                </ol>
                            </section>
                        )}

                    </main>
                </div>
            </div>
        </div>
    );
}

export default ManualMedico;