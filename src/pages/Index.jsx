import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Totalizador } from "../components";
import "../../src/pages/styles/index.css";
import logo from "../assets/pokeballicon.webp";

function Index() {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  return (
    <section className="main-container">
      <Link to="/pokedex" className="pokedex-link">
      <img src={logo} />
        <div className="datos-pokedex">
          <h2>Pokedex</h2>
          <Totalizador capturados={usuario?.pokemonsCapturados || []} />
        </div>
      </Link>

      <div className="regiones">
        <Link to="/pokedex?region=kanto" className="boton-link">
          Kanto
        </Link>

        <Link to="/pokedex?region=johto" className="boton-link">
          Johto
        </Link>

        <Link to="/pokedex?region=hoenn" className="boton-link">
          Hoenn
        </Link>
      </div>
    </section>
  );
}

export default Index;
