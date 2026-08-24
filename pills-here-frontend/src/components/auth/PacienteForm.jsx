import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPaciente } from "../../services/authService";

function PacienteForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    sexo: "",
    tipoSangre: "",
    alergias: "",
    correo: "",
    contrasena: "",
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [codigoPaciente, setCodigoPaciente] = useState("");
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

    if (!formData.tipoSangre) {
      nuevosErrores.tipoSangre = "El tipo de sangre es obligatorio";
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
  setCodigoPaciente("");

  const nuevosErrores = validarFormulario();
  setErrores(nuevosErrores);

  if (Object.keys(nuevosErrores).length > 0) return;

  try {
    setCargando(true);

    const respuesta = await registerPaciente(formData);

    if (respuesta.exito) {
      setMensajeExito(respuesta.mensaje);
      setCodigoPaciente(respuesta.codigoPaciente);
      setMensajeError("");

      sessionStorage.clear();

      sessionStorage.setItem(
        "codigoPaciente",
        respuesta.codigoPaciente
      );

      sessionStorage.setItem(
        "nombre",
        respuesta.nombre
      );

      sessionStorage.setItem(
        "idUsuario",
        String(respuesta.idUsuario)
      );

      sessionStorage.setItem(
        "idPaciente",
        String(respuesta.idPaciente)
      );

      sessionStorage.setItem(
        "rol",
        "PACIENTE"
      );

      setFormData({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        fechaNacimiento: "",
        sexo: "",
        tipoSangre: "",
        alergias: "",
        correo: "",
        contrasena: "",
      });

      setTimeout(() => {
        navigate("/inicio-paciente");
      }, 2500);

    } else {
      setMensajeError(respuesta.mensaje);
      setMensajeExito("");
    }

  } catch (error) {
    console.error("Error al registrar paciente:", error);

    setMensajeError(
      error.response?.data?.mensaje ||
      "No se pudo registrar el paciente"
    );

    setMensajeExito("");
    setCodigoPaciente("");

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
        <label>Tipo de sangre:</label>
        <div className="register-input-wrapper">
          <select
            name="tipoSangre"
            value={formData.tipoSangre}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          {errores.tipoSangre && (
            <span className="field-error">{errores.tipoSangre}</span>
          )}
        </div>
      </div>

      <div className="register-row">
        <label>Alergias:</label>
        <div className="register-input-wrapper">
          <input
            type="text"
            name="alergias"
            value={formData.alergias}
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
      {mensajeError && <p className="register-error">{mensajeError}</p>}

      <button className="create-account-button" type="submit">
        Crear cuenta
      </button>
    </form>
  );
}

export default PacienteForm;