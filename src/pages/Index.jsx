import { Link } from "react-router-dom";

function Index() {
  return (
    <section className="tarjeta-index">
      <h2>Pokedex</h2>
      <Link to="/pokedex" className="boton-link">
        Abrir Pokedex
      </Link>
    </section>
  );
}

export default Index;
