import "./CardPokemon.css";
import "./PokemonTipo.css";
// import Type from "../Type/Type";
import { useAuth } from "../../context/AuthContext";
import pokeball from "../../assets/pokeballicon.webp";

function CardPokemon({ pokemon, onClick }) {
  const { usuario } = useAuth();

  const capturado = usuario?.pokemonsCapturados?.includes(pokemon.id);

  const guardarScroll = () => {
    sessionStorage.setItem("pokedexScroll", window.scrollY);
    sessionStorage.setItem("pokedexPokemon", pokemon.id);
  };

  return (
    <article className={`card-pokemon`} onClick={onClick}>
      <article key={pokemon.id}>
        <div className="poke-id-container">
          {/* <Type pokemon={pokemon} />{" "} */}
        </div>
        <div className="imagen-container">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div>
          <div className="detalle">
            <div className="nombrepk">
              <p className="poke-id">#{pokemon.id}</p>
              <h3>{pokemon.name}</h3>
            </div>
            {capturado && (
              <img
                className="pokeball-capturado"
                src={pokeball}
                alt="Pokémon capturado"
              />
            )}
          </div>
        </div>
      </article>
    </article>
  );
}

export default CardPokemon;
