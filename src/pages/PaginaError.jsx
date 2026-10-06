import { Link } from "react-router-dom";

function PaginaError() {
  return (
    <section className="Tarjeta pagina-error">
      <h2>404 - Página no encontrada</h2>
      <p>La ruta que buscás no existe</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default PaginaError;
