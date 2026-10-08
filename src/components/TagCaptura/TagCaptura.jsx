import "./TagCaptura.css";
import useCapturarPokemon from "../../hooks/useCapturarPokemon";
import pokeball from "../../assets/pokeballicon.webp";

function TagCaptura({ pokemonID }) {
  const {
    capturado,
    capturarPokemon,
  } = useCapturarPokemon(pokemonID);

  return (
    <span
      className={`boton-capturar ${
        capturado ? "capturado" : ""
      }`}
      // onClick={
      //   capturado
      //     ? liberarPokemon
      //     : capturarPokemon
      // }
    >
      {capturado ? (
        <>
          <img src={pokeball} alt="" className="pokeball-captura"/>
          Liberar
        </>
      ) : (
        "Capturar"
      )}
    </span>
  );
}

export default TagCaptura;