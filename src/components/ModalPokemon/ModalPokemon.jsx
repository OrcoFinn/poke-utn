import useFetchDetallePokemon from "../../hooks/useFetchDetallePokemon";
import useFetchHabilidades from "../../hooks/useFetchHabilidades";
import X from "../../assets/X.svg";
import { Link } from "react-router-dom";
import "./ModalPokemon.css";
import { useAuth } from "../../context/AuthContext";
import pokeball from "../../assets/pokeballicon.webp";

import {
  BotonCaptura,
  Caracteristicas,
  Stats,
  LineaEvolutiva,
  Type,
} from "../../components";

function ModalPokemon({ pokemon, onClose }) {
  const { usuario } = useAuth();

  const pokemonId = pokemon?.id || null;
  const habilidadesPokemon = pokemon?.abilities || [];

  const { error, loading, species, evolutionChain } =
    useFetchDetallePokemon(pokemonId);

  const habilidades = useFetchHabilidades(habilidadesPokemon);

  if (!pokemon) {
    return null;
  }

  if (loading) {
    return (
      <section className="modal-overlay-loading" onClick={onClose}>
        <div
          className="modal-pokemon modal-loading"
          onClick={(evento) => evento.stopPropagation()}
        >
          <img className="pokeball-loading" src={pokeball} alt="Cargando" />

          <p className="loading">Cargando...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="modal-overlay" onClick={onClose}>
        <div
          className="modal-pokemon"
          onClick={(evento) => evento.stopPropagation()}
        >
          <Link className="modal-cerrar" onClick={onClose}>
            <img src={X} />
          </Link>

          <p className="error-modal">Error al cargar el Pokémon.</p>
        </div>
      </section>
    );
  }

  const descripcion = species?.flavor_text_entries?.find(
    (entry) => entry.language.name === "es",
  );

  const textoDescripcion = descripcion?.flavor_text?.replace(/\f/g, " ");

  const regiones = {
    "generation-i": "Kanto",
    "generation-ii": "Johto",
    "generation-iii": "Hoenn",
    "generation-iv": "Sinnoh",
    "generation-v": "Unova",
    "generation-vi": "Kalos",
    "generation-vii": "Alola",
    "generation-viii": "Galar",
    "generation-ix": "Paldea",
  };

  const region = regiones[species?.generation?.name];

  return (
    <section className="modal-overlay" onClick={onClose}>
      <div
        className="modal-pokemon"
        onClick={(evento) => evento.stopPropagation()}
      >
        <Link className="modal-cerrar" onClick={onClose}>
          <img src={X} />
        </Link>

        <div className="poke-container">
          <div className="poke-resume">
            <div className="main-info">
              <div className="poke-img">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>

              <div className="pokemon-head">
                <p className="poke-id">#{pokemon.id}</p>
                <h3>{pokemon.name}</h3>
              </div>
              <div className="type-container">
                <Type pokemon={pokemon} />
              </div>
            </div>
            <div className="acciones-contenedor">
              {usuario && <BotonCaptura pokemonID={pokemon.id} />}
            </div>

            <div className="descripcion">
              <div className="pk-info">
                <span>Región: 🗺️ {region}</span>

                <p>{textoDescripcion}</p>
              </div>
            </div>
            <div className="descripcion">
              <Stats stats={pokemon.stats} />
            </div>
            <div className="descripcion">
              <div className="pk-info">
                <h2>Habilidades</h2>
                {habilidades.map((habilidad) => {
                  const descripcion =
                    habilidad.effect_entries?.find(
                      (entry) => entry.language.name === "es",
                    ) ||
                    habilidad.flavor_text_entries?.find(
                      (entry) => entry.language.name === "es",
                    );

                  return (
                    <div key={habilidad.id}>
                      <h3>{habilidad.name}</h3>

                      <p>{descripcion?.effect || descripcion?.flavor_text}</p>
                    </div>
                  );
                })}
              </div>

              {/* <Caracteristicas
                height={pokemon.height}
                weight={pokemon.weight}
                base_experience={pokemon.base_experience}
                habitat={species?.habitat?.name}
              /> */}
            </div>
            <LineaEvolutiva evolutionChain={evolutionChain} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModalPokemon;
