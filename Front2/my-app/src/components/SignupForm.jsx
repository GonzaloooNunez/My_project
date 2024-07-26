import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../Api";

const SignupForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    nombre: "",
    role: "",
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

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
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
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignupForm;
