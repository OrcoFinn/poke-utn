import { useEffect, useState } from "react";
import { URL_POKEMONS } from "../../utils/api";
import "./LineaEvolutiva.css";

function LineaEvolutiva({ evolutionChain, onClick }) {
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
    <section className="contenedor-evoluciones">
      <h2>Línea evolutiva</h2>
      <div className="linea-evolutiva">
        {evoluciones.map((pokemon) => (
          <article className="evoluciones">
            <div className="grupo-evolucion" key={pokemon.id}>
              <div className="evoluciones-img">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>

              <p>{pokemon.name}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LineaEvolutiva;
