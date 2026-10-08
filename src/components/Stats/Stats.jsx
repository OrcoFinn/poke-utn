import "./Stats.css";

const nombresStats = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "SA",
  "special-defense": "SD",
  speed: "Velocidad",
};

function Stats({ stats }) {
  return (
    <section className="stats-pokemon">
      <h2>Stats</h2>

      <div className="stat-grid">
        {stats.map((stat) => (
          <div className="stat" key={stat.stat.name}>
            <span>{nombresStats[stat.stat.name]}</span>
            <strong>{stat.base_stat}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
