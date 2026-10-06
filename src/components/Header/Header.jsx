import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/pokeballicon.webp";

function Header() {
  return (
    <header>
      <Link to="/" state={{ desdeMenu: true }}>
      <div className="logo">
        <img src={logo} alt="logo pokedex" />
        <h2>Pokedex</h2>
      </div>
      </Link>
      <nav className="nav-principal">
        <Link to="/" state={{ desdeMenu: true }}>Home</Link>
        <Link to="/Pokedex" state={{ desdeMenu: true }}>Pokededex</Link>
      </nav>
    </header>
  );
}

export default Header;
