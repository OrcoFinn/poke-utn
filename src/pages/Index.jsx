import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Index() {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  } return (
    <section className="tarjeta-index">
      <h2>Pokedex</h2>
      <Link to="/pokedex" className="boton-link">
        Abrir Pokedex
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
