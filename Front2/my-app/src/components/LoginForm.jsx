import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Api";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(form);
      const { token, user } = response.data;

      if (user) {
        // Almacena el token y el userId en el localStorage (opcional)
        localStorage.setItem("userId", user.id);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirige al perfil del usuario
        navigate(`/user-logged`);
      } else {
        setMessage("No se pudo obtener el ID del usuario.");
      }
    } catch (error) {
      setMessage(
        "Error al loguear usuario: " +
          (error.response?.data?.message || error.message)
      );
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
