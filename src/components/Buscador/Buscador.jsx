import { useState } from "react";
import useSearchPokemon from "../../hooks/useSearchPokemon";
import { useNavigate } from "react-router-dom";
import "./Buscador.css";
import iconoBusqueda from "../../assets/MagnifyingGlassWhite.svg";

function Buscador() {
  const [busqueda, setBusqueda] = useState("");
  const { pokemons, loading, error, searchPokemon } = useSearchPokemon();

  const navigate = useNavigate();

  const handleSubmit = (evento) => {
    evento.preventDefault();

    const termino = busqueda.trim();

    if (!termino) return;

    navigate(`/pokedex?search=${encodeURIComponent(termino)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="barra-busqueda">
      <img src={iconoBusqueda} className="input-icon" />
      <input
        type="search"
        placeholder="Buscar Pokémon..."
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
      />
    </form>
  );
}

export default Buscador;
