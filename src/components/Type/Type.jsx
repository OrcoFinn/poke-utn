
function Type({ pokemon }) {
  const tipoPrincipal = pokemon.types[0].type.name;

  const typeEmojis = {
    normal: "⚪",
    fire: "🔥",
    water: "💧",
    electric: "⚡",
    grass: "🌱",
    ice: "❄️",
    fighting: "🥊",
    poison: "☠️",
    ground: "🌍",
    flying: "🪽",
    psychic: "🔮",
    bug: "🐛",
    rock: "🪨",
    ghost: "👻",
    dragon: "🐉",
    dark: "🌑",
    steel: "⚙️",
    fairy: "🧚",
  };

  return (
    <p className={`tipo ${tipoPrincipal}`}>
      {pokemon.types.map((tipo) => (
        <span className="pokemon-type" key={tipo.type.name}>
          <span className="type-icon">{typeEmojis[tipo.type.name]}</span>

          <span>{tipo.type.name}</span>
        </span>
      ))}
    </p>
  );
}

export default Type;
