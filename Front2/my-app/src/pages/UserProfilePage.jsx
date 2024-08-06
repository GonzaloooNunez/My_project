import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "../Api";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("User data not found in localStorage");
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id;

      if (!userId) {
        setError("User ID not found in localStorage");
        return;
      }

      try {
        const response = await fetchUserById(userId);
        setUser(response.data);
        setForm({
          nombre: response.data.nombre || "",
          email: response.data.email || "",
          password: "",
        });
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crear un objeto que contenga solo los campos que han sido cambiados
      const updatedUser = {
        nombre: form.nombre,
        email: form.email,
        ...(form.password && { password: form.password }), // Solo incluir la contraseña si está presente
      };
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setError("User data not found in localStorage");
        return;
      }
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id;
      await updateUser(userId, updatedUser);
      setUser({ ...user, ...updatedUser });
      setEditing(false);
    } catch (error) {
      setError("Error updating user data");
      console.error("Error updating user data:", error);
    }
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate("/user-logged")}>Home</button>

      <h1>Profile</h1>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Nueva Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Dejar vacío si no desea cambiar la contraseña"
            />
          </div>
          <button type="submit">Guardar</button>
          <button type="button" onClick={handleEditClick}>
            Cancelar
          </button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Nombre:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>{user.role}</strong>
          </p>
          <p>
            <strong>Fecha de Creación:</strong>{" "}
            {new Date(user.fecha_creacion).toLocaleDateString()}
          </p>
          <button onClick={handleEditClick}>Editar</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
