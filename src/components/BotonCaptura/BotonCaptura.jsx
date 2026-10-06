import "./BotonCaptura.css";
import useCapturarPokemon from "../../hooks/useCapturarPokemon";
import pokeball from "../../assets/pokeball.png";

function BotonCaptura({ pokemonID }) {
  const {
    capturado,
    capturarPokemon,
    liberarPokemon,
  } = useCapturarPokemon(pokemonID);

  return (
    <button
      className={`boton-capturar ${
        capturado ? "capturado" : ""
      }`}
      onClick={
        capturado
          ? liberarPokemon
          : capturarPokemon
      }
    >
      {capturado ? (
        <>
          <img src={pokeball} alt="" />
          Liberar
        </>
      ) : (
        "Capturar"
      )}
    </button>
  );
}

export default BotonCaptura;