import { useNavigate, useParams, Link } from "react-router-dom";
import useFetchDetallePokemon from "../hooks/useFetchDetallePokemon";
import Type from "../components/Type/Type";
import "../components/Styles/DetallePokemon.css";
import LineaEvolutiva from "../components/LineaEvolutiva/LineaEvolutiva";
import useFetchHabilidades from "../hooks/useFetchHabilidades";
import Stats from "../components/Stats/Stats";
import Caracteristicas from "../components/Caracteristicas/Caracteristicas";
import BotonCaptura from "../components/BotonCaptura/BotonCaptura";
import { useAuth } from "../context/AuthContext";

function DetallePokemon() {
  const { usuario } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, loading, pokemon, species, evolutionChain } =
    useFetchDetallePokemon(id);
  const habilidades = useFetchHabilidades(pokemon?.abilities);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar el Pokémon.</p>;
  }

  const descripcion = species?.flavor_text_entries.find(
    (entry) => entry.language.name === "es",
  );

  const textoDescripcion = descripcion?.flavor_text.replace(/\f/g, " ");

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

  const region = regiones[species?.generation.name];

  return (
    <section className="detalle-pokemon">
      <div className="info-pokemon">
        <div className="pokemon-head">
          <Link to="/pokedex" className="boton-volver">
            ← Volver
          </Link>
          <h3>{pokemon.name}</h3>
        </div>

        <div className="poke-container">
          <div className="poke-resume">
            <div className="poke-id-container">
              <p className="poke-id">#{pokemon.id}</p>
              <Type pokemon={pokemon} />
            </div>
            <div className="poke-img">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <img src={pokemon.sprites.back_default} alt={pokemon.name} />
            </div>
            {usuario && (<BotonCaptura pokemonID={pokemon.id} />)}
            <div className="descripcion">
              <div className="pk-info">
                <span>Región: 🗺️ {region}</span>
                <p>{textoDescripcion}</p>
              </div>
            </div>

            <LineaEvolutiva evolutionChain={evolutionChain} />
          </div>
          <div className="caracteristicas">
            <div className="habilidades">
              <h2>Habilidades</h2>

              {habilidades.map((habilidad) => {
                const descripcion =
                  habilidad.effect_entries.find(
                    (entry) => entry.language.name === "es",
                  ) ||
                  habilidad.flavor_text_entries.find(
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
            <Caracteristicas
              height={pokemon.height}
              weight={pokemon.weight}
              base_experience={pokemon.base_experience}
              habitat={species.habitat?.name}
            />
            <Stats stats={pokemon.stats} />

            
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetallePokemon;
