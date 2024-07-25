import React, { useEffect, useState } from "react";
import api from "../Api";
import GameItem from "./GameItem";
import "../styles/ListGames.css"; // Asegúrate de importar los estilos necesarios

const GameList = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(""); // Si no estás usando el filtro, puedes eliminar este estado

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await api.get("/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = games.filter(
    (game) =>
      game.nombre.toLowerCase().includes(search.toLowerCase()) ||
      game.categoria.toLowerCase().includes(search.toLowerCase()) ||
      game.fecha_creacion.includes(search)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar juegos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="game-list">
        {filteredGames.map((game) => (
          <GameItem key={game._id} game={game} />
        ))}
      </ul>
    </div>
  );
};

export default GameList;
