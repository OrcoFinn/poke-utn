import { URL_USUARIOS } from "../utils/api";

function useAuth() {
  const register = async (user) => {
    const response = await fetch(URL_USUARIOS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("No se pudo crear el usuario");
    }

    const data = await response.json();

    return data;
  };

  return {
    register,
  };
}
export default useAuth;
