import { useState, useEffect } from "react";
import {
  URL_POKEMONS,
  URL_POKEMONS_SPECIES,
} from "../utils/api";

function useFetchDetallePokemon(id) {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
   const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPokemon = async () => {
      try {
        const [respuestaPokemon, respuestaSpecies] = await Promise.all([
          fetch(`${URL_POKEMONS}/${id}`),
          fetch(`${URL_POKEMONS_SPECIES}/${id}`),
        ]);

        if (!respuestaPokemon.ok || !respuestaSpecies.ok) {
          throw new Error(
            `Error en la llamada: ${respuestaPokemon.status} ${respuestaPokemon.statusText}`,
          );
        }

        const datosPokemon = await respuestaPokemon.json();
        const datosSpecies = await respuestaSpecies.json();

        setPokemon(datosPokemon);
        setSpecies(datosSpecies);
        // Obtener cadena evolutiva
        const respuestaEvolution = await fetch(
          datosSpecies.evolution_chain.url
        );

        if (!respuestaEvolution.ok) {
          throw new Error("No se pudo obtener la cadena evolutiva");
        }

        const datosEvolution = await respuestaEvolution.json();

        setEvolutionChain(datosEvolution);
      } catch (error) {
        setError(error.message || "Ocurrió un error en la API");
      } finally {
        setLoading(false);
      }
    };

    cargarPokemon();
  }, [id]);


  return { pokemon, species, evolutionChain, loading, error };
}

export default useFetchDetallePokemon;
