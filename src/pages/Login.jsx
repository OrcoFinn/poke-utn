import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const exito = await login(email, password);
    if (exito) {
      navigate("/Pokedex");
    }
  };

  return (
    <section className="tarjeta auth">
      <h2>Iniciar Sesion</h2>
      <form className="formulario-auth" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="email@email.com"
            id="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Ingresá tu contraseña"
            id="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
          />
        </div>

        {error && <p className="error-mensaje">{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p className="auth-link">
        ¿No tenés cuenta?<Link to="/registro">Creá tu cuenta</Link>
      </p>
    </section>
  );
}

export default Login;
