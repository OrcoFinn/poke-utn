import "./Header.css";
import { Link } from "react-router-dom";
import trainer from "../../assets/trainer.png";
import { useAuth } from "../../context/AuthContext";
import { Input, Button } from "../../components";

function Header() {
  const { usuario, logout } = useAuth();
  return (
    <header>
      <div className="trainer">
        <img src={trainer} />
        <div className="container-trainer">
          
          <h4 className="usuario-bienvenida">Entrenador {usuario.name}</h4>
          <Link to={"/login"}>Cerrar sesión</Link>
        </div>
      </div>
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
      <nav className="nav-principal">
        <Link to="/" state={{ desdeMenu: true }}>
          Home
        </Link>
        <Link to="/Pokedex" state={{ desdeMenu: true }}>
          Pokededex
        </Link>
      </nav>
    </header>
  );
}

export default Header;
