import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { loginUser } from "../Api";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Crea una instancia de navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(form);
      setMessage("Usuario logueado exitosamente");
      console.log(response.data.token); // Aquí puedes guardar el token en el localStorage o en un contexto de autenticación
      navigate("/user-logged"); // Redirige a la página principal
    } catch (error) {
      setMessage("Error al loguear usuario");
    }
  };
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleGoHome}>Home</button>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
