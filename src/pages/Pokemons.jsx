import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useFetchPokemon from "../hooks/useFetchPokemon";
import { Buscador, CardPokemon, CardRegion, ModalPokemon } from "../components";
import "../components/Styles/Pokemons.css";
import logo from "../assets/pokeballicon.webp";

function Pokemons() {
  const [searchParams] = useSearchParams();

  const region = searchParams.get("region");
  const busqueda = searchParams.get("search") || "";

  const { usuario } = useAuth();

  const { pokemons, loading, error, cargarMas, hayMas } =
    useFetchPokemon(region);

  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [loadingBusqueda, setLoadingBusqueda] = useState(false);

  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);

  const location = useLocation();
  const observerRef = useRef(null);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const termino = busqueda.trim().toLowerCase();

    if (!termino) {
      setResultadosBusqueda([]);
      return;
    }

    const buscarPokemon = async () => {
      setLoadingBusqueda(true);

      try {
        const respuesta = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=386",
        );

        if (!respuesta.ok) {
          throw new Error("Error al buscar Pokémon");
        }

        const datos = await respuesta.json();

        const coincidencias = datos.results.filter((pokemon) =>
          pokemon.name.includes(termino),
        );

        const detalles = await Promise.all(
          coincidencias.map(async (pokemon) => {
            const respuesta = await fetch(pokemon.url);

            if (!respuesta.ok) {
              throw new Error(`Error al cargar ${pokemon.name}`);
            }

            return respuesta.json();
          }),
        );

        setResultadosBusqueda(detalles);
      } catch (error) {
        console.error(error);
        setResultadosBusqueda([]);
      } finally {
        setLoadingBusqueda(false);
      }
    };

    buscarPokemon();
  }, [busqueda]);

  const listaMostrar = busqueda ? resultadosBusqueda : pokemons;

  useEffect(() => {
    if (location.state?.desdeMenu) {
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  useEffect(() => {
    const scrollGuardado = sessionStorage.getItem("pokedexScroll");

    if (!scrollGuardado) return;

    const posicion = Number(scrollGuardado);

    requestAnimationFrame(() => {
      window.scrollTo(0, posicion);
    });
  }, [pokemons]);

  useEffect(() => {
    if (busqueda) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
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
  }, [busqueda, pokemons.length, hayMas, loading, cargarMas]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="tarjeta">
      <Buscador />

      {loadingBusqueda && (
        <div className="scroll-loading">
          <img className="pokeball-loading" src={logo} alt="Cargando" />
          <p>Buscando Pokémon...</p>
        </div>
      )}

      {!loadingBusqueda && (
        <div className="pokemon">
          {listaMostrar.map((pokemon) => (
            <CardPokemon
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => setPokemonSeleccionado(pokemon)}
            />
          ))}

          {busqueda && listaMostrar.length === 0 && (
            <p>No se encontraron Pokémon.</p>
          )}
        </div>
      )}

      {pokemonSeleccionado && (
        <ModalPokemon
          pokemon={pokemonSeleccionado}
          onClose={() => setPokemonSeleccionado(null)}
        />
      )}

      {!busqueda && hayMas && (
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
