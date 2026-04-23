import "./CrearTratamiento.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientes from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import iconBorrar from "../../assets/images/borrar-icon.png";

function CrearTratamiento() {
  const navigate = useNavigate();

  const medicamentosDisponibles = [
    {
      id: 1,
      nombre: "Paracetamol",
      presentacion: "Tableta",
      via: "Oral",
    },
    {
      id: 2,
      nombre: "Pantoprazol",
      presentacion: "Tableta",
      via: "Oral",
    },
    {
      id: 3,
      nombre: "Prednisona",
      presentacion: "Tableta",
      via: "Oral",
    },
    {
      id: 4,
      nombre: "Pregabalina",
      presentacion: "Cápsula",
      via: "Oral",
    },
    {
      id: 5,
      nombre: "Prometazina",
      presentacion: "Jarabe",
      via: "Oral",
    },
  ];

  const [busqueda, setBusqueda] = useState("");
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const [medicamentos, setMedicamentos] = useState([
    {
      id: 101,
      nombre: "Fluticasona",
      dosis: "1 cada 6 horas",
      presentacion: "De patente",
      via: "Tomada",
    },
    {
      id: 102,
      nombre: "Budesonida",
      dosis: "1-2 Inhalaciones cada 4-6 horas",
      presentacion: "De patente",
      via: "Inhalador",
    },
  ]);

  const sugerenciasFiltradas = medicamentosDisponibles.filter((medicamento) =>
    medicamento.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const manejarCambioBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    setMostrarSugerencias(valor.trim().length > 0);
  };

  const seleccionarMedicamento = (medicamentoSeleccionado) => {
    const yaExiste = medicamentos.some(
      (medicamento) => medicamento.nombre === medicamentoSeleccionado.nombre
    );

    if (yaExiste) {
      setBusqueda("");
      setMostrarSugerencias(false);
      return;
    }

    const nuevoMedicamento = {
      id: medicamentoSeleccionado.id,
      nombre: medicamentoSeleccionado.nombre,
      dosis: "",
      presentacion: medicamentoSeleccionado.presentacion,
      via: medicamentoSeleccionado.via,
    };

    setMedicamentos([...medicamentos, nuevoMedicamento]);
    setBusqueda("");
    setMostrarSugerencias(false);
  };

  const eliminarMedicamento = (index) => {
    const nuevos = medicamentos.filter((_, i) => i !== index);
    setMedicamentos(nuevos);
  };

  const actualizarDosis = (index, nuevaDosis) => {
    const nuevosMedicamentos = [...medicamentos];
    nuevosMedicamentos[index].dosis = nuevaDosis;
    setMedicamentos(nuevosMedicamentos);
  };

  return (
    <div className="crear-tratamiento-page">
      <aside className="crear-tratamiento-sidebar">
        <div className="crear-tratamiento-sidebar-logo">
          <img src={logo} alt="Logo Pills Here" className="crear-tratamiento-logo-img" />
        </div>

        <nav className="crear-tratamiento-sidebar-nav">
          <button
            className="crear-tratamiento-nav-item"
            type="button"
            onClick={() => navigate("/inicio-medico")}
          >
            <img src={iconHome} alt="Inicio" className="crear-tratamiento-nav-icon" />
            <span>Inicio</span>
          </button>

          <button
            className="crear-tratamiento-nav-item active"
            type="button"
            onClick={() => navigate("/lista-pacientes")}
          >
            <img src={iconPacientes} alt="Pacientes" className="crear-tratamiento-nav-icon" />
            <span>Pacientes</span>
          </button>

          <button
            className="crear-tratamiento-nav-item"
            type="button"
            onClick={() => navigate("/nuevo-paciente")}
          >
            <img
              src={iconAgregarPaciente}
              alt="Nuevo Paciente"
              className="crear-tratamiento-nav-icon"
            />
            <span>Nuevo Paciente</span>
          </button>
        </nav>

        <div className="crear-tratamiento-sidebar-bottom">
          <button
            className="crear-tratamiento-back-btn"
            type="button"
            onClick={() => navigate(-1)}
          >
            <img src={iconRegreso} alt="Regresar" />
          </button>
        </div>
      </aside>

      <main className="crear-tratamiento-content">
        <div className="crear-tratamiento-header">
          <h1>Crear tratamiento de: Cristina Hernandez</h1>

          <div className="crear-tratamiento-header-icons">
            <button className="crear-tratamiento-btn-notificacion" type="button">
              <img src={iconNotificacion} alt="Notificaciones" />
            </button>

            <button className="crear-tratamiento-btn-perfil" type="button">
              <img src={iconPerfil} alt="Perfil" />
            </button>
          </div>
        </div>

        <section className="crear-tratamiento-info">
          <div className="crear-tratamiento-avatar-wrapper">
            <img src={iconPerfil} alt="Paciente" className="crear-tratamiento-avatar" />
          </div>

          <div className="crear-tratamiento-datos">
            <div className="crear-tratamiento-datos-columna">
              <p>Karla Martinez Duarte.</p>
              <p>Edad: 48 años.</p>
              <p>Sexo: Femenino.</p>
            </div>

            <div className="crear-tratamiento-datos-columna">
              <p>Medico: Dr. Jorge Gonzalez.</p>
              <p>Fecha de inicio: 18 de Diciembre, 2025.</p>
            </div>
          </div>
        </section>

        <hr className="crear-tratamiento-linea" />

        <section className="crear-tratamiento-diagnostico">
          <label>Diagnostico:</label>
          <input type="text" />
        </section>

        <section className="crear-tratamiento-medicamentos-box">
          <div className="crear-tratamiento-medicamentos-header">
            <h2>Medicamentos</h2>

            <div className="crear-tratamiento-buscador-wrapper">
              <div className="crear-tratamiento-buscador">
                <input
                  type="text"
                  value={busqueda}
                  onChange={manejarCambioBusqueda}
                />
                <span className="crear-tratamiento-icono-busqueda">⌕</span>
              </div>

              {mostrarSugerencias && sugerenciasFiltradas.length > 0 && (
                <ul className="crear-tratamiento-sugerencias">
                  {sugerenciasFiltradas.map((medicamento) => (
                    <li
                      key={medicamento.id}
                      onClick={() => seleccionarMedicamento(medicamento)}
                    >
                      {medicamento.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="crear-tratamiento-tabla-contenedor">
            <table className="crear-tratamiento-tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Dosis</th>
                  <th>Presentación</th>
                  <th>Vía</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {medicamentos.map((medicamento, index) => (
                  <tr key={`${medicamento.id}-${index}`}>
                    <td>{medicamento.nombre}</td>

                    <td>
                      <input
                        type="text"
                        className="crear-tratamiento-input-dosis"
                        value={medicamento.dosis}
                        placeholder="Agregar dosis"
                        onChange={(e) => actualizarDosis(index, e.target.value)}
                      />
                    </td>

                    <td>{medicamento.presentacion}</td>
                    <td>{medicamento.via}</td>

                    <td className="columna-borrar">
                      <img
                        src={iconBorrar}
                        alt="Eliminar"
                        className="icono-borrar"
                        onClick={() => eliminarMedicamento(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="crear-tratamiento-btn-medicamento-wrapper">
              <button className="crear-tratamiento-btn-medicamento" type="button">
                Agregar
                <br />
                Medicamento
              </button>
            </div>
          </div>
        </section>

        <section className="crear-tratamiento-recomendaciones-box">
          <textarea
            className="crear-tratamiento-textarea"
            placeholder="Agregar recomendaciones."
          ></textarea>

          <div className="crear-tratamiento-btn-agregar-wrapper">
            <button className="crear-tratamiento-btn-crear" type="button">
              Crear
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CrearTratamiento;