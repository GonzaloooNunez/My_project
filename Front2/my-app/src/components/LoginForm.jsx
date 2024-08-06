import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Api";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("antes");
      const response = await loginUser(form);
      const { userId, token, message } = response.data;
      console.log("despues");

      if (userId) {
        // Almacena el token y el userId en el localStorage (opcional)
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);

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
