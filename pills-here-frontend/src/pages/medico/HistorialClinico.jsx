import "./HistorialClinico.css";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientes from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import iconUsuario from "../../assets/images/icon-perfilP.png";

function HistorialClinico() {
    const navigate = useNavigate();

    const historial = [
        {
            fecha: "12 de marzo, 2025",
            diagnostico: "Hipertensión Arterial",
            medico: "Dr. Jorge Gonzalez",
            estado: "Activo",
        },
        {
            fecha: "12 de marzo, 2025",
            diagnostico: "Hipertensión Arterial",
            medico: "Dr. Jorge Gonzalez",
            estado: "Activo",
        },
        {
            fecha: "12 de marzo, 2025",
            diagnostico: "Hipertensión Arterial",
            medico: "Dr. Jorge Gonzalez",
            estado: "Finalizado",
        },
        {
            fecha: "12 de marzo, 2025",
            diagnostico: "Hipertensión Arterial",
            medico: "Dr. Jorge Gonzalez",
            estado: "Finalizado",
        },
        {
            fecha: "12 de marzo, 2025",
            diagnostico: "Hipertensión Arterial",
            medico: "Dr. Jorge Gonzalez",
            estado: "Finalizado",
        },
    ];

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
                        onClick={() => navigate("/")}
                    />
                </div>
            </aside>



            <main className="contenido-medico">
                <div className="encabezado-superior">
                    <h1>Historial Clínico de: Manuel Torres</h1>

                    <div className="acciones-superiores">
                        <button className="btn-notificacion">
                            <img src={iconNotificacion} alt="Notificaciones" />
                        </button>

                        <button className="btn-perfil">
                            <img src={iconPerfil} alt="Perfil" width="28" />
                        </button>
                    </div>
                </div>

                <section className="historial-info">
                    <img src={iconUsuario} alt="Usuario" className="historial-avatar" />

                    <div className="historial-datos">
                        <p><strong>Manuel Torres</strong> ID:#34598</p>
                        <p>Edad: 48 años.</p>
                        <p>Sexo: Masculino</p>
                        <p>Fecha de nacimiento: 05-08-1964</p>
                    </div>
                </section>


                <section className="historial-tabla">
                    <div className="tabla-head historial-head">
                        <span>Fecha</span>
                        <span>Diagnóstico</span>
                        <span>Médico</span>
                        <span>Estado</span>
                    </div>

                    {historial.map((item, index) => (
                        <div key={index} className="tabla-row historial-row">
                            <span>{item.fecha}</span>
                            <span>{item.diagnostico}</span>
                            <span>{item.medico}</span>
                            <span>
                                <span
                                    className={`estado-badge ${item.estado === "Activo"
                                        ? "estado-activo"
                                        : "estado-finalizado"
                                        }`}
                                >
                                    ● {item.estado}
                                </span>
                            </span>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default HistorialClinico;