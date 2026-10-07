import "./Button.css";

function Button({
  children,
  className = "",
  secondary = false,
  ...props
}) {
  return (
    <button
      {...props}
      className={`button ${className} ${
        secondary ? "secondary" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
