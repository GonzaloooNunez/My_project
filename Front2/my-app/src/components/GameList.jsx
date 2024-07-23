import React, { useEffect, useState } from "react";
import api from "../Api";
import GameItem from "./GameItem";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      const response = await api.get("/games");
      setGames(response.data);
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
      <div>
        {filteredGames.map((game) => (
          <GameItem key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
