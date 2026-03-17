import { useState } from "react";

function MedicoForm() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos médico:", formData);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="register-row">
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="register-row">
        <label>Apellido Paterno:</label>
        <input
          type="text"
          name="apellidoPaterno"
          value={formData.apellidoPaterno}
          onChange={handleChange}
        />
      </div>

      <div className="register-row">
        <label>Apellido Materno:</label>
        <input
          type="text"
          name="apellidoMaterno"
          value={formData.apellidoMaterno}
          onChange={handleChange}
        />
      </div>

      <div className="register-row">
        <label>Fecha de nacimiento:</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
        />
      </div>

      <div className="register-row">
        <label>Sexo:</label>
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
      </div>

      <div className="register-row">
        <label>Cédula Profesional:</label>
        <input
          type="text"
          name="cedulaProfesional"
          value={formData.cedulaProfesional}
          onChange={handleChange}
        />
      </div>

      <div className="register-row">
        <label>Especialidad:</label>
        <input
          type="text"
          name="especialidad"
          value={formData.especialidad}
          onChange={handleChange}
        />
      </div>

      <div className="register-row">
        <label>Consultorio:</label>
        <input
          type="text"
          name="consultorio"
          value={formData.consultorio}
          onChange={handleChange}
        />
      </div>

      <div className="register-row">
        <label>Correo:</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
        />
      </div>

      <div className="register-row">
        <label>Contraseña:</label>
        <input
          type="password"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleChange}
        />
      </div>

      <button className="create-account-button" type="submit">
        Crear cuenta
      </button>
    </form>
  );
}

export default MedicoForm;