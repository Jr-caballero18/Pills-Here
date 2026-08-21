import "./CrearTratamiento.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  obtenerDetalleTratamiento,
  buscarMedicamentos,
  actualizarTratamiento
} from "../../services/tratamientoService";

import logo from "../../assets/images/logo.png";
import iconHome from "../../assets/images/icon-home.png";
import iconPacientes from "../../assets/images/icon-pacientess.png";
import iconAgregarPaciente from "../../assets/images/icon-agregarP.png";
import iconNotificacion from "../../assets/images/icon-notificacion.png";
import iconPerfil from "../../assets/images/icon-perfilP.png";
import iconRegreso from "../../assets/images/flecha-regreso.png";
import iconBorrar from "../../assets/images/borrar-icon.png";

function EditarTratamiento() {
  const navigate = useNavigate();
  const { idTratamiento } = useParams();
  const nombreMedico = localStorage.getItem("nombre");

  const [tratamiento, setTratamiento] = useState(null);
  const [diagnostico, setDiagnostico] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  useEffect(() => {
    const cargarTratamiento = async () => {
      try {
        console.log("ID TRATAMIENTO RECIBIDO:", idTratamiento);
        const data = await obtenerDetalleTratamiento(idTratamiento);
        console.log("TRATAMIENTO RECIBIDO:", data);

        setTratamiento(data);
        setDiagnostico(data.diagnostico || "");
        setRecomendaciones(data.notasMedicas || "");
        setMedicamentos(data.medicamentos || []);
      } catch (error) {
        console.error("Error al obtener tratamiento:", error);
      }
    };

    cargarTratamiento();
  }, [idTratamiento]);

  useEffect(() => {
    const buscar = async () => {
      if (busqueda.trim() === "") {
        setSugerencias([]);
        setMostrarSugerencias(false);
        return;
      }

      try {
        const data = await buscarMedicamentos(busqueda);
        setSugerencias(data);
        setMostrarSugerencias(true);
      } catch (error) {
        console.error("Error al buscar medicamentos:", error);
      }
    };

    buscar();
  }, [busqueda]);

  const seleccionarMedicamento = (medicamento) => {
    const yaExiste = medicamentos.some(
      (item) => item.idMedicamento === medicamento.idMedicamento
    );

    if (yaExiste) {
      setBusqueda("");
      setMostrarSugerencias(false);
      return;
    }

    const nuevoMedicamento = {
      idDosis: null,
      idMedicamento: medicamento.idMedicamento,
      nombre: medicamento.nombre,
      dosis: "",
      intervaloHoras: "",
      duracionDias: "",
      presentacion: medicamento.presentacion,
      via: medicamento.viaAdministracion,
    };

    setMedicamentos([...medicamentos, nuevoMedicamento]);
    setBusqueda("");
    setMostrarSugerencias(false);
  };

  const actualizarDosis = (index, nuevaDosis) => {
    const nuevosMedicamentos = [...medicamentos];
    nuevosMedicamentos[index].dosis = nuevaDosis;
    setMedicamentos(nuevosMedicamentos);
  };

  const actualizarIntervaloHoras = (index, nuevoIntervalo) => {
    const nuevosMedicamentos = [...medicamentos];
    nuevosMedicamentos[index].intervaloHoras = nuevoIntervalo;
    setMedicamentos(nuevosMedicamentos);
  };

  const actualizarDuracionDias = (index, nuevaDuracion) => {
    const nuevosMedicamentos = [...medicamentos];
    nuevosMedicamentos[index].duracionDias = nuevaDuracion;
    setMedicamentos(nuevosMedicamentos);
  };

  const eliminarMedicamento = (index) => {
    const nuevosMedicamentos = medicamentos.filter((_, i) => i !== index);
    setMedicamentos(nuevosMedicamentos);
  };

  if (!tratamiento) {
    return <p>Cargando tratamiento...</p>;
  }

  const esEditable = tratamiento.estado?.toUpperCase() === "ACTIVO";
  const guardarCambios = async () => {
    try {

      const tratamientoActualizado = {
        diagnostico,
        recomendaciones,
        medicamentos: medicamentos.map((medicamento) => ({
          idMedicamento: medicamento.idMedicamento,
          dosis: medicamento.dosis,
          intervaloHoras: Number(medicamento.intervaloHoras),
          duracionDias: Number(medicamento.duracionDias),

        })),
      };

      await actualizarTratamiento(idTratamiento, tratamientoActualizado);

      alert("Tratamiento actualizado correctamente");
      navigate(`/detalle-paciente/${tratamiento.paciente.idPaciente}`);
    } catch (error) {
      console.error("Error al actualizar tratamiento:", error);
      alert("Error al actualizar tratamiento");
    }
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
          <h1>Tratamiento: {tratamiento.paciente.nombreCompleto}</h1>

          <div className="crear-tratamiento-header-icons">
            <button className="crear-tratamiento-btn-notificacion" type="button">
              <img src={iconNotificacion} alt="Notificaciones" />
            </button>

            <button className="crear-tratamiento-btn-perfil" type="button"
              onClick={() => navigate("/perfil-medico")}>
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
              <p>{tratamiento.paciente.nombreCompleto}</p>
              <p>Edad: {tratamiento.paciente.edad}</p>
              <p>Sexo: {tratamiento.paciente.sexo}</p>
            </div>

            <div className="crear-tratamiento-datos-columna">
              <p>Diagnostico: {diagnostico}</p>
              <p>Medico: Dr. {nombreMedico}</p>
              <p>Fecha de inicio: {tratamiento.fechaInicio}</p>
            </div>
          </div>
        </section>

        <section className="editar-tratamiento-estado-box">
          El tratamiento se encuentra en estado: {tratamiento.estado}.
          Cumplimiento {tratamiento.porcentajeCumplimiento || 0}%
        </section>

        <section className="editar-tratamiento-resumen-box">
          <p>Medicamentos:</p>
          <ul>
            {medicamentos.map((medicamento, index) => (
              <li key={`${medicamento.idMedicamento}-${index}`}>
                {medicamento.nombre} {medicamento.dosis} cada {medicamento.intervaloHoras || ""} horas por {medicamento.duracionDias || ""} dias
              </li>
            ))}
          </ul>

          <p>Recomendaciones:</p>
          <textarea
            className="editar-tratamiento-recomendaciones-input"
            value={recomendaciones}
            onChange={(e) => setRecomendaciones(e.target.value)}
            placeholder="Agregar recomendaciones."
            disabled={!esEditable}
          />
        </section>

        <section className="crear-tratamiento-medicamentos-box">
          <div className="crear-tratamiento-medicamentos-header">
            <h2>Medicamentos</h2>

            <div className="crear-tratamiento-buscador-wrapper">
              <div className="crear-tratamiento-buscador">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  disabled={!esEditable}
                />
                <span className="crear-tratamiento-icono-busqueda">⌕</span>
              </div>

              { esEditable && mostrarSugerencias && sugerencias.length > 0 && (
                <ul className="crear-tratamiento-sugerencias">
                  {sugerencias.map((medicamento) => (
                    <li
                      key={medicamento.idMedicamento}
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
                  <th>Horario</th>
                  <th>Duracion</th>
                  <th>Presentación</th>
                  <th>Vía</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {medicamentos.map((medicamento, index) => (
                  <tr key={`${medicamento.idMedicamento}-${index}`}>
                    <td>{medicamento.nombre}</td>

                    <td>
                      <input
                        type="text"
                        className="crear-tratamiento-input-dosis"
                        value={medicamento.dosis}
                        placeholder="Agregar dosis"
                        onChange={(e) => actualizarDosis(index, e.target.value)}
                        disabled={!esEditable}

                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        min="1"
                        className="crear-tratamiento-input-dosis"
                        value={medicamento.intervaloHoras || ""}
                        placeholder="Horas"
                        onChange={(e) => actualizarIntervaloHoras(index, e.target.value)}
                        disabled={!esEditable}

                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        min="1"
                        className="crear-tratamiento-input-dosis"
                        value={medicamento.duracionDias || ""}
                        placeholder="Días"
                        onChange={(e) => actualizarDuracionDias(index, e.target.value)}
                        disabled={!esEditable}
                      />
                    </td>



                    <td>{medicamento.presentacion}</td>
                    <td>{medicamento.via}</td>

                    <td className="columna-borrar">
                      {esEditable && (
                        <img
                          src={iconBorrar}
                          alt="Eliminar"
                          className="icono-borrar"
                          onClick={() => eliminarMedicamento(index)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </section>
        <div className="editar-tratamiento-guardar-wrapper">
          <button
            className="editar-tratamiento-guardar-btn"
            type="button"
            onClick={guardarCambios}
            disabled={!esEditable}

          >
            Guardar
          </button>
        </div>
      </main>
    </div>
  );
}

export default EditarTratamiento;