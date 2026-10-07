function Totalizador({ capturados = [] }) {
  const totalPokemon = 386;
  const capturaCuenta = capturados.length;

  return (
    <div className="pokemon-progress">
      <span>Pokémon capturados:</span>

      <strong>
        {capturaCuenta} / {totalPokemon}
      </strong>
    </div>
  );
}

export default Totalizador;
