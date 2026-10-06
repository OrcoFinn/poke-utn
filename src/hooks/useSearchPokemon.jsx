import { useState } from "react";

const URL_POKEMONS = "https://pokeapi.co/api/v2/pokemon/";

function useSearchPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPokemon = async (name) => {
    if (!name.trim()) {
      setPokemons([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const respuesta = await fetch(
        `${URL_POKEMONS}/${name.toLowerCase().trim()}`,
      );

      if (!respuesta.ok) {
        throw new Error("Pokemon no encontrado");
      }

      const data = await respuesta.json();

      setPokemons(data);
    } catch (error) {
      setPokemons(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    pokemons,
    loading,
    error,
    searchPokemon,
  };
}

export default useSearchPokemon;
