import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerMedico } from "../../services/authService";
function MedicoForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    sexo: "",
    cedulaProfesional: "",
    especialidad: "",
    consultorio: "",
    correo: "",
    contrasena: "",
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [cargando, setCargando] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!formData.apellidoPaterno.trim()) {
      nuevosErrores.apellidoPaterno = "El apellido paterno es obligatorio";
    }

    if (!formData.apellidoMaterno.trim()) {
      nuevosErrores.apellidoMaterno = "El apellido materno es obligatorio";
    }
    if (!formData.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    }

    if (!formData.sexo) {
      nuevosErrores.sexo = "El sexo es obligatorio";
    }

    if (!formData.cedulaProfesional.trim()) {
      nuevosErrores.cedulaProfesional = "La cédula profesional es obligatoria";
    }

    if (!formData.especialidad.trim()) {
      nuevosErrores.especialidad = "La especialidad es obligatoria";
    }

    if (!formData.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      nuevosErrores.correo = "Ingresa un correo válido";
    }

    if (!formData.contrasena.trim()) {
      nuevosErrores.contrasena = "La contraseña es obligatoria";
    } else if (formData.contrasena.length < 6) {
      nuevosErrores.contrasena = "La contraseña debe tener al menos 6 caracteres";
    }

    return nuevosErrores;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensajeExito("");
    setMensajeError("");

    const nuevosErrores = validarFormulario();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    try {
      setCargando(true);

      const respuesta = await registerMedico(formData);

      if (respuesta.exito) {
        setMensajeExito(respuesta.mensaje);
        setMensajeError("");

        // Guardar sesión del médico en esta pestaña
        sessionStorage.clear();

        sessionStorage.setItem(
          "nombre",
          respuesta.nombre
        );

        sessionStorage.setItem(
          "idUsuario",
          String(respuesta.idUsuario)
        );

        sessionStorage.setItem(
          "idMedico",
          String(respuesta.idMedico)
        );

        sessionStorage.setItem(
          "rol",
          "MEDICO"
        );

        setFormData({
          nombre: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          fechaNacimiento: "",
          sexo: "",
          cedulaProfesional: "",
          especialidad: "",
          consultorio: "",
          correo: "",
          contrasena: "",
        });

        setTimeout(() => {
          navigate("/inicio-medico");
        }, 1500);

      } else {
        setMensajeError(respuesta.mensaje);
        setMensajeExito("");
      }

    } catch (error) {
      console.error("Error al registrar médico:", error);

      setMensajeError(
        error.response?.data?.mensaje ||
        "No se pudo registrar el médico"
      );

      setMensajeExito("");

    } finally {
      setCargando(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="register-row">
        <label>Nombre:</label>
        <div className="register-input-wrapper">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errores.nombre && <span className="field-error">{errores.nombre}</span>}
        </div>
      </div>

      <div className="register-row">
        <label>Apellido Paterno:</label>
        <div className="register-input-wrapper">
          <input
            type="text"
            name="apellidoPaterno"
            value={formData.apellidoPaterno}
            onChange={handleChange}
          />
          {errores.apellidoPaterno && (
            <span className="field-error">{errores.apellidoPaterno}</span>
          )}
        </div>
      </div>

      <div className="register-row">
        <label>Apellido Materno:</label>
        <div className="register-input-wrapper">
          <input
            type="text"
            name="apellidoMaterno"
            value={formData.apellidoMaterno}
            onChange={handleChange}
          />
          {errores.apellidoMaterno && (
            <span className="field-error">{errores.apellidoMaterno}</span>
          )}
        </div>
      </div>

      <div className="register-row">
        <label>Fecha de nacimiento:</label>
        <div className="register-input-wrapper">
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
          {errores.fechaNacimiento && (
            <span className="field-error">{errores.fechaNacimiento}</span>
          )}
        </div>
      </div>

      <div className="register-row">
        <label>Sexo:</label>
        <div className="register-input-wrapper">
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          {errores.sexo && <span className="field-error">{errores.sexo}</span>}
        </div>
      </div>

      <div className="register-row">
        <label>Cédula Profesional:</label>
        <div className="register-input-wrapper">
          <input
            type="text"
            name="cedulaProfesional"
            value={formData.cedulaProfesional}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 8);
              handleChange({
                target: {
                  name: "cedulaProfesional",
                  value,
                },
              });
            }}
            maxLength={8}
          />
          {errores.cedulaProfesional && (
            <span className="field-error">{errores.cedulaProfesional}</span>
          )}
        </div>
      </div>

      <div className="register-row">
        <label>Especialidad:</label>
        <div className="register-input-wrapper">
          <select
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="Medicina General">Medico General</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Ginecología">Ginecología</option>
            <option value="Dermatología">Dermatología</option>
            <option value="Neurología">Neurología</option>
            <option value="Traumatología">Traumatología</option>
            <option value="Psiquiatría">Psiquiatría</option>
          </select>

          {errores.especialidad && (
            <span className="field-error">{errores.especialidad}</span>
          )}
        </div>
      </div>

      <div className="register-row">
        <label>Consultorio:</label>
        <div className="register-input-wrapper">
          <input
            type="text"
            name="consultorio"
            value={formData.consultorio}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="register-row">
        <label>Correo:</label>
        <div className="register-input-wrapper">
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          {errores.correo && <span className="field-error">{errores.correo}</span>}
        </div>
      </div>

      <div className="register-row">
        <label>Contraseña:</label>
        <div className="register-input-wrapper">
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
          />
          {errores.contrasena && (
            <span className="field-error">{errores.contrasena}</span>
          )}
        </div>
      </div>

      {mensajeExito && <p className="register-success">{mensajeExito}</p>}
      {mensajeError && <p className="register-error">{mensajeError}</p>}

      <button className="create-account-button" type="submit" disabled={cargando}>
        {cargando ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}

export default MedicoForm;