function RoleSelector({ rolSeleccionado, setRolSeleccionado }) {
  return (
    <div className="role-selector">
      <span className="role-label">Elegi tu rol:</span>

      <button
        type="button"
        className={`role-option ${rolSeleccionado === "MEDICO" ? "active-role" : ""}`}
        onClick={() => setRolSeleccionado("MEDICO")}
      >
        Medico
      </button>

      <span className="role-separator">/</span>

      <button
        type="button"
        className={`role-option ${rolSeleccionado === "PACIENTE" ? "active-role" : ""}`}
        onClick={() => setRolSeleccionado("PACIENTE")}
      >
        Paciente
      </button>
    </div>
  );
}

export default RoleSelector;