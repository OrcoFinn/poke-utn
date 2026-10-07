import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import trainer from "../../assets/trainer.png";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components";
import icon from "../../assets/SignOut.svg";

function Header() {
  const location = useLocation();
  const { usuario, logout } = useAuth();

  return (
    <header>
      <Link to="/">
      <div className="trainer">
        {usuario ? <img src={trainer} /> : ""}
        <div className="container-trainer">
          {usuario ? <h5>Entrenador</h5> : <></>}
          {usuario ? (
            <h4 className="usuario-bienvenida">{usuario.name}</h4>
          ) : (
            <Link to="/login">
              <h4 className="usuario-bienvenida">Iniciar sesión</h4>
            </Link>
          )}
        </div>
      </div>
      </Link>
      <div className="sesion">
        {usuario ? (
          <></>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/registro">Crear cuenta</Link>
          </>
        )}
      </div>
     
      <Button
        icon={icon}
        onClick={logout}
        className="Logout"
        children="Cerrar Sesión"
      />
    </header>
  );
}

export default Header;
