import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../Api";

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
    <div>
      <h2>{game.nombre}</h2>
      <p>Categoría: {game.categoria}</p>
      <p>Precio: {game.precio}</p>
      <p>Stock: {game.stock}</p>
      <img src={game.imagen} alt={game.nombre} width="100" />
      <p>Acerca del juego: {game.description}</p>
    </div>
  );
};

export default GameDetailPage;
