function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error
}) {
  return (
    <div className="input-wrapper">
      <div className="input-group">
        <label>{label}</label>

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

export default InputField;