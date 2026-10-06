import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { registrar, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const exito = await registrar(name, email, password);
    if (exito) {
      navigate("/Pokedex");
    }
  };

  return (
    <section className="tarjeta auth">
      <h2>Crear cuenta</h2>
      <form className="formulario-auth" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="name">Tu nombre</label>
          <input
            type="text"
            placeholder="ingresá tu nombre"
            id="name"
            value={name}
            onChange={(evento) => setName(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="email">Email</label>
          <input
            type="email"
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
        <button type="submit">Registrar</button>
      </form>

      <p className="auth-link">¿Ya tenés cuenta?<Link to="/login">Iniciá sesión</Link></p>
    </section>
  );
}

export default Registro;
