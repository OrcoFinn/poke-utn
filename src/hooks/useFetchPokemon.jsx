import { useEffect, useRef, useState } from "react";
import { URL_POKEMONS, POKEMONS_PER_PAGE } from "../utils/api";

function useFetchPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hayMas, setHayMas] = useState(true);

  // Guarda el próximo offset sin depender del render de React
  const offsetRef = useRef(0);

  // Evita que se hagan dos llamadas al mismo tiempo
  const loadingRef = useRef(false);

  const cargarMas = async () => {
    // Si ya está cargando, no hacemos otra llamada
    if (loadingRef.current || !hayMas) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const offset = offsetRef.current;

      console.log("Cargando desde offset:", offset);

      const respuesta = await fetch(
        `${URL_POKEMONS}?limit=${POKEMONS_PER_PAGE}&offset=${offset}`
      );

      if (!respuesta.ok) {
        throw new Error("Error al cargar los Pokémon");
      }

      const datos = await respuesta.json();

      const detalles = await Promise.all(
        datos.results.map(async (pokemon) => {
          const respuesta = await fetch(pokemon.url);

          if (!respuesta.ok) {
            throw new Error("Error al cargar un Pokémon");
          }

          return respuesta.json();
        })
      );

      setPokemons((prev) => [...prev, ...detalles]);

      // Avanzamos el offset
      offsetRef.current += POKEMONS_PER_PAGE;

      if (!datos.next) {
        setHayMas(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMas();
  }, []);

  return {
    pokemons,
    loading,
    error,
    cargarMas,
    hayMas,
  };
}

export default useFetchPokemon;