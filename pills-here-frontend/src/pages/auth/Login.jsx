import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import "../../styles/auth.css";
import logo from "../../assets/images/logo.png";
import { loginUsuario } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errores, setErrores] = useState({});
  const [mensajeError, setMensajeError] = useState("");

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      nuevosErrores.correo = "Ingresa un correo válido";
    }

    if (!contrasena.trim()) {
      nuevosErrores.contrasena = "La contraseña es obligatoria";
    } else if (contrasena.length < 6) {
      nuevosErrores.contrasena = "Debe tener al menos 6 caracteres";
    }

    return nuevosErrores;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const nuevosErrores = validarFormulario();
    setErrores(nuevosErrores);
    setMensajeError("");

    if (Object.keys(nuevosErrores).length > 0) return;

    try {
      const respuesta = await loginUsuario({ correo, contrasena });

      const loginExitoso = respuesta.success ?? respuesta.exito;

      if (!loginExitoso) {
        setMensajeError(respuesta.mensaje || "No se pudo iniciar sesión");
        return;
      }

      sessionStorage.clear();
      
      sessionStorage.setItem("idUsuario", respuesta.idUsuario);
      sessionStorage.setItem("rol", respuesta.rol);
      sessionStorage.setItem("nombre", respuesta.nombre);

      if (respuesta.idMedico) {
        sessionStorage.setItem("idMedico", respuesta.idMedico);
      }

      if (respuesta.idPaciente) {
        sessionStorage.setItem("idPaciente", respuesta.idPaciente);
      }


      if (respuesta.rol === "MEDICO") {
        navigate("/inicio-medico");
      } else if (respuesta.rol === "PACIENTE") {
        navigate("/inicio-paciente");
      } else {
        setMensajeError("Rol no reconocido");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMensajeError(error.response?.data?.mensaje || "No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Pills Here Logo" className="logo" />

        <form className="login-form" onSubmit={handleLogin}>
          <InputField
            label="Correo Electronico:"
            type="email"
            placeholder=""
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            error={errores.correo}
          />

          <InputField
            label="Contraseña:"
            type="password"
            placeholder=""
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            error={errores.contrasena}
          />

          {mensajeError && <p className="error-text global-error">{mensajeError}</p>}

          <Button text="Iniciar sesion" type="submit" />
        </form>

        <div className="register-wrapper">
          ¿No tienes cuenta?
          <span
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Crea una
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;