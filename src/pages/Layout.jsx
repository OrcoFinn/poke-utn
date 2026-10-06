import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import "../App.css";

function Layout() {
  const location = useLocation();

  const ocultarHeader =
    location.pathname === "login" || location.pathname === "registro";

  return (
    <main className="app">
      {ocultarHeader && <Header />}

      <Outlet />
    </main>
  );
}

export default Layout;
