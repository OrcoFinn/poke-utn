import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useFetchPokemon from "../hooks/useFetchPokemon";
import { Buscador, CardPokemon, CardRegion, ModalPokemon } from "../components";
import "../components/Styles/Pokemons.css";
import logo from "../assets/pokeballicon.webp";

function Pokemons() {
  const [searchParams] = useSearchParams();
  const { usuario } = useAuth();

  const region = searchParams.get("region");

  const busqueda = searchParams.get("search") || "";
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);

  const { pokemons, loading, error, cargarMas, hayMas } =
    useFetchPokemon(region);

  const location = useLocation();

  const observerRef = useRef(null);
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

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
          <CardPokemon
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => setPokemonSeleccionado(pokemon)}
          />
        ))}
      </div>
      {pokemonSeleccionado && (
        <ModalPokemon
          pokemon={pokemonSeleccionado}
          onClose={() => setPokemonSeleccionado(null)}
        />
      )}

      {hayMas && (
        <div className="scroll-loading" ref={observerRef}>
          {loading && (
            <>
              <img className="pokeball-loading" src={logo} alt="Cargando" />
              <p>Cargando Pokémon...</p>
            </>
          )}
        </div>
      )}

      <nav className="nav-principal">
        <div className="regiones">
          <CardRegion
            img={logo}
            url="/pokedex?region=kanto"
            region="Pokedex de Kanto"
            header
          />
          <CardRegion
            img={logo}
            url="/pokedex?region=johto"
            region="Pokedex de Johto"
            header
          />
          <CardRegion
            img={logo}
            url="/pokedex?region=hoenn"
            region="Pokedex de Hoenn"
            header
          />
        </div>
      </nav>
    </section>
  );
}

export default Pokemons;
