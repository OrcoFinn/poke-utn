import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Totalizador, CardRegion } from "../components";
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

      {/* <Buscador /> */}

      <div className="regiones">
        <CardRegion
          img={logo}
          url="/pokedex?region=kanto"
          region="Pokedex de Kanto"
        />
        <CardRegion
          img={logo}
          url="/pokedex?region=johto"
          region="Pokedex de Johto"
        />
        <CardRegion
          img={logo}
          url="/pokedex?region=hoenn"
          region="Pokedex de Hoenn"
        />
      </div>
    </section>
  );
}

export default Index;
