function InicioPaciente() {
   const codigoPaciente = localStorage.getItem("codigoPaciente");
  console.log("Inicio de paciente", codigoPaciente);
  return(
   <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Inicio Paciente</h1>

      {codigoPaciente && (
        <p>
          Tu código de paciente es: <strong>{codigoPaciente}</strong>
        </p>
      )}
    </div>
  );

}

export default InicioPaciente;