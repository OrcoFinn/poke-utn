import "./CardPokemon.css";
import "./PokemonTipo.css";
import Type from "../Type/Type";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import pokeball from "../../assets/pokeballicon.webp";

function CardPokemon({ pokemon }) {
  const { usuario } = useAuth();

  const capturado = usuario?.pokemonsCapturados?.includes(pokemon.id);

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
        <div className="imagen-container">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className="detalle">
          <p className="poke-id">#{pokemon.id}</p>
          <h3>{pokemon.name}</h3>
        </div>
        <div className="poke-id-container">
          <Type pokemon={pokemon} />{" "}
          {capturado && (
            <img
              className="pokeball-capturado"
              src={pokeball}
              alt="Pokémon capturado"
            />
          )}
        </div>
      </article>
    </Link>
  );
}

export default CardPokemon;
