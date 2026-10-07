import { useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useFetchPokemon from "../hooks/useFetchPokemon";
import {
  Buscador,
  CardPokemon,
} from "../components";
import "../components/Styles/Pokemons.css";

function Pokemons() {
  const [searchParams] = useSearchParams();

  const region = searchParams.get("region");

  const {
    pokemons,
    loading,
    error,
    cargarMas,
    hayMas,
  } = useFetchPokemon(region);


  const location = useLocation();

  const observerRef = useRef(null);

  useEffect(() => {
    if (location.state?.desdeMenu) {
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  useEffect(() => {
    const scrollGuardado = sessionStorage.getItem("pokedexScroll");

    if (!scrollGuardado) return;

    const posicion = Number(scrollGuardado);

    // Esperamos a que React pinte los Pokémon
    requestAnimationFrame(() => {
      window.scrollTo(0, posicion);
    });
  }, [pokemons]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          cargarMas();
        }
      },
      {
        rootMargin: "200px",
      },
    );

    const pokemonGuardado = Number(sessionStorage.getItem("pokedexPokemon"));

    if (
      pokemonGuardado &&
      pokemons.length < pokemonGuardado &&
      hayMas &&
      !loading
    ) {
      cargarMas();
    }

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="tarjeta">
      <Buscador />
      <div className="pokemon">
        {pokemons.map((pokemon) => (
          <CardPokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {hayMas && (
        <div ref={observerRef}>{loading && <p>Cargando Pokémon...</p>}</div>
      )}
    </section>
  );
}

export default Pokemons;
