import "./Alerta.css";

function Alerta({ tipo = "info", mensaje, onCerrar }) {
    if (!mensaje) return null;

    return (
        <div className="alerta-overlay">
            <div className={`alerta-box ${tipo}`}>
                <h3>
                    {tipo === "exito" && "Éxito"}
                    {tipo === "error" && "Error"}
                    {tipo === "advertencia" && "Advertencia"}
                    {tipo === "info" && "Información"}
                </h3>

                <p>{mensaje}</p>

                <button type="button" onClick={onCerrar}>
                    Aceptar
                </button>
            </div>
        </div>
    );
}

export default Alerta;