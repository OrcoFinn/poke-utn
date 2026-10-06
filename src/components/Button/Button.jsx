import "./Button.css";

function Button({
  children,
  onClick,
  disabled = false,
  className = "",
  secondary = false,
  type = "button",
  submit = false,
}) {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
      className={`button ${className} ${secondary ? "secondary" : ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
