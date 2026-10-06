import { useEffect, useState } from "react";

function useFetchHabilidades(abilities) {
  const [habilidades, setHabilidades] = useState([]);

  useEffect(() => {
    if (!abilities) return;

    const cargarhabilidades = async () => {
      const resultados = await Promise.all(
        abilities.map(async (habilidad) => {
          const respuesta = await fetch(habilidad.ability.url);
          return respuesta.json();
        }),
      );
      setHabilidades(resultados);
    };
    cargarhabilidades();
  }, [abilities]);

  return habilidades;
}

export default useFetchHabilidades;
