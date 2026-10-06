import { useState } from "react";

function useCapturarPokemon(pokemonID) {
  const [capturado, setCapturar] = useState(false);

  const capturarPokemon = () => {
    setCapturar(true);
  };

  const liberarPokemon = () => {
    setCapturar(false);
  };

  return {
    capturado,
    capturarPokemon,
    liberarPokemon,
  };
}

export default useCapturarPokemon;
