import { useEffect, useState } from "react";
import { URL_POKEMONS } from "../../utils/api";
import { Link } from "react-router-dom";
import "./LineaEvolutiva.css"

function LineaEvolutiva({ evolutionChain }) {
  const [evoluciones, setEvoluciones] = useState([]);

  useEffect(() => {
    if (!evolutionChain) return null;

    const nombresPk = [];

    function cadenaEvoluciones(chain) {
      nombresPk.push(chain.species.name);

      chain.evolves_to.forEach((evolution) => {
        cadenaEvoluciones(evolution);
      });
    }

    cadenaEvoluciones(evolutionChain.chain);

    const cargarEvoluciones = async () => {
      const resultados = await Promise.all(
        nombresPk.map(async (nombre) => {
          const respuesta = await fetch(`${URL_POKEMONS}/${nombre}`);

          return respuesta.json();
        }),
      );

      setEvoluciones(resultados);
    };

    cargarEvoluciones();
  }, [evolutionChain]);

  return (
    <section>
      <h2>Línea evolutiva</h2>

      <div className="linea-evolutiva">
        {evoluciones.map((pokemon) => (
          <Link to={`/pokedex/${pokemon.id}`} className="evoluciones">
            <div key={pokemon.id}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />

              <p>{pokemon.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default LineaEvolutiva;
