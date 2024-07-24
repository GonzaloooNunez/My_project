import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchGames } from "../Api";

const UserLogedPage = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Recupera el userId desde el localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await fetchGames();
        setGames(response.data);
      } catch (error) {
        setError("Error fetching games");
        console.error("Error fetching games:", error);
      }
    };
    getGames();
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => navigate(`/user-profile/${userId}`)}>
          Perfil
        </button>{" "}
        <button onClick={() => alert("Botón 2 clickeado")}>Carrito</button>
      </div>
      <h1>Game List</h1>
      {error && <p>{error}</p>}
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            <Link to={`/games/${game._id}`}>
              <h2>{game.nombre}</h2>
            </Link>
            <p>Categoría: {game.categoria}</p>
            <p>Precio: {game.precio}</p>
            <p>Stock: {game.stock}</p>
            <img src={game.imagen} alt={game.nombre} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserLogedPage;
