import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../Api";
import "../styles/SignupForm.css"; // Asegúrate de que la ruta sea correcta

const SignupForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    role: "User",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(form);
      setMessage("Usuario registrado exitosamente");
      setTimeout(() => {
        navigate("/user-logged");
      }, 4000);
    } catch (error) {
      setMessage("Error al registrar usuario");
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
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="input-field"
          />
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
            <button className="button-style button-signup-style" type="submit">
              Registrarse
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

export default SignupForm;
