import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import logo from "../../assets/images/logo.png";
import backArrow from "../../assets/images/back_arrow_5821.png";
import BackButton from "../../components/common/BackButton";
import RoleSelector from "../../components/auth/RoleSelector";
import MedicoForm from "../../components/auth/MedicoForm";
import PacienteForm from "../../components/auth/PacienteForm";

function Register() {
  const navigate = useNavigate();
  const [rolSeleccionado, setRolSeleccionado] = useState("");

  return (
    <div className="register-container">
      <div className="register-box">
        <BackButton
          onClick={() => navigate("/")}
          icon={backArrow}
        />

        <div className={`register-top ${rolSeleccionado ? "with-form" : "only-selector"}`}>
          <img src={logo} alt="Logo" className="logo" />

          <RoleSelector
            rolSeleccionado={rolSeleccionado}
            setRolSeleccionado={setRolSeleccionado}
          />
        </div>

        {rolSeleccionado === "MEDICO" && <MedicoForm />}
        {rolSeleccionado === "PACIENTE" && <PacienteForm />}
      </div>
    </div>
  );
}

export default Register;