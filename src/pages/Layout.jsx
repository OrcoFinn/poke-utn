import { Outlet, useLocation } from "react-router-dom";
import {
 Header
} from "../components";
import "../App.css";
import "./styles/Layout.css"

function Layout() {
  const location = useLocation();

  const ocultarHeader =
    location.pathname === "/login" || location.pathname === "/registro";

  return (
    <main className="app">
      {!ocultarHeader && <Header />}

      <Outlet />
    </main>
  );
}

export default Layout;
