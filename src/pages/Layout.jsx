import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import "../App.css"

function Layout() {
  return (
    <main className="app">
      <Header />

      <Outlet />
    </main>
  );
}

export default Layout;
