import "./CardPokemon.css";
import "./PokemonTipo.css";
import Type from "../Type/Type";
import { Link } from "react-router-dom";

function CardPokemon({ pokemon }) {
  const guardarScroll = () => {
    sessionStorage.setItem("pokedexScroll", window.scrollY);

    sessionStorage.setItem("pokedexPokemon", pokemon.id);
  };

  return (
    <Link
      to={`/pokedex/${pokemon.id}`}
      className={`card-pokemon`}
      onClick={guardarScroll}
    >
      <article key={pokemon.id}>
        <div className="poke-id-container">
          <p className="poke-id">#{pokemon.id}</p>
          <Type pokemon={pokemon} />
        </div>
        <div className="detalle">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />

          <h3>{pokemon.name}</h3>
        </div>
      </article>
    </Link>
  );
}

export default CardPokemon;
