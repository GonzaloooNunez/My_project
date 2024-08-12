import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Api";
import "../styles/LoginForm.css";

const LoginForm = ({ onLogin }) => {
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
        localStorage.setItem("userId", user.id);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        localStorage.removeItem("cart");

        onLogin();

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
    <div className="form-container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="input-field"
          />
          <div className="button-container">
            <button className="button-style button-login-style" type="submit">
              Iniciar sesión
            </button>
            <button
              className="button-style button-home-style"
              onClick={handleGoHome}
            >
              Volver
            </button>
          </div>
          {message && <p className="error-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
