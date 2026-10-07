import "./Button.css";

function Button({
  icon,
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
      {icon ? (<img src={icon} />) : ("")}
      {children ? children : ""}
    </button>
  );
}

export default Button;
