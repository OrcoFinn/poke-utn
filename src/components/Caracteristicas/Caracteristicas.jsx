import "./Caracteristicas.css";
import "../Stats/Stats.css"

const nombresHabitat = {
  cave: "Cueva",
  forest: "Bosque",
  grassland: "Pradera",
  mountain: "Montaña",
  rare: "Raro",
  roughTerrain: "Terreno rocoso",
  sea: "Mar",
  urban: "Urbano",
  "waters-edge": "Orilla del agua",
};

function Caracteristicas(pokemon, species) {
  if ( !pokemon || !species) {
    return ;
  }

  return (
    <section className="stats-pokemon">
      <h2>Caracteristicas</h2>
      <div className=".stat-info">
        <span>Altura</span>
        <strong>{pokemon.height / 10} m</strong>
      </div>

      <div className=".stat-info">
        <span>Peso</span>
        <strong>{pokemon.weight / 10} m</strong>
      </div>

      <div className=".stat-info">
        <span>Experiencia base</span>
        <strong>{pokemon.base_experience}</strong>
      </div>

      <div className=".stat-info">
        <span>Habitat</span>
        {nombresHabitat[species.habitat?.name] || "Desconocido"}
      </div>
    </section>
  );
}

export default Caracteristicas;
