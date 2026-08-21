import { useEffect, useRef, useState } from "react";
import "./ManualMedico.css";
import inicioMedicoImg from "../../assets/manual/medico/inicio.png";
import pacientesMedicoImg from "../../assets/manual/medico/pacientes.png"
import nuevoPacienteImg from "../../assets/manual/medico/nuevoPaciente.png"
import detallesPacienteImg from "../../assets/manual/medico/detallesPaciente.png"
import tratamiento1Img from "../../assets/manual/medico/tratamiento1.png"
import tratamiento2Img from "../../assets/manual/medico/tratamiento2.png"
import crudTratamientoImg from "../../assets/manual/medico/crudTratamiento.png"
import historialClinicoImg from "../../assets/manual/medico/historialClinico.png"
import crearTratamientoImg from "../../assets/manual/medico/crearTratamiento.png"
import estadisticaGeneralImg from "../../assets/manual/medico/estadisticaGeneral.png"
import estadisticaTratamientoImg from "../../assets/manual/medico/estadisticaTratamiento.png"
import perfilImg from "../../assets/manual/medico/perfil.png"

function ManualMedico({ onCerrar }) {
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

                    <aside className="manual-menu"
                        ref={menuRef}>
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
                            3. Nuevo paciente
                        </button>

                        <button
                            className={seccionActiva === "detalle" ? "activo" : ""}
                            onClick={() => setSeccionActiva("detalle")}
                        >
                            4. Detalles del paciente
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
                            className={seccionActiva === "perfil" ? "activo" : ""}
                            onClick={() => setSeccionActiva("perfil")}
                        >
                            9. Perfil
                        </button>
                    </aside>

                    <main className="manual-contenido"
                        ref={contenidoRef}>

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
                                    La pantalla de Inicio es el panel principal del médico dentro de Pills Here.
                                    Desde esta sección se puede consultar un resumen general de la actividad registrada
                                    en el sistema y acceder rápidamente a las funciones más utilizadas.
                                </p>

                                <div className="manual-imagen-container">
                                    <img
                                        src={inicioMedicoImg}
                                        alt="Pantalla de inicio del médico en Pills Here"
                                        className="manual-imagen"
                                    />
                                </div>

                                <p>
                                    En la parte superior se muestra un mensaje de bienvenida con el nombre del médico que ha iniciado sesión.
                                    En la esquina superior derecha se encuentran los accesos a <strong>notificaciones</strong> y <strong>perfil</strong>,
                                    desde donde se puede consultar información relacionada con la cuenta.
                                </p>

                                <p>
                                    En el lado izquierdo se encuentra el menú principal de navegación. Desde este menú el médico puede desplazarse entre las siguientes opciones:
                                </p>
                                <ul>
                                    <li><strong>Inicio:</strong> permite regresar al panel principal.</li>
                                    <li><strong>Pacientes:</strong> muestra la lista de pacientes vinculados con el médico.</li>
                                    <li><strong>Nuevo Paciente:</strong> permite buscar y vincular un nuevo paciente mediante su código correspondiente.</li>
                                </ul>

                                <h2>Resumen de actividad</h2>
                                <p>
                                    En la parte central de la pantalla se encuentra el apartado <strong>Resumen de actividad</strong>, el cual permite consultar rápidamente información general sobre los pacientes y tratamientos registrados.
                                </p>
                                <ul>
                                    <li><strong>Pacientes:</strong> indica la cantidad total de pacientes vinculados con el médico.</li>
                                    <li><strong>Tratamientos Activos:</strong> muestra cuántos tratamientos se encuentran actualmente en curso.</li>
                                    <li><strong>Tratamientos Completos:</strong> muestra el número de tratamientos que ya han sido finalizados.</li>
                                </ul>
                                <p>Esta información se actualiza de acuerdo con los registros existentes en el sistema.</p>

                                <h2>Consultado recientemente</h2>
                                <p>
                                    En la parte inferior se encuentra la sección <strong>Consultado recientemente</strong>, donde se muestran los pacientes que han sido consultados recientemente por el médico.
                                </p>
                                <p>Para cada paciente se presenta la siguiente información:</p>
                                <ul>
                                    <li><strong>Nombre:</strong> muestra el nombre del paciente. Al seleccionar el nombre se puede acceder a la pantalla de detalle del paciente.</li>
                                    <li><strong>Edad / sexo:</strong> permite identificar rápidamente la edad y el sexo registrado del paciente.</li>
                                    <li><strong>Historial:</strong> contiene un botón con un ícono en forma de ojo que permite acceder directamente al historial clínico del paciente seleccionado.</li>
                                </ul>

                                <h2>Accesos superiores</h2>
                                <ul>
                                    <li><strong>Notificaciones:</strong> permite consultar los avisos o notificaciones disponibles para el médico.</li>
                                    <li><strong>Perfil:</strong> permite acceder a la información del perfil médico y a las opciones relacionadas con la cuenta.</li>
                                </ul>
                                <h2>Botón de ayuda</h2>
                                <p>
                                    En la esquina inferior derecha se encuentra el botón con el símbolo <strong>(?)</strong>.
                                    Al seleccionarlo se abre este manual de uso, desde el cual se pueden consultar
                                    las instrucciones correspondientes a cada función disponible para el médico.
                                </p>
                                <h2>¿Cómo utilizar esta pantalla?</h2>
                                <ol>
                                    <li>Inicie sesión con su cuenta de médico.</li>
                                    <li>Consulte el <strong>Resumen de actividad</strong> para conocer el número de pacientes y tratamientos registrados.</li>
                                    <li>Utilice el menú lateral para acceder a <strong>Pacientes</strong> o <strong>Nuevo Paciente</strong>.</li>
                                    <li>Revise la sección <strong>Consultado recientemente</strong> para acceder rápidamente a pacientes revisados con anterioridad.</li>
                                    <li>Seleccione el nombre de un paciente para consultar su información detallada.</li>
                                    <li>Utilice el botón con el ícono de ojo para acceder directamente a su historial clínico.</li>
                                    <li>Consulte las opciones de <strong>notificaciones</strong> y <strong>perfil</strong> desde la parte superior derecha.</li>
                                    <li>Si necesita ayuda sobre alguna función, presione el botón <strong>(?)</strong> ubicado en la esquina inferior derecha.</li>
                                </ol>

                            </section>
                        )}

                        {seccionActiva === "pacientes" && (
                            <section>
                                <h1>2. Pacientes</h1>

                                <p>
                                    La sección <strong>Pacientes</strong> permite al médico consultar a todos
                                    los pacientes que se encuentran actualmente vinculados con su cuenta
                                    en Pills Here. Desde esta pantalla puede localizar a un paciente,
                                    consultar sus datos generales y acceder a su historial clínico.
                                </p>

                                <div className="manual-imagen-container">
                                    <img
                                        src={pacientesMedicoImg}
                                        alt="Pantalla de pacientes actuales en Pills Here"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>Lista de pacientes</h2>

                                <p>
                                    En el apartado <strong>Lista de pacientes</strong> se muestran los
                                    pacientes que se encuentran vinculados con el médico. La información
                                    de cada paciente se organiza en las siguientes columnas:
                                </p>

                                <ul>
                                    <li>
                                        <strong>Nombre:</strong> muestra el nombre del paciente registrado.
                                        Al seleccionar el nombre, el sistema permite acceder a la información
                                        detallada del paciente.
                                    </li>

                                    <li>
                                        <strong>Edad / sexo:</strong> muestra la edad y el sexo registrados
                                        del paciente para facilitar su identificación.
                                    </li>

                                    <li>
                                        <strong>Historial:</strong> permite acceder directamente al historial
                                        clínico del paciente mediante el botón con el ícono en forma de ojo.
                                    </li>
                                </ul>

                                <p>
                                    Si el médico todavía no cuenta con pacientes vinculados, la lista
                                    permanecerá vacía hasta que se agregue un paciente.
                                </p>

                                <h2>Búsqueda de pacientes</h2>

                                <p>
                                    En la parte superior derecha de la lista se encuentra la
                                    <strong> barra de búsqueda</strong>. Esta herramienta permite localizar
                                    rápidamente a un paciente cuando existen varios registros.
                                </p>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>
                                        Consulte la <strong>Lista de pacientes</strong> para visualizar
                                        los pacientes actualmente vinculados.
                                    </li>

                                    <li>
                                        Utilice la <strong>barra de búsqueda</strong> para localizar a un
                                        paciente específico.
                                    </li>

                                    <li>
                                        Revise el <strong>nombre, edad y sexo</strong> para identificar
                                        al paciente que desea consultar.
                                    </li>

                                    <li>
                                        Seleccione el <strong>nombre del paciente</strong> para acceder
                                        a su información detallada.
                                    </li>

                                    <li>
                                        Presione el botón con el <strong>ícono de ojo</strong> ubicado
                                        en la columna Historial para consultar directamente su historial
                                        clínico.
                                    </li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "agregar" && (
                            <section>
                                <h1>3. Agregar un nuevo paciente</h1>

                                <p>
                                    La sección <strong>Agregar paciente</strong> permite al médico vincular
                                    a su cuenta un paciente que ya se encuentra registrado en Pills Here.
                                    Para realizar la vinculación es necesario contar con el código único
                                    proporcionado al paciente por el sistema.
                                </p>

                                <div className="manual-imagen-container">
                                    <img
                                        src={nuevoPacienteImg}
                                        alt="Pantalla para agregar un nuevo paciente en Pills Here"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>Ingresar código del paciente</h2>

                                <p>
                                    En el centro de la pantalla se encuentra el campo
                                    <strong> Ingresar código de paciente</strong>. En este espacio el médico
                                    debe escribir el código correspondiente al paciente que desea vincular.
                                </p>

                                <p>
                                    El código identifica de manera única al paciente dentro de Pills Here
                                    y debe ser proporcionado por el propio paciente al médico.
                                </p>

                                <div className="manual-aviso">
                                    <strong>Importante:</strong> El código debe ingresarse correctamente y
                                    respetar el formato asignado por el sistema, por ejemplo:
                                    <strong> PAC-642978</strong>.
                                </div>

                                <h2>Agregar paciente</h2>

                                <p>
                                    Después de ingresar el código, se debe presionar el botón
                                    <strong> Agregar paciente</strong>. El sistema utilizará el código
                                    proporcionado para identificar al paciente y realizar la vinculación
                                    con la cuenta del médico.
                                </p>

                                <p>
                                    Una vez realizada correctamente la vinculación, el paciente podrá
                                    aparecer dentro de la sección <strong>Pacientes</strong>, desde donde
                                    el médico podrá acceder a su información y realizar las acciones
                                    correspondientes.
                                </p>

                                <h2>¿Cómo agregar un paciente?</h2>

                                <ol>
                                    <li>
                                        Solicite al paciente su <strong>código de paciente</strong> generado por Pills Here.
                                    </li>

                                    <li>
                                        Ingrese el código en el campo
                                        <strong> Ingresar código de paciente</strong>.
                                    </li>

                                    <li>
                                        Verifique que el código haya sido escrito correctamente.
                                    </li>

                                    <li>
                                        Presione el botón <strong>Agregar paciente</strong>.
                                    </li>

                                    <li>
                                        Espere a que el sistema procese la solicitud y realice la
                                        vinculación del paciente con su cuenta.
                                    </li>

                                    <li>
                                        Posteriormente se mostrará la informacion vinculada al paciente.
                                    </li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "detalle" && (
                            <section>
                                <h1>4. Detalles del paciente</h1>

                                <p>
                                    La sección <strong>Detalles del paciente</strong> permite al médico
                                    consultar la información de un paciente seleccionado y visualizar
                                    los tratamientos que tiene registrados dentro de Pills Here.
                                    Desde esta pantalla también es posible acceder a diferentes acciones
                                    relacionadas con la administración y seguimiento de sus tratamientos.
                                </p>

                                <div className="manual-imagen-container">
                                    <img
                                        src={detallesPacienteImg}
                                        alt="Pantalla de detalles del paciente en Pills Here"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>Información del paciente</h2>

                                <p>
                                    En esta pantalla se muestran los datos generales del paciente,
                                    permitiendo al médico identificar a la persona cuya información
                                    está consultando antes de realizar alguna acción relacionada con
                                    sus tratamientos.
                                </p>

                                <h2>Tratamientos del paciente</h2>

                                <p>
                                    En el apartado correspondiente a los tratamientos justo en la parte central, se mostrarán los tratamientos que
                                    han sido registrados para el paciente. Esta información permite al médico conocer los tratamientos
                                    existentes.
                                </p>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>
                                        Verifique la <strong>información del paciente</strong> que aparece
                                        en la pantalla.
                                    </li>

                                    <li>
                                        Consulte los <strong>tratamientos registrados</strong> para conocer
                                        las indicaciones médicas existentes.
                                    </li>

                                    <li>Consultar progresos del paciente en la <strong>Grafica general</strong> ubicada al costado derecho.</li>

                                    <li>
                                        Seleccione el tratamiento que desea consultar para visualizar
                                        su información.
                                    </li>

                                    <li>Agregar un nuevo comunicado para el paciente en la sección de <strong>Avisos</strong>.</li>

                                </ol>



                            </section>
                        )}

                        {seccionActiva === "historial" && (
                            <section>
                                <h1>5. Historial clínico</h1>

                                <p>
                                    La sección <strong>Historial clínico</strong> permite al médico consultar
                                    la información general de un paciente y revisar los tratamientos que
                                    han sido registrados dentro de Pills Here. Desde esta pantalla es posible
                                    identificar el diagnóstico, médico responsable, estado del tratamiento
                                    y acceder a su información detallada.
                                </p>

                                <div className="manual-imagen-container">
                                    <img
                                        src={historialClinicoImg}
                                        alt="Pantalla de historial clínico del paciente en Pills Here"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>Información del paciente</h2>

                                <p>
                                    En la parte superior de la pantalla se muestran los datos generales
                                    del paciente seleccionado. Esta información permite identificar
                                    correctamente a la persona cuyo historial clínico se está consultando.
                                </p>

                                <p>Los datos disponibles son:</p>

                                <ul>
                                    <li>
                                        <strong>Nombre:</strong> muestra el nombre completo del paciente.
                                    </li>

                                    <li>
                                        <strong>Código:</strong> muestra el código único asignado al
                                        paciente dentro de Pills Here.
                                    </li>

                                    <li>
                                        <strong>Fecha de nacimiento:</strong> muestra la fecha de nacimiento
                                        registrada del paciente.
                                    </li>

                                    <li>
                                        <strong>Sexo:</strong> muestra el sexo registrado del paciente.
                                    </li>

                                    <li>
                                        <strong>Tipo de sangre:</strong> permite consultar el grupo
                                        sanguíneo registrado.
                                    </li>

                                    <li>
                                        <strong>Alergias:</strong> muestra las alergias que hayan sido
                                        registradas para el paciente.
                                    </li>
                                </ul>

                                <h2>Historial de tratamientos</h2>

                                <p>
                                    En la parte inferior se encuentra la tabla del
                                    <strong> historial clínico</strong>, donde se muestran los tratamientos
                                    registrados del paciente.
                                </p>

                                <p>Cada registro contiene la siguiente información:</p>

                                <ul>
                                    <li>
                                        <strong>Fecha:</strong> indica la fecha en la que fue registrado
                                        el tratamiento.
                                    </li>

                                    <li>
                                        <strong>Diagnóstico:</strong> muestra el diagnóstico asociado
                                        al tratamiento.
                                    </li>

                                    <li>
                                        <strong>Médico:</strong> muestra el nombre del médico responsable
                                        del tratamiento registrado.
                                    </li>

                                    <li>
                                        <strong>Estado:</strong> indica la situación actual del tratamiento.
                                    </li>
                                </ul>

                                <h2>Estados de los tratamientos</h2>

                                <p>
                                    Cada tratamiento muestra un estado que permite identificar rápidamente
                                    su situación actual dentro del sistema.
                                </p>

                                <ul>
                                    <li>
                                        <strong>ACTIVO:</strong> indica que el tratamiento se encuentra
                                        actualmente en curso.
                                    </li>

                                    <li>
                                        <strong>FINALIZADO:</strong> indica que el tratamiento ya terminó
                                        y forma parte del historial del paciente.
                                    </li>

                                    <li>
                                        <strong>CANCELADO:</strong> indica que el tratamiento fue cancelado
                                        antes de finalizar normalmente.
                                    </li>
                                </ul>

                                <h2>Filtrar tratamientos</h2>

                                <p>
                                    En la parte superior derecha de la tabla se encuentra la opción
                                    <strong> Filtrar</strong>. Esta herramienta permite mostrar los
                                    tratamientos de acuerdo con su estado, facilitando la búsqueda de varios registros al médico.
                                </p>

                                <p>
                                    Por ejemplo, el médico puede utilizar el filtro para consultar únicamente
                                    tratamientos <strong>activos</strong>, <strong>finalizados</strong> o
                                    <strong> cancelados</strong>.
                                </p>

                                <h2>Consultar un tratamiento</h2>

                                <p>
                                    En el extremo derecho de cada registro se encuentra un botón con un
                                    <strong> ícono en forma de ojo</strong>. Al seleccionarlo, el sistema
                                    permite acceder a la información correspondiente al tratamiento elegido.
                                </p>

                                <p>
                                    De esta manera, el médico puede revisar un tratamiento específico sin
                                    perder de vista el historial general del paciente.
                                </p>

                                <h2>¿Cómo utilizar esta sección?</h2>

                                <ol>
                                    <li>
                                        Verifique los <strong>datos generales del paciente</strong> mostrados
                                        en la parte superior.
                                    </li>

                                    <li>
                                        Consulte la tabla para visualizar los tratamientos registrados
                                        en el historial clínico.
                                    </li>

                                    <li>
                                        Revise la <strong>fecha, diagnóstico y médico</strong> correspondientes
                                        a cada tratamiento.
                                    </li>

                                    <li>
                                        Consulte la columna <strong>Estado</strong> para identificar si el
                                        tratamiento se encuentra activo, finalizado o cancelado.
                                    </li>

                                    <li>
                                        Utilice la opción <strong>Filtrar</strong> para mostrar únicamente
                                        los tratamientos que correspondan al estado que desea consultar.
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
                                <h1>6. Tratamientos</h1>

                                <p>
                                    Desde esta sección el médico puede crear y administrar los
                                    tratamientos de sus pacientes.
                                </p>

                                <h2>Crear tratamiento</h2>

                                <p>
                                    Desde esta pantalla se encuentra disponible la opción para crear uno o varios tratamiento.
                                    Esta función permite registrar una nueva indicación médica para el paciente seleccionado.
                                </p>
                                <div className="manual-imagen-container">
                                    <img
                                        src={crearTratamientoImg}
                                        alt="Crear tratamiento"
                                        className="manual-imagen"
                                    />
                                </div>

                                <p>
                                    Al seleccionar la opción <strong>+Crear Tratamiento</strong>, el sistema mostrará el formulario
                                    correspondiente para ingresar los datos del tratamiento, los
                                    medicamentos que serán indicados al paciente y recomendaciones adicionales.
                                </p>

                                <div className="manual-imagen-container">
                                    <img
                                        src={tratamiento1Img}
                                        alt="tratamiento1"
                                        className="manual-imagen"
                                    />
                                </div>
                                <div className="manual-imagen-container">
                                    <img
                                        src={tratamiento2Img}
                                        alt="tratamiento2"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>Acciones sobre los tratamientos</h2>

                                <p>
                                    Dependiendo del tratamiento seleccionado, el médico
                                    puede acceder a las opciones disponibles para consultar, modificar o eliminar dicho tratamiento y su información.
                                    Estas acciones permiten mantener actualizada la información de los
                                    tratamientos registrados para el paciente y realizar su seguimiento
                                    desde Pills Here.
                                </p>
                                <div className="manual-imagen-container">
                                    <img
                                        src={crudTratamientoImg}
                                        alt="crudTratamiento"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>¿Cómo utilizar la funcionalidades de un tratamiento?</h2>

                                <ol>
                                    <li>
                                        Identificar el <strong>tratamiento</strong> deseado.
                                    </li>

                                    <li>
                                        Sidesea modificar o visualizar el <strong>tratamiento</strong>, selecciones el botón con idono de lapiz.
                                    </li>

                                    <li>
                                        Para eliminar el<strong>tratamiento</strong>, seleccione el botón con icono de basura.</li>
                                    <li>
                                        Si el Médico requiere dar una nueva indicación médica, seleccione
                                        la opción <strong>Crear tratamiento</strong>.
                                    </li>
                                </ol>
                            </section>
                        )}

                        {seccionActiva === "estadisticas" && (
                            <section>
                                <h1>7. Estadísticas</h1>

                                <p>
                                    Las estadísticas permiten analizar el progreso y cumplimiento
                                    del paciente en uno de sus tratamientos o en general, siendo el conjunto de todos sus tratamientos.
                                </p>

                                <h2>Estadística general</h2>

                                <div className="manual-imagen-container">
                                    <img
                                        src={estadisticaGeneralImg}
                                        alt="estadistica general"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>¿Cómo leer los datos de la estadística general?</h2>

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

                                <h2>Estadística por tratamiento</h2>

                                <div className="manual-imagen-container">
                                    <img
                                        src={estadisticaTratamientoImg}
                                        alt="estadistica por tratamiento"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>¿Qué muestra esta estadística por tratamiento?</h2>

                                <p>Muestra el porcentaje de progreso y cumplimiento del tratamiento individualmente. Cada taratamiento
                                    incluye su propia barra de porcentaje de cumplimiento.
                                </p>

                            </section>
                        )}


                        {seccionActiva === "perfil" && (
                            <section>
                                <h1>9. Perfil médico</h1>

                                <p>
                                    El perfil permite consultar la información registrada en la
                                    cuenta del médico.
                                </p>
                                <h2>¿Qué incluye esta sección?</h2>
                                <ol>
                                    <li>Nombre del médico.</li>
                                    <li>Especialidad.</li>
                                    <li>Correo electrónico.</li>
                                    <li>Fecha de nacimiento.</li>
                                    <li>Número de cédula profesional.</li>
                                    <li>Direccón del consultorio.</li>
                                    <li>
                                        Opción de <strong>cerrar sesión</strong>.
                                    </li>
                                </ol>

                                <div className="manual-imagen-container">
                                    <img
                                        src={perfilImg}
                                        alt="perfilMedico"
                                        className="manual-imagen"
                                    />
                                </div>

                                <h2>¿Cómo acceder?</h2>

                                <ol>
                                    <li>Presione el ícono de perfil ubicado en la parte superior derecha.</li>
                                    <li>Consulte la información de su cuenta.</li>

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