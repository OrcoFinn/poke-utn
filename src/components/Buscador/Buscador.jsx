import { useSearchParams } from "react-router-dom";
import "./Buscador.css";
import iconoBusqueda from "../../assets/MagnifyingGlassWhite.svg";

function Buscador() {
  const [searchParams, setSearchParams] = useSearchParams();

  const busqueda = searchParams.get("search") || "";

  const handleChange = (evento) => {
    const valor = evento.target.value;

    const nuevosParams = new URLSearchParams(searchParams);

    if (valor.trim()) {
      nuevosParams.set("search", valor);
    } else {
      nuevosParams.delete("search");
    }

    setSearchParams(nuevosParams);
  };

  return (
    <form className="barra-busqueda">
      <img src={iconoBusqueda} className="input-icon" alt="" />

      <input
        type="search"
        placeholder="Buscar Pokémon..."
        value={busqueda}
        onChange={handleChange}
      />
    </form>
  );
}

export default Buscador;
