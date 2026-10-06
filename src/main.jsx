import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./pages/Layout.jsx";
import Index from "./pages/Index.jsx";
import Pokemons from "./pages/Pokemons.jsx";
import PaginaError from "./pages/PaginaError.jsx";
import DetallePokemon from "./pages/DetallePokemon.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Registro from "./pages/Registro.jsx";

const mapaRutas = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "pokedex", element: <Pokemons /> },
      { path: "pokedex/:id", element: <DetallePokemon /> },
      { path: "login", element: <Login /> },
      { path: "registro", element: <Registro /> },
      { path: "*", element: <PaginaError /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={mapaRutas} />
    </AuthProvider>
  </StrictMode>,
);
