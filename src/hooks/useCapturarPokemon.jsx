import { useAuth } from "../context/AuthContext";

function useCapturarPokemon(pokemonID) {
  const {
    usuario,
    capturarPokemon,
    liberarPokemon,
  } = useAuth();

  const capturados =
    usuario?.pokemonsCapturados || [];

  const capturado = capturados.includes(pokemonID);

  return {
    capturado,
    capturarPokemon: () =>
      capturarPokemon(pokemonID),
    liberarPokemon: () =>
      liberarPokemon(pokemonID),
  };
}

export default useCapturarPokemon;