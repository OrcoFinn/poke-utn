import { useState } from "react";
import useSearchPokemon from "../../hooks/useSearchPokemon";
import CardPokemon from "../CardPokemon/CardPokemon";
import Button from "../Button/Button";


function Buscador() {
  const [search, setSearch] = useState("");
  const { pokemons, loading, error, searchPokemon } = useSearchPokemon();

  const handleSubmit = (evento) => {
    evento.preventDefault();
    searchPokemon(search);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar Pokemon"
          value={search}
          onChange={(evento) => setSearch(evento.target.value)}
        />
        <Button type="submit" disabled={loading}>
          Buscar
        </Button>
      </form>
    </div>
  );
}

export default Buscador;
