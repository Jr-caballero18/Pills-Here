import { useEffect, useRef, useState } from "react";
import "./ManualPaciente.css";
import inicioPacienteImg from "../../assets/manual/paciente/inicioPaciente.png";
import notasMedicoImg from "../../assets/manual/paciente/avisos.png";
import historialPacienteImg from "../../assets/manual/paciente/historialClinico.png";
import detalleTratamiento1Img from "../../assets/manual/paciente/detalleTratamiento1.png";
import detalleTratamiento2Img from "../../assets/manual/paciente/detalleTratamiento2.png";
import tratamientosActualesImg from "../../assets/manual/paciente/tratamientosActuales.png";
import calendario1Img from "../../assets/manual/paciente/calendario1.png";
import calendario2Img from "../../assets/manual/paciente/calendario2.png";
import estadisticaGeneralImg from "../../assets/manual/Paciente/estadisticaGeneral.png";
import estadisticasPorTratamientoImg from "../../assets/manual/Paciente/estadisticasPorTratamiento.png";
import perfilPacienteImg from "../../assets/manual/Paciente/perfil.png";

function ManualPaciente({ onCerrar }) {

    const [seccionActiva, setSeccionActiva] = useState("introduccion");

    const contenidoRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        if (contenidoRef.current) {
            contenidoRef.current.scrollTop = 0;
        }

        if (menuRef.current) {
            menuRef.current.scrollTop = 0;
        }
    }, [seccionActiva]);

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

                    <aside
                        className="manual-menu"
                        ref={menuRef}
                    >
                        <h3>INTRODUCCIÓN</h3>

                        <button
                            className={
                                seccionActiva === "introduccion"
                                    ? "activo"
                                    : ""
                            }
                            onClick={() =>
                                setSeccionActiva("introduccion")
                            }
                        >
                            Introducción
                        </button>

                        <button
                            className={
                                seccionActiva === "inicio"
                                    ? "activo"
                                    : ""
                            }
                            onClick={() =>
                                setSeccionActiva("inicio")
                            }
                        >
                            1. Inicio
                        </button>

                        <button
                            className={
                                seccionActiva === "notas"
                                    ? "activo"
                                    : ""
                            }
                            onClick={() =>
                                setSeccionActiva("notas")
                            }
                        >
                            2. Notas del médico
                        </button>

                        <button
                            className={
                                seccionActiva === "historial"
                                    ? "activo"
                                    : ""
                            }
                            onClick={() =>
                                setSeccionActiva("historial")
                            }
                        >
                            3. Historial clínico
                        </button>

                        <button
                            className={
                                seccionActiva === "tratamientos"
                                    ? "activo"
                                    : ""
                            }
                            onClick={() =>
                                setSeccionActiva("tratamientos")
                            }
                        >
                            4. Tratamientos
                        </button>

                        <button
                            className={
                                seccionActiva === "detalle"
                                    ? "activo"
                                    : ""
                            }
                            onClick={() =>
                                setSeccionActiva("detalle")
                            }
                        >
                            5. Detalle del tratamiento
                        </button>

                        <button
                            className={
                                seccionActiva === "estadisticas"
                                    ? "activo"
                                    : ""
                            }
                            onClick={() =>
                                setSeccionActiva("estadisticas")
                            }
                        >
                            7. Estadísticas
                        </button>

                        <button
                            className={
                                seccionActiva === "calendario"
                                    ? "activo"
                                    : ""
                            }
                            onClick={() =>
                                setSeccionActiva("calendario")
                            }
                        >
                            6. Calendario
                        </button>

                        <button
                            className={
                                seccionActiva === "perfil"
                                    ? "activo"
                                    : ""
                            }
                            onClick={() =>
                                setSeccionActiva("perfil")
                            }
                        >
                            8. Perfil
                        </button>

                    </aside>

                    <main
                        className="manual-contenido"
                        ref={contenidoRef}
                    >

                        {seccionActiva === "introduccion" && (
                            <section>
                                <h1>Manual de uso del paciente</h1>

                                <p>
                                    Bienvenido al <strong>Manual de Uso del Paciente de Pills Here</strong>.
                                    Esta guía ha sido diseñada para ayudar al paciente a conocer y utilizar
                                    correctamente las diferentes funciones disponibles dentro de la
                                    plataforma.
                                </p>

                                <p>
                                    <strong>Pills Here</strong> es un sistema orientado al seguimiento de
                                    tratamientos médicos, que permite al paciente consultar de manera
                                    organizada la información relacionada con sus tratamientos,
                                    medicamentos y registros de medicación. Además, facilita el acceso a
                                    información proporcionada por el médico y permite llevar un mejor
                                    seguimiento del cumplimiento de las indicaciones médicas registradas
                                    en el sistema.
                                </p>

                                <p>
                                    A través de la cuenta del paciente es posible consultar las
                                    <strong> notas enviadas por el médico</strong>, revisar el
                                    <strong> historial clínico</strong>, visualizar los
                                    <strong> tratamientos actuales</strong>, consultar el
                                    <strong> calendario de medicación</strong> y conocer las
                                    <strong> estadísticas de cumplimiento</strong> generadas a partir del
                                    seguimiento de las tomas de medicamentos.
                                </p>

                                <p>
                                    El sistema también permite consultar detalladamente cada tratamiento,
                                    incluyendo los medicamentos indicados y la información necesaria para
                                    llevar a cabo su seguimiento. De esta manera, el paciente puede tener
                                    en un mismo lugar la información relacionada con las indicaciones
                                    registradas por su médico.
                                </p>

                                <h2>Objetivo del manual</h2>

                                <p>
                                    El objetivo de este manual es proporcionar una guía clara y sencilla
                                    sobre el funcionamiento de Pills Here desde la perspectiva del paciente.
                                    Cada apartado explica una sección específica de la plataforma y muestra
                                    los pasos necesarios para utilizar sus principales funciones.
                                </p>

                                <p>
                                    Las instrucciones están acompañadas de imágenes de referencia de las
                                    pantallas del sistema, con la finalidad de facilitar la identificación
                                    de botones, opciones, información y elementos disponibles durante el
                                    uso de la aplicación.
                                </p>

                                <h2>Funciones disponibles para el paciente</h2>

                                <p>
                                    Mediante este manual podrá conocer el funcionamiento de las principales
                                    secciones disponibles en su cuenta:
                                </p>

                                <ul>
                                    <li>
                                        <strong>Inicio:</strong> permite visualizar el panel principal y
                                        acceder rápidamente a las diferentes funciones de Pills Here.
                                    </li>

                                    <li>
                                        <strong>Notas del médico:</strong> permite consultar las notas e
                                        indicaciones registradas por el médico.
                                    </li>

                                    <li>
                                        <strong>Historial clínico:</strong> permite revisar la información
                                        correspondiente a los tratamientos que forman parte del historial
                                        del paciente.
                                    </li>

                                    <li>
                                        <strong>Tratamientos:</strong> permite consultar los tratamientos
                                        asignados y acceder a la información correspondiente a cada uno.
                                    </li>

                                    <li>
                                        <strong>Detalle del tratamiento:</strong> permite visualizar con
                                        mayor detalle la información y los medicamentos correspondientes
                                        a un tratamiento seleccionado.
                                    </li>

                                    <li>
                                        <strong>Calendario de medicación:</strong> permite consultar la
                                        programación de los medicamentos de acuerdo con los días
                                        correspondientes al tratamiento.
                                    </li>

                                    <li>
                                        <strong>Estadísticas:</strong> permiten conocer el seguimiento de
                                        las tomas de medicamentos mediante registros de tomas realizadas,
                                        pendientes y omitidas, así como el porcentaje de cumplimiento.
                                    </li>

                                    <li>
                                        <strong>Perfil:</strong> permite consultar la información personal
                                        registrada en la cuenta del paciente.
                                    </li>
                                </ul>

                                <h2>¿Cómo utilizar este manual?</h2>

                                <p>
                                    En el lado izquierdo del manual se encuentra un menú con todas las
                                    secciones disponibles. Seleccione la opción sobre la que desea obtener
                                    información y el contenido correspondiente aparecerá en este espacio.
                                </p>

                                <p>
                                    Cada sección del manual contiene una explicación de la función,
                                    una captura de pantalla de referencia y las instrucciones necesarias
                                    para utilizar las opciones disponibles.
                                </p>

                                <p>
                                    Puede cambiar entre las diferentes secciones del manual en cualquier
                                    momento utilizando el menú lateral. Al seleccionar una nueva opción,
                                    la información correspondiente se mostrará desde el inicio para
                                    facilitar su lectura.
                                </p>

                                <div className="manual-aviso">
                                    <strong>Importante:</strong> Pills Here funciona como una herramienta
                                    para facilitar la consulta y seguimiento de la información relacionada
                                    con los tratamientos registrados. El paciente debe seguir las
                                    indicaciones proporcionadas por su médico y utilizar la información
                                    mostrada en la plataforma de acuerdo con dichas indicaciones.
                                </div>
                            </section>
                        )}

                        {seccionActiva === "inicio" && (
                            <section>
                                <h1>1. Inicio</h1>

                                <p>
                                    La pantalla de <strong>Inicio</strong> es el panel principal del paciente
                                    dentro de Pills Here. Desde esta sección se puede acceder rápidamente
                                    a las principales funciones de la plataforma y consultar un resumen
                                    general del cumplimiento de los tratamientos.
                                </p>

                                <div className="manual-imagen-container">
                                    <img
                                        src={inicioPacienteImg}
                                        alt="pantalla de inicio"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>Bienvenida del paciente</h2>

                                <p>
                                    En la parte superior de la pantalla se muestra un mensaje de bienvenida
                                    acompañado del <strong>nombre del paciente</strong> que ha iniciado sesión.
                                    Esto permite identificar la cuenta que se encuentra actualmente en uso.
                                </p>

                                <h2>Accesos principales</h2>

                                <p>
                                    En la parte izquierda de la pantalla se encuentran cuatro accesos
                                    principales que permiten ingresar rápidamente a las funciones más
                                    importantes para el seguimiento del paciente.
                                </p>

                                <ul>
                                    <li>
                                        <strong>Notas del Médico:</strong> permite acceder a las notas e
                                        indicaciones que han sido registradas por el médico para el paciente.
                                        Para ingresar, seleccione la opción <strong>Ver notas recientes</strong>.
                                    </li>

                                    <li>
                                        <strong>Historial Clínico:</strong> permite consultar los registros
                                        relacionados con el historial de tratamientos del paciente.
                                        Para acceder, seleccione <strong>Ver historial clínico</strong>.
                                    </li>

                                    <li>
                                        <strong>Tratamientos Actuales:</strong> permite consultar los
                                        tratamientos que se encuentran actualmente asignados al paciente.
                                        Para ingresar, seleccione <strong>Ver tratamientos actuales</strong>.
                                    </li>

                                    <li>
                                        <strong>Calendario de Medicación:</strong> permite visualizar la
                                        programación de los medicamentos correspondientes a los tratamientos
                                        del paciente. Para acceder, seleccione <strong>Ver calendario</strong>.
                                    </li>
                                </ul>

                                <h2>Notificaciones</h2>

                                <p>
                                    En la esquina superior derecha se encuentra el acceso a
                                    <strong> notificaciones</strong>. Desde esta opción el paciente puede
                                    consultar los avisos, recordatorios y notificaciones disponibles relacionados con
                                    el uso y seguimiento de sus tratamientos.
                                </p>

                                <h2>Perfil</h2>

                                <p>
                                    Junto al acceso de notificaciones se encuentra el botón de
                                    <strong> perfil</strong>. Al seleccionarlo, el paciente puede acceder
                                    a la pantalla donde se muestra la información correspondiente a su
                                    cuenta y sus datos registrados.
                                </p>

                                <h2>Botón de ayuda</h2>

                                <p>
                                    En la esquina inferior derecha se encuentra el botón con el símbolo
                                    <strong> (?)</strong>. Al seleccionarlo se abre este manual de uso,
                                    desde el cual puede consultar las instrucciones correspondientes a
                                    cada una de las funciones disponibles para el paciente.
                                </p>

                                <h2>¿Cómo utilizar esta pantalla?</h2>

                                <ol>
                                    <li>
                                        Identifique su nombre en la parte superior para verificar que se
                                        encuentra utilizando la cuenta correcta.
                                    </li>

                                    <li>
                                        Seleccione <strong>Ver notas recientes</strong> para consultar las
                                        notas registradas por su médico.
                                    </li>

                                    <li>
                                        Seleccione <strong>Ver historial clínico</strong> para consultar
                                        su historial.
                                    </li>

                                    <li>
                                        Seleccione <strong>Ver tratamientos actuales</strong> para revisar
                                        los tratamientos que tiene asignados.
                                    </li>

                                    <li>
                                        Seleccione <strong>Ver calendario</strong> para consultar la
                                        programación de su medicación.
                                    </li>

                                    <li>
                                        Consulte la <strong>Estadística general </strong> para
                                        visualizar el seguimiento y cumplimiento de los tratamientos.
                                    </li>

                                    <li>
                                        Utilice el botón de <strong>notificaciones</strong> para consultar
                                        algunas novedades disponibles.
                                    </li>

                                    <li>
                                        Utilice el botón de <strong>perfil</strong> para consultar la
                                        información de su cuenta.
                                    </li>

                                    <li>
                                        Presione el botón <strong>(?)</strong> cuando necesite consultar
                                        nuevamente este manual de uso.
                                    </li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "notas" && (
                            <section>
                                <h1>2. Notas del médico</h1>

                                <p>
                                    La sección <strong>Notas del médico</strong> permite al paciente consultar
                                    los avisos, indicaciones y observaciones que han sido registrados por su médico
                                    dentro de Pills Here. Esta sección facilita la revisión de información importante
                                    relacionada con el seguimiento del tratamiento.
                                </p>

                                <div className="manual-imagen-container">
                                    <img
                                        src={notasMedicoImg}
                                        alt="Pantalla de notas del médico en Pills Here"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>Lista de notas</h2>

                                <p>
                                    En la parte izquierda de la pantalla se muestra la lista de notas disponibles.
                                    Cada nota presenta un título y una breve descripción para que el paciente pueda
                                    identificar rápidamente su contenido.
                                </p>

                                <p>
                                    Entre las notas pueden encontrarse recordatorios, indicaciones relacionadas con
                                    medicamentos, recomendaciones de seguimiento o información sobre próximas consultas.
                                </p>

                                <h2>Ver detalles</h2>

                                <p>
                                    Cada nota incluye el botón <strong>Ver detalles</strong>. Al seleccionarlo,
                                    la información completa de la nota se muestra en el costado (el recuadro en blanco) al lado
                                    derecho de la pantalla de las notas.
                                </p>

                                <h2>Nota seleccionada</h2>

                                <p>
                                    En el panel <strong>Nota Seleccionada</strong> se muestra la información
                                    detallada correspondiente a la nota elegida.
                                </p>

                                <p>Dentro de este panel se puede consultar:</p>

                                <ul>
                                    <li>
                                        <strong>Fecha:</strong> indica la fecha en la que fue registrada la nota.
                                    </li>

                                    <li>
                                        <strong>Título:</strong> muestra el tema principal de la nota enviada por el médico.
                                    </li>

                                    <li>
                                        <strong>Contenido:</strong> presenta la indicación o mensaje completo dirigido al paciente.
                                    </li>

                                    <li>
                                        <strong>Médico:</strong> muestra el nombre del médico que registró la nota.
                                    </li>

                                    <li>
                                        <strong>Observaciones:</strong> permite consultar información adicional
                                        relacionada con la nota, como fechas importantes, recomendaciones o indicaciones complementarias.
                                    </li>
                                </ul>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>
                                        Revise la lista de notas disponibles en el lado izquierdo de la pantalla.
                                    </li>

                                    <li>
                                        Identifique la nota que desea consultar mediante su <strong>título</strong>
                                        y descripción.
                                    </li>

                                    <li>
                                        Presione el botón <strong>Ver detalles</strong> de la nota seleccionada.
                                    </li>

                                    <li>
                                        Consulte la información mostrada en el panel <strong>Nota Seleccionada</strong>.
                                    </li>

                                    <li>
                                        Revise la <strong>fecha, contenido, médico y observaciones</strong>
                                        correspondientes a la nota.
                                    </li>

                                    <li>
                                        Si desea consultar otra nota, seleccione nuevamente
                                        <strong> Ver detalles</strong> en el registro correspondiente.
                                    </li>
                                </ol>

                                <div className="manual-aviso">
                                    <strong>Importante:</strong> Se recomienda revisar periódicamente las notas del médico,
                                    ya que pueden contener indicaciones importantes relacionadas con el tratamiento,
                                    medicamentos o próximas consultas.
                                </div>
                            </section>
                        )}

                        {seccionActiva === "historial" && (
                            <section>
                                <h1>3. Historial clínico</h1>

                                <p>
                                    La sección <strong>Historial clínico</strong> permite al paciente consultar
                                    la información general registrada en su cuenta y revisar los tratamientos
                                    que forman parte de su historial dentro de Pills Here.
                                </p>

                                <div className="manual-imagen-container">
                                    <img
                                        src={historialPacienteImg}
                                        alt="Pantalla de historial clínico del paciente en Pills Here"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>Información del paciente</h2>

                                <p>
                                    En la parte superior de la pantalla se muestran los datos generales
                                    del paciente. Esta información permite identificar la cuenta y consultar
                                    algunos de los datos médicos registrados dentro del sistema.
                                </p>

                                <p>Los datos disponibles son:</p>

                                <ul>
                                    <li>
                                        <strong>Nombre:</strong> muestra el nombre completo del paciente.
                                    </li>

                                    <li>
                                        <strong>Código:</strong> muestra el código único asignado al paciente
                                        dentro de Pills Here.
                                    </li>

                                    <li>
                                        <strong>Fecha de nacimiento:</strong> muestra la fecha de nacimiento
                                        registrada.
                                    </li>

                                    <li>
                                        <strong>Sexo:</strong> muestra el sexo registrado del paciente.
                                    </li>

                                    <li>
                                        <strong>Tipo de sangre:</strong> permite consultar el grupo sanguíneo
                                        registrado.
                                    </li>

                                    <li>
                                        <strong>Alergias:</strong> muestra las alergias registradas en la
                                        información del paciente.
                                    </li>
                                </ul>

                                <h2>Historial de tratamientos</h2>

                                <p>
                                    En la parte inferior de la pantalla se encuentra la tabla del
                                    <strong> historial clínico</strong>, donde se muestran los tratamientos
                                    que han sido registrados para el paciente.
                                </p>

                                <p>Cada registro contiene la siguiente información:</p>

                                <ul>
                                    <li>
                                        <strong>Fecha:</strong> indica la fecha correspondiente al tratamiento
                                        registrado.
                                    </li>

                                    <li>
                                        <strong>Diagnóstico:</strong> muestra el diagnóstico asociado al
                                        tratamiento.
                                    </li>

                                    <li>
                                        <strong>Médico:</strong> muestra el nombre del médico responsable
                                        del tratamiento registrado.
                                    </li>

                                    <li>
                                        <strong>Estado:</strong> indica la situación actual en la que se
                                        encuentra el tratamiento.
                                    </li>
                                </ul>

                                <h2>Estados de los tratamientos</h2>

                                <p>
                                    Cada tratamiento muestra un estado que permite identificar fácilmente
                                    su situación dentro del sistema.
                                </p>

                                <ul>
                                    <li>
                                        <strong>ACTIVO:</strong> indica que el tratamiento se encuentra
                                        actualmente en curso.
                                    </li>

                                    <li>
                                        <strong>FINALIZADO:</strong> indica que el tratamiento ya concluyó
                                        y permanece disponible dentro del historial para su consulta.
                                    </li>

                                    <li>
                                        <strong>CANCELADO:</strong> indica que el tratamiento fue cancelado
                                        antes de completar su seguimiento.
                                    </li>
                                </ul>

                                <h2>Filtrar tratamientos</h2>

                                <p>
                                    En la parte superior derecha de la tabla se encuentra la opción
                                    <strong> Filtrar</strong>. Esta herramienta permite organizar los
                                    tratamientos de acuerdo con su estado.
                                </p>

                                <p>
                                    El paciente puede utilizar esta opción para consultar únicamente los
                                    tratamientos <strong>activos</strong>, <strong>finalizados</strong> o
                                    <strong> cancelados</strong>, facilitando la búsqueda cuando existen
                                    varios registros.
                                </p>

                                <h2>Consultar un tratamiento</h2>

                                <p>
                                    En el extremo derecho de cada tratamiento se encuentra un botón con un
                                    <strong> ícono en forma de ojo</strong>. Al seleccionarlo, el sistema
                                    permite acceder nuevamente a la información correspondiente al
                                    tratamiento elegido.
                                </p>

                                <p>
                                    Desde esta opción el paciente puede revisar con mayor detalle la
                                    información relacionada con el tratamiento seleccionado.
                                </p>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>
                                        Verifique sus <strong>datos generales</strong> mostrados en la
                                        parte superior de la pantalla.
                                    </li>

                                    <li>
                                        Consulte la tabla del <strong>historial clínico</strong> para
                                        visualizar los tratamientos registrados.
                                    </li>

                                    <li>
                                        Revise la <strong>fecha, diagnóstico y médico</strong>
                                        correspondientes a cada tratamiento.
                                    </li>

                                    <li>
                                        Consulte la columna <strong>Estado</strong> para identificar si
                                        el tratamiento está activo, finalizado o cancelado.
                                    </li>

                                    <li>
                                        Utilice la opción <strong>Filtrar</strong> para mostrar únicamente
                                        los tratamientos correspondientes al estado que desea consultar.
                                    </li>

                                    <li>
                                        Presione el botón con el <strong>ícono de ojo</strong> para acceder
                                        al tratamiento seleccionado y consultar su información.
                                    </li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "tratamientos" && (
                            <section>
                                <h1>4. Tratamientos actuales</h1>

                                <p>
                                    La sección <strong>Tratamientos actuales</strong> permite al paciente
                                    consultar los tratamientos médicos que tiene registrados dentro de
                                    Pills Here y acceder a la información detallada de cada uno.
                                </p>

                                <p>
                                    Desde esta sección es posible revisar el diagnóstico, el médico
                                    responsable, el estado del tratamiento, los medicamentos indicados,
                                    las recomendaciones médicas y el seguimiento de las dosis programadas.
                                </p>

                                <h2>Lista de tratamientos</h2>

                                <div className="manual-imagen-container">
                                    <img
                                        src={tratamientosActualesImg}
                                        alt="Pantalla de tratamientos actuales del paciente"
                                        className="manual-imagen"
                                    />
                                </div>

                                <p>
                                    Al ingresar a esta sección se muestra la información general del
                                    paciente y una tabla con los tratamientos que se encuentran registrados
                                    en su cuenta.
                                </p>

                                <p>
                                    Cada tratamiento muestra la siguiente información:
                                </p>

                                <ul>
                                    <li>
                                        <strong>Fecha:</strong> indica la fecha en la que comenzó o fue
                                        registrado el tratamiento.
                                    </li>

                                    <li>
                                        <strong>Diagnóstico:</strong> muestra el diagnóstico relacionado
                                        con el tratamiento indicado por el médico.
                                    </li>

                                    <li>
                                        <strong>Médico:</strong> muestra el nombre del médico responsable
                                        del tratamiento.
                                    </li>

                                    <li>
                                        <strong>Estado:</strong> permite identificar si el tratamiento
                                        se encuentra actualmente activo.
                                    </li>
                                </ul>

                                <p>
                                    Para consultar un tratamiento, seleccione el botón <strong>Ver Tratamiento</strong>.
                                    El sistema mostrará la pantalla con toda la información relacionada
                                    con ese tratamiento.
                                </p>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>
                                        Ingrese a <strong>Tratamientos actuales</strong> desde el panel
                                        principal.
                                    </li>

                                    <li>
                                        Revise la lista de tratamientos disponibles.
                                    </li>

                                    <li>
                                        Identifique el tratamiento que desea consultar mediante su
                                        <strong> fecha, diagnóstico, médico y estado</strong>.
                                    </li>

                                    <li>
                                        Seleccione el tratamiento para acceder a su información detallada.
                                    </li>
                                </ol>

                            </section>
                        )}

                        {seccionActiva === "detalle" && (
                            <section>
                                <h2>Información general del tratamiento</h2>

                                <p>
                                    Al acceder a un tratamiento se muestra, en la parte superior, el
                                    <strong> nombre del tratamiento</strong> y la información relacionada
                                    con el paciente y la indicación médica.
                                </p>

                                <p>Entre los datos disponibles se encuentran:</p>

                                <ul>
                                    <li>
                                        <strong>Paciente:</strong> muestra el nombre de la persona a quien
                                        pertenece el tratamiento.
                                    </li>

                                    <li>
                                        <strong>Edad:</strong> muestra la edad registrada del paciente.
                                    </li>

                                    <li>
                                        <strong>Sexo:</strong> muestra el sexo registrado.
                                    </li>

                                    <li>
                                        <strong>Diagnóstico:</strong> indica la condición médica asociada
                                        al tratamiento.
                                    </li>

                                    <li>
                                        <strong>Médico:</strong> muestra el nombre del médico responsable.
                                    </li>

                                    <li>
                                        <strong>Fecha de inicio:</strong> indica la fecha correspondiente
                                        al inicio del tratamiento.
                                    </li>
                                </ul>

                                <div className="manual-imagen-container">
                                    <img
                                        src={detalleTratamiento1Img}
                                        alt="Detalle e información general del tratamiento"
                                        className="manual-imagen"
                                    />
                                </div>

                                <div className="manual-imagen-container">
                                    <img
                                        src={detalleTratamiento2Img}
                                        alt="Control de dosis pendientes, omitidas y tomadas"
                                        className="manual-imagen"
                                    />
                                </div>
                                <h2>Estado y cumplimiento</h2>

                                <p>
                                    Debajo de los datos generales se muestra el
                                    <strong> estado actual del tratamiento</strong> y el
                                    <strong> porcentaje de cumplimiento</strong> de dicho tratamiento.
                                </p>

                                <p>
                                    El porcentaje de cumplimiento permite conocer el avance registrado
                                    de acuerdo con las dosis que han sido tomadas durante el tratamiento.
                                </p>

                                <h2>Medicamentos y recomendaciones</h2>

                                <p>
                                    En el apartado de <strong>Medicamentos</strong> se muestran los
                                    medicamentos indicados por el médico, así como la cantidad,
                                    frecuencia y duración correspondiente.
                                </p>

                                <p>
                                    También se encuentra el apartado de <strong>Recomendaciones</strong>,
                                    donde se muestran indicaciones adicionales proporcionadas por el médico
                                    para complementar el seguimiento del tratamiento.
                                </p>

                                <h2>Cumplimiento de medicación</h2>

                                <p>
                                    La gráfica de <strong>Cumplimiento de Medicación</strong> permite
                                    visualizar el comportamiento de las dosis registradas durante el
                                    tratamiento.
                                </p>

                                <p>
                                    Cada color representa un estado diferente:
                                </p>

                                <ul>
                                    <li>
                                        <strong>Tomadas:</strong> corresponde a las dosis que el paciente
                                        registró como tomadas.
                                    </li>

                                    <li>
                                        <strong>Pendientes:</strong> corresponde a las dosis programadas
                                        que todavía se encuentran pendientes.
                                    </li>

                                    <li>
                                        <strong>No tomadas:</strong> corresponde a las dosis que no fueron
                                        registradas como tomadas durante el periodo correspondiente.
                                    </li>
                                </ul>

                                <p>
                                    La gráfica permite revisar el número de dosis de cada estado por día,
                                    facilitando la consulta del progreso del tratamiento.
                                </p>

                                <h2>Control de dosis</h2>


                                <p>
                                    En la parte inferior del detalle del tratamiento se encuentra el
                                    apartado para consultar y administrar las dosis correspondientes
                                    a los medicamentos.
                                </p>

                                <p>
                                    Las dosis se encuentran organizadas en tres categorías:
                                </p>

                                <ul>
                                    <li>
                                        <strong>Pendientes:</strong> muestra las dosis que todavía deben
                                        ser registradas por el paciente.
                                    </li>

                                    <li>
                                        <strong>Omitidas:</strong> muestra las dosis que no fueron
                                        registradas dentro del horario correspondiente.
                                    </li>

                                    <li>
                                        <strong>Tomadas:</strong> muestra las dosis que ya fueron
                                        confirmadas como tomadas.
                                    </li>
                                </ul>

                                <p>
                                    El número que aparece junto al nombre de cada categoría indica la
                                    cantidad de dosis que actualmente se encuentran en ese estado.
                                </p>

                                <h2>Dosis pendientes</h2>

                                <p>
                                    Dentro de la pestaña <strong>Pendientes</strong> se muestran los
                                    medicamentos que todavía tienen una dosis pendiente de registrar.
                                    Cada registro presenta información como el nombre del medicamento,
                                    la hora programada, la cantidad indicada y la frecuencia de consumo.
                                </p>

                                <h2>Marcar una dosis como tomada</h2>

                                <p>
                                    Cuando el paciente haya tomado el medicamento correspondiente, debe
                                    utilizar el botón <strong>Marcar como tomada</strong>.
                                </p>

                                <p>
                                    Al realizar esta acción, la dosis dejará de aparecer como pendiente
                                    y pasará a formar parte del registro de dosis tomadas. Esta información
                                    también se utiliza para actualizar las estadísticas y el porcentaje
                                    de cumplimiento del tratamiento.
                                </p>

                                <div className="manual-aviso">
                                    <strong>Importante:</strong> El paciente debe marcar una dosis como
                                    tomada únicamente después de haber consumido el medicamento
                                    correspondiente. El registro correcto de las tomas permite que las
                                    estadísticas de seguimiento reflejen adecuadamente el cumplimiento
                                    del tratamiento.
                                </div>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>
                                        Revise los datos generales, medicamentos y recomendaciones
                                        indicadas por el médico.
                                    </li>

                                    <li>
                                        Consulte el <strong>estado</strong> y el
                                        <strong> porcentaje de cumplimiento</strong> del tratamiento.
                                    </li>

                                    <li>
                                        Revise la gráfica de <strong>Cumplimiento de Medicación</strong> para conocer el seguimiento de las dosis.
                                    </li>

                                    <li>
                                        Utilice las pestañas <strong>Pendientes, Omitidas y Tomadas</strong> para consultar el estado de las dosis registradas.
                                    </li>

                                    <li>
                                        Cuando tome una dosis pendiente, presione
                                        <strong> Marcar como tomada</strong> en el medicamento
                                        correspondiente.
                                    </li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "estadisticas" && (
                            <section>
                                <h1>7. Estadísticas</h1>

                                <p>
                                    La sección de <strong>Estadísticas</strong> permite al paciente consultar
                                    de forma visual el seguimiento de sus medicamentos y conocer el nivel de
                                    cumplimiento registrado dentro de Pills Here.
                                </p>

                                <p>
                                    El sistema presenta estadísticas generales de todas las tomas registradas
                                    y también estadísticas específicas para cada tratamiento.
                                </p>

                                <h2>Estadística general de cumplimiento</h2>

                                <div className="manual-imagen-container">
                                    <img
                                        src={estadisticaGeneralImg}
                                        alt="Estadística general de cumplimiento del paciente"
                                        className="manual-imagen"
                                    />
                                </div>

                                <p>
                                    En el panel principal se encuentra la
                                    <strong> Estadística de cumplimiento</strong>, donde se muestra una gráfica
                                    circular que representa una <strong>gráfica general</strong> de las dosis registradas para el
                                    paciente al rededor de todos sus tratamientos en conjunto, mostrando el seguimiento del paciente y su cumplimiento.
                                </p>

                                <p>
                                    La gráfica utiliza diferentes colores para distinguir cada tipo de registro:
                                </p>

                                <ul>
                                    <li>
                                        <strong>Tomadas:</strong> representa las dosis que el paciente registró
                                        como tomadas correctamente.
                                    </li>

                                    <li>
                                        <strong>Pendientes:</strong> representa las dosis programadas que todavía
                                        se encuentran pendientes de registrar.
                                    </li>

                                    <li>
                                        <strong>Omitidas:</strong> representa las dosis que no fueron registradas
                                        como tomadas dentro del periodo correspondiente.
                                    </li>
                                </ul>

                                <p>
                                    Junto a cada categoría se muestra la cantidad total de dosis que se
                                    encuentran en ese estado.
                                </p>

                                <h2>Porcentajes de la gráfica</h2>

                                <p>
                                    Alrededor de la gráfica circular se muestran porcentajes que representan
                                    la proporción que ocupa cada categoría respecto al total de dosis
                                    registradas.
                                </p>

                                <p>
                                    Esto permite identificar rápidamente qué parte del seguimiento corresponde
                                    a dosis tomadas, pendientes u omitidas.
                                </p>

                                <h2>Porcentaje de cumplimiento</h2>

                                <p>
                                    En la parte inferior del panel se muestra el
                                    <strong> porcentaje de cumplimiento</strong>. Este valor refleja el nivel
                                    de seguimiento logrado de acuerdo con las dosis tomadas frente a las dosis
                                    que ya fueron tomadas u omitidas.
                                </p>

                                <p>
                                    Por ejemplo, si se muestra un cumplimiento del <strong>17%</strong>,
                                    significa que, considerando las dosis que ya cuentan con un resultado,
                                    una parte de ellas fue registrada correctamente como tomada.
                                </p>

                                <div className="manual-aviso">
                                    <strong>Importante:</strong> Las dosis pendientes todavía no se consideran
                                    como tomadas ni omitidas mientras continúen dentro de su periodo de registro.
                                </div>

                                <h2>Estadísticas por tratamiento</h2>

                                <div className="manual-imagen-container">
                                    <img
                                        src={estadisticasPorTratamientoImg}
                                        alt="Estadísticas de cumplimiento de un tratamiento"
                                        className="manual-imagen"
                                    />
                                </div>

                                <p>
                                    Al consultar el detalle de un tratamiento, el paciente puede visualizar
                                    una gráfica de <strong>Cumplimiento de Medicación</strong> correspondiente
                                    únicamente al tratamiento seleccionado.
                                </p>

                                <p>
                                    Esta gráfica permite conocer cuántas dosis fueron tomadas, cuántas se
                                    encuentran pendientes y cuántas no fueron tomadas durante cada día del
                                    tratamiento.
                                </p>

                                <h2>Información por día</h2>

                                <p>
                                    Cada columna de la gráfica corresponde a una fecha del tratamiento.
                                    Los colores permiten identificar los diferentes estados de las dosis:
                                </p>

                                <ul>
                                    <li>
                                        <strong>Verde - Tomadas:</strong> dosis registradas como tomadas.
                                    </li>

                                    <li>
                                        <strong>Amarillo - Pendientes:</strong> dosis que todavía esperan
                                        ser registradas.
                                    </li>

                                    <li>
                                        <strong>Rojo - No tomadas:</strong> dosis que no fueron registradas
                                        como tomadas dentro del periodo correspondiente.
                                    </li>
                                </ul>

                                <h2>Consultar el detalle de una fecha</h2>

                                <p>
                                    Al colocar el cursor sobre una columna de la gráfica, se muestra un
                                    recuadro con la información correspondiente al día seleccionado.
                                </p>

                                <p>
                                    En este recuadro puede consultarse:
                                </p>

                                <ul>
                                    <li>
                                        La <strong>fecha</strong> seleccionada.
                                    </li>

                                    <li>
                                        El número de dosis <strong>no tomadas</strong>.
                                    </li>

                                    <li>
                                        El número de dosis <strong>pendientes</strong>.
                                    </li>

                                    <li>
                                        El número de dosis <strong>tomadas</strong>.
                                    </li>
                                </ul>

                                <h2>Estado y cumplimiento del tratamiento</h2>

                                <p>
                                    En la parte superior del detalle también se muestra el
                                    <strong> estado del tratamiento</strong> y su
                                    <strong> porcentaje de cumplimiento</strong>.
                                </p>

                                <p>
                                    Esta información permite conocer el avance de un tratamiento específico,
                                    mientras que la gráfica general del panel de inicio ofrece una visión
                                    conjunta del seguimiento del paciente.
                                </p>

                                <h2>¿Cómo consultar las estadísticas?</h2>

                                <ol>
                                    <li>
                                        Desde el panel de inicio, localice la sección
                                        <strong> Estadística de cumplimiento</strong>.
                                    </li>

                                    <li>
                                        Revise la gráfica circular para conocer la distribución general de
                                        dosis tomadas, pendientes y omitidas.
                                    </li>

                                    <li>
                                        Consulte las cantidades mostradas junto a cada categoría.
                                    </li>

                                    <li>
                                        Revise el <strong>porcentaje de cumplimiento</strong> mostrado en
                                        la parte inferior.
                                    </li>

                                    <li>
                                        Para consultar estadísticas de un tratamiento específico, ingrese a
                                        <strong> Tratamientos actuales</strong> y seleccione el tratamiento
                                        correspondiente.
                                    </li>

                                    <li>
                                        Localice la gráfica de <strong>Cumplimiento de Medicación</strong>.
                                    </li>

                                    <li>
                                        Revise los colores para identificar las dosis tomadas, pendientes
                                        y no tomadas de cada fecha.
                                    </li>

                                    <li>
                                        Coloque el cursor sobre una columna para consultar el detalle de las
                                        dosis correspondientes a ese día.
                                    </li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "calendario" && (
                            <section>
                                <h1>6. Calendario de medicación</h1>

                                <p>
                                    La sección <strong>Calendario de medicación</strong> permite al paciente
                                    visualizar de forma organizada los días en los que tiene medicamentos
                                    programados dentro de sus tratamientos.
                                </p>

                                <p>
                                    El calendario facilita la identificación de los periodos correspondientes
                                    a cada tratamiento y permite consultar qué medicamentos están relacionados
                                    con determinados días.
                                </p>

                                <div className="manual-imagen-container">
                                    <img
                                        src={calendario1Img}
                                        alt="Calendario de medicación del paciente en Pills Here"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>Visualización del calendario</h2>

                                <p>
                                    En la parte superior se muestra el <strong>mes y año</strong> que se está
                                    consultando. Debajo se encuentra el calendario organizado por semanas y
                                    días, permitiendo visualizar la programación correspondiente a cada fecha.
                                </p>

                                <p>
                                    Los días se encuentran distribuidos de domingo a sábado y cada celda
                                    representa una fecha específica del mes.
                                </p>

                                <h2>Indicadores de tratamientos</h2>

                                <p>
                                    Dentro de determinados días pueden aparecer
                                    <strong> barras de diferentes colores</strong>. Estas barras representan
                                    los tratamientos que se encuentran programados para esa fecha.
                                </p>

                                <p>
                                    Cada tratamiento utiliza un color para poder diferenciarlo visualmente
                                    de los demás. Cuando existen varios tratamientos activos al mismo tiempo,
                                    pueden aparecer varias barras dentro de un mismo día.
                                </p>

                                <p>
                                    De esta manera, el paciente puede identificar rápidamente los días en los
                                    que tiene medicamentos correspondientes a uno o varios tratamientos.
                                </p>

                                <h2>Consultar los medicamentos de un día</h2>

                                <div className="manual-imagen-container">
                                    <img
                                        src={calendario2Img}
                                        alt="Detalle de tratamientos y medicamentos en el calendario"
                                        className="manual-imagen"
                                    />
                                </div>

                                <p>
                                    Al colocar el cursor sobre un día que contiene tratamientos programados,
                                    el sistema muestra un panel con información detallada sobre los tratamientos
                                    correspondientes a esa fecha.
                                </p>

                                <p>
                                    Dentro de este panel se muestra el nombre de cada
                                    <strong> tratamiento</strong> y los medicamentos asociados a él.
                                </p>

                                <h2>Medicamentos mostrados</h2>

                                <p>
                                    Los medicamentos aparecen agrupados debajo del tratamiento al que
                                    pertenecen. Esto permite identificar de manera sencilla qué medicamentos
                                    forman parte de cada indicación médica.
                                </p>

                                <p>
                                    En la información mostrada pueden aparecer distintos medicamentos dentro
                                    de un mismo tratamiento, permitiendo consultar la programación completa
                                    correspondiente a ese día.
                                </p>

                                <h2>Identificación por colores</h2>

                                <p>
                                    Los tratamientos y medicamentos se muestran mediante indicadores visuales
                                    de diferentes colores para facilitar su identificación dentro del
                                    calendario.
                                </p>

                                <p>
                                    El color de la barra que aparece en el calendario permite relacionar el
                                    día seleccionado con el tratamiento mostrado en el panel de información.
                                </p>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>
                                        Ingrese a la sección <strong>Calendario de medicación</strong>
                                        desde el panel principal.
                                    </li>

                                    <li>
                                        Identifique el <strong>mes y año</strong> mostrados en la parte
                                        superior del calendario.
                                    </li>

                                    <li>
                                        Revise los días que contienen <strong>barras de colores</strong>,
                                        ya que estas representan tratamientos programados.
                                    </li>

                                    <li>
                                        Localice la fecha que desea consultar.
                                    </li>

                                    <li>
                                        Coloque el cursor sobre el día correspondiente para visualizar
                                        la información detallada.
                                    </li>

                                    <li>
                                        Revise el nombre del <strong>tratamiento</strong> mostrado en el panel.
                                    </li>

                                    <li>
                                        Consulte los <strong>medicamentos</strong> asociados al tratamiento
                                        para conocer cuáles corresponden a esa fecha.
                                    </li>

                                    <li>
                                        Si existen varios tratamientos en el mismo día, utilice los colores
                                        para distinguir la información correspondiente a cada uno.
                                    </li>
                                </ol>

                                <div className="manual-aviso">
                                    <strong>Importante:</strong> El calendario funciona como una herramienta
                                    visual para consultar la programación de los tratamientos. Para revisar
                                    horarios, dosis y el estado de cada toma, consulte también el detalle del
                                    tratamiento correspondiente.
                                </div>
                            </section>
                        )}

                        {seccionActiva === "perfil" && (
                            <section>
                                <h1>9. Perfil del paciente</h1>

                                <p>
                                    La sección <strong>Perfil del paciente</strong> permite consultar la
                                    información personal y de contacto registrada en la cuenta de Pills Here.
                                    Desde esta pantalla el paciente puede verificar los datos asociados a su
                                    perfil y acceder a la opción para cerrar su sesión.
                                </p>

                                <div className="manual-imagen-container">
                                    <img
                                        src={perfilPacienteImg}
                                        alt="Perfil del paciente en Pills Here"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>Información del paciente</h2>

                                <p>
                                    En la parte principal del perfil se muestra la información general
                                    correspondiente a la cuenta del paciente.
                                </p>

                                <p>En esta sección se pueden consultar los siguientes datos:</p>

                                <ul>
                                    <li>
                                        <strong>Nombre:</strong> muestra el nombre completo registrado
                                        del paciente.
                                    </li>

                                    <li>
                                        <strong>ID:</strong> muestra el identificador asignado al paciente
                                        dentro del sistema.
                                    </li>

                                    <li>
                                        <strong>Edad:</strong> indica la edad actual del paciente.
                                    </li>

                                    <li>
                                        <strong>Sexo:</strong> muestra el sexo registrado en la cuenta.
                                    </li>
                                </ul>

                                <h2>Información de contacto</h2>

                                <p>
                                    Debajo de los datos generales se encuentra el apartado
                                    <strong> Información de contacto</strong>, donde se muestran datos
                                    adicionales relacionados con la cuenta del paciente.
                                </p>

                                <ul>
                                    <li>
                                        <strong>Correo electrónico:</strong> muestra el correo registrado
                                        en la cuenta de Pills Here.
                                    </li>

                                    <li>
                                        <strong>Código de paciente:</strong> muestra el código único
                                        asignado al paciente, identificado mediante el formato
                                        <strong> PAC-######</strong>.
                                    </li>

                                    <li>
                                        <strong>Fecha de nacimiento:</strong> muestra la fecha de nacimiento
                                        registrada en la cuenta.
                                    </li>
                                </ul>

                                <h2>Código de paciente</h2>

                                <p>
                                    El <strong>código de paciente</strong> permite identificar al usuario
                                    dentro de Pills Here y es utilizado para realizar la vinculación entre
                                    el paciente y un médico.
                                </p>

                                <p>
                                    Cuando un médico necesite agregar al paciente a su lista de pacientes,
                                    deberá utilizar este código para realizar la vinculación correspondiente.
                                </p>

                                <div className="manual-aviso">
                                    <strong>Importante:</strong> El código de paciente es único para cada
                                    cuenta. Antes de proporcionarlo a un médico, verifique que el código
                                    mostrado en su perfil sea el correcto.
                                </div>

                                <h2>Cerrar sesión</h2>

                                <p>
                                    En la parte inferior de la información del perfil se encuentra el botón
                                    <strong> Cerrar sesión</strong>. Esta opción permite finalizar la sesión
                                    actual y salir de la cuenta del paciente.
                                </p>

                                <p>
                                    Al cerrar sesión, será necesario ingresar nuevamente las credenciales
                                    correspondientes para volver a acceder a las funciones de Pills Here.
                                </p>

                                <h2>¿Cómo acceder al perfil?</h2>

                                <ol>
                                    <li>
                                        Localice el <strong>ícono de perfil</strong> ubicado en la esquina
                                        superior derecha de la aplicación.
                                    </li>

                                    <li>
                                        Presione el ícono para ingresar al
                                        <strong> Perfil del paciente</strong>.
                                    </li>

                                    <li>
                                        Consulte su nombre, identificador, edad y sexo registrados.
                                    </li>

                                    <li>
                                        Revise el apartado <strong>Información de contacto</strong> para
                                        consultar su correo electrónico, código de paciente y fecha de
                                        nacimiento.
                                    </li>

                                    <li>
                                        Cuando necesite proporcionar su código a un médico, consulte el
                                        código <strong>PAC-######</strong> mostrado en esta pantalla.
                                    </li>

                                    <li>
                                        Para finalizar su sesión, presione el botón
                                        <strong> Cerrar sesión</strong>.
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

export default ManualPaciente;