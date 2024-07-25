import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../Api";
import "../styles/GameDetailPage.css"; // Importa el CSS aquí

const GameDetailPage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getGame = async () => {
      try {
        const response = await fetchGameById(gameId);
        setGame(response.data);
      } catch (error) {
        setError("Error fetching game details");
        console.error("Error fetching game details:", error);
      }
    };
    getGame();
  }, [gameId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div className="game-detail-container">
      <div className="game-info">
        <img src={game.imagen} alt={game.nombre} />
        <div className="game-details">
          <h2>{game.nombre}</h2>
          <p>Categoría: {game.categoria}</p>
          <p>Precio: {game.precio}</p>
          <p>Stock: {game.stock}</p>
        </div>
      </div>
      <div className="game-description">
        <p>Acerca del juego: {game.description}</p>
      </div>
    </div>
  );
};

export default GameDetailPage;
