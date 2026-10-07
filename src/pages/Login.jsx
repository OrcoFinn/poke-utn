import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../components";
import logo from "../assets/pokeballicon.webp";
import "./styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const exito = await login(email, password);
    if (exito) {
      navigate("/");
    }
  };

  return (
    <section className="tarjeta-auth">
      <div className="grupo-login">
        <div className="head-login">
          <h2>Le damos la bienvenida a tu</h2>
          <h1 className="login-title">POKÉDEX</h1>
        </div>
        <div className="card-login">
          <img src={logo} />
          <h4 className="titulo">Ingresá tus datos para iniciar sesión</h4>
          <form className="formulario-auth" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="email@email.com"
              id="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="Ingresá tu contraseña"
              id="password"
              value={password}
              onChange={(evento) => setPassword(evento.target.value)}
            />

            {error && <p className="error-mensaje">{error}</p>}
            <Button type="submit">Iniciar Sesión</Button>
            {/* <button type="submit">Iniciar Sesión</button> */}
          </form>
          <p className="auth-link">
            ¿No tenés cuenta?<Link to="/registro">Creá tu cuenta</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
