import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/pokeballicon.webp";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button/Button";

function Header() {
  const { usuario, logout } = useAuth();
  return (
    <header>
      <Link to="/" state={{ desdeMenu: true }}>
        <div className="logo">
          <img src={logo} alt="logo pokedex" />
          <h2>Pokedex</h2>
        </div>
      </Link>
      <div className="sesion">
        {usuario ? (
          <>
            <span>Hola, {usuario.name}</span>
            <Button type="button" onClick={logout}>
              Cerrar sesión
            </Button>
          </>
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
