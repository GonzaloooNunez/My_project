import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../Api"; // Asegúrate de que la ruta sea correcta

const UserProfile = () => {
  const { userId } = useParams(); // Usando parámetros de ruta para obtener el ID del usuario
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUserById(userId);
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <p>
        <strong>ID:</strong> {user._id}
      </p>
      <p>
        <strong>Nombre:</strong> {user.nombre}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Fecha de Creación:</strong>{" "}
        {new Date(user.fecha_creacion).toLocaleDateString()}
      </p>
    </div>
  );
};

export default UserProfile;
