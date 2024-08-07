import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "../Api";
import "../styles/UserProfilePage.css"; // Asegúrate de importar el archivo CSS

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    currentPassword: "",
  });
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
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
          name: response.data.name || "",
          email: response.data.email || "",
          password: "",
          currentPassword: "",
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

    if (!form.currentPassword) {
      setError("Por favor ingrese su contraseña actual.");
      return;
    }

    try {
      // Validar la contraseña actual
      const validationResponse = await fetchUserById(
        user._id,
        form.currentPassword
      );
      if (!validationResponse.valid) {
        setError("Contraseña actual incorrecta.");
        return;
      }

      // Preparar los datos del usuario para actualizar
      const updatedUser = {
        nombre: form.name,
        email: form.email,
        ...(form.password && { password: form.password }),
      };

      await updateUser(user._id, updatedUser);
      setUser({ ...user, ...updatedUser });
      setEditing(false);
      setError("");
    } catch (error) {
      setError("Error updating user data");
      console.error("Error updating user data:", error);
    }
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <button
        onClick={() => navigate("/user-logged")}
        className="user-profile-button"
      >
        Volver
      </button>
      <h1>Perfil del usuario</h1>
      {editing ? (
        <form onSubmit={handleSubmit} className="user-profile-form">
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.name}
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
          <div className="password-field">
            <label htmlFor="currentPassword">Contraseña Actual:</label>
            <input
              type={currentPasswordVisible ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value=""
              onChange={handleChange}
              required
              placeholder="Introduce tu contraseña actual"
            />
            <i
              className={`fa ${
                currentPasswordVisible ? "fa-eye-slash" : "fa-eye"
              } password-toggle`}
              onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
            ></i>
          </div>
          <div className="password-field">
            <label htmlFor="password">Nueva Contraseña:</label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Dejar vacío si no desea cambiar la contraseña"
            />
            <i
              className={`fa ${
                passwordVisible ? "fa-eye-slash" : "fa-eye"
              } password-toggle`}
              onClick={() => setPasswordVisible(!passwordVisible)}
            ></i>
          </div>
          <button type="submit" className="user-profile-button">
            Guardar
          </button>
          <button
            type="button"
            onClick={handleEditClick}
            className="user-profile-button"
          >
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
            <strong>Fecha de Creación:</strong>{" "}
            {new Date(user.fecha_creacion).toLocaleDateString()}
          </p>
          <button onClick={handleEditClick} className="user-profile-button">
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
