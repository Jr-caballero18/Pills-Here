function BackButton({ onClick, icon }) {
  return (
    <button className="back-button" onClick={onClick} type="button">
      <img src={icon} alt="Regresar" className="back-button-icon" />
    </button>
  );
}

export default BackButton;