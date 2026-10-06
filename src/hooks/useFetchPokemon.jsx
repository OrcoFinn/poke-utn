import { useEffect, useRef, useState } from "react";
import { URL_POKEMONS, POKEMONS_PER_PAGE } from "../utils/api";

const REGIONES = {
  kanto: {
    offset: 0,
    total: 151,
  },
  johto: {
    offset: 151,
    total: 100,
  },
  hoenn: {
    offset: 251,
    total: 135,
  },
};

function useFetchPokemon(region) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hayMas, setHayMas] = useState(true);

  const offsetRef = useRef(0);
  const loadingRef = useRef(false);

  const configuracion = REGIONES[region];

  const cargarMas = async () => {
    if (loadingRef.current || !hayMas) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const offset = offsetRef.current;

      const inicio = configuracion?.offset ?? 0;
      const total = configuracion?.total ?? Infinity;

      const cargados = offset - inicio;
      const restantes = total - cargados;

      const limite = Math.min(
        POKEMONS_PER_PAGE,
        restantes
      );

      const respuesta = await fetch(
        `${URL_POKEMONS}?limit=${limite}&offset=${offset}`
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

      offsetRef.current += detalles.length;

      const nuevosCargados =
        offsetRef.current - inicio;

      if (
        nuevosCargados >= total ||
        !datos.next
      ) {
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
    offsetRef.current = configuracion?.offset ?? 0;

    setPokemons([]);
    setHayMas(true);
    setError(null);

    cargarMas();
  }, [region]);

  return {
    pokemons,
    loading,
    error,
    cargarMas,
    hayMas,
  };
}

export default useFetchPokemon;