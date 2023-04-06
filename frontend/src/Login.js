import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  let navigate = useNavigate();
  const handleLogin = () => {
    // Aquí iría el código de autenticación y verificación de credenciales del usuario
    // Si las credenciales son correctas, redirigimos a la página de inicio
    navigate("/home");
  };
  return (
    <div className="login">
      <div className="position">
        <h1>Login</h1>
        <div className="input-container">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@uda.edu.mx"
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder=".........................."
            required
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default Login;