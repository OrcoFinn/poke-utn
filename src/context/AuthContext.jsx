import { createContext, useContext, useState } from "react";
import { URL_USUARIOS } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    {
      const guardado = localStorage.getItem("usuario");

      return guardado ? JSON.parse(guardado) : null;
    }
  });

  const [error, setError] = useState(null);
  const guardarSesion = (usuarioLogueado) => {
    setUsuario(usuarioLogueado);
    localStorage.setItem("usuario", JSON.stringify(usuarioLogueado));
  };

  const login = async (email, password) => {
  setError(null);

  try {
    const emailCodificado = encodeURIComponent(email);

    const respuesta = await fetch(
      `${URL_USUARIOS}?email=${emailCodificado}`
    );

    if (!respuesta.ok) {
      setError("No se pudo conectar con el servidor");
      return false;
    }

    const encontrados = await respuesta.json();

    if (encontrados.length === 0) {
      setError("El email no está registrado");
      return false;
    }

    const usuarioEncontrado = encontrados[0];

    if (usuarioEncontrado.password !== password) {
      setError("Los datos ingresados son incorrectos");
      return false;
    }

    guardarSesion(usuarioEncontrado);

    return true;
  } catch (error) {
    console.error("Error en login:", error);
    setError("No se pudo conectar con el servidor");
    return false;
  }
};

  const registrar = async (name, email, password) => {
    setError(null);

    const yaExiste = await fetch(`${URL_USUARIOS}?email=${email}`);
    const coincidencias = await yaExiste.json();
    if (coincidencias.length > 0) {
      setError("Ese email ya se encuentra registrado");
      return false;
    }

    const respuesta = await fetch(URL_USUARIOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, pokemonsCapturados: [] }),
    });

    if (!respuesta.ok) {
      setError("No pudimos crear la respuesta");
      return false;
    }

    const nuevoUsuario = await respuesta.json();
    guardarSesion(nuevoUsuario);
    return true;
  };

 const capturarPokemon = async (pokemonID) => {
  if (!usuario) return;

  const capturados =
    usuario.pokemonsCapturados || [];

  if (capturados.includes(pokemonID)) {
    return;
  }

  const nuevosCapturados = [
    ...capturados,
    pokemonID,
  ];

  const respuesta = await fetch(
    `${URL_USUARIOS}/${usuario.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pokemonsCapturados: nuevosCapturados,
      }),
    }
  );

  if (!respuesta.ok) {
    throw new Error(
      "No se pudo guardar el Pokémon"
    );
  }

  const usuarioActualizado =
    await respuesta.json();

  // MUY IMPORTANTE
  setUsuario(usuarioActualizado);

  localStorage.setItem(
    "usuario",
    JSON.stringify(usuarioActualizado)
  );
};

 const liberarPokemon = async (pokemonID) => {
  if (!usuario) return;

  const capturados =
    usuario.pokemonsCapturados || [];

  const nuevosCapturados =
    capturados.filter(
      (id) => id !== pokemonID
    );

  const respuesta = await fetch(
    `${URL_USUARIOS}/${usuario.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pokemonsCapturados: nuevosCapturados,
      }),
    }
  );

  if (!respuesta.ok) {
    throw new Error(
      "No se pudo liberar el Pokémon"
    );
  }

  const usuarioActualizado =
    await respuesta.json();

  setUsuario(usuarioActualizado);

  localStorage.setItem(
    "usuario",
    JSON.stringify(usuarioActualizado)
  );
};

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        error,
        login,
        registrar,
        logout,
        capturarPokemon,
        liberarPokemon,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
