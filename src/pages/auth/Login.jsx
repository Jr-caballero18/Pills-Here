import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import "../../styles/auth.css";
import logo from "../../assets/images/logo.png";

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errores, setErrores] = useState({});

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

  const handleLogin = (e) => {
    e.preventDefault();

    const nuevosErrores = validarFormulario();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    console.log("Correo:", correo);
    console.log("Contraseña:", contrasena);
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