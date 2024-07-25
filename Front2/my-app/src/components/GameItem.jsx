import React from "react";
import { Link } from "react-router-dom";
import "../styles/ListGames.css";

const GameItem = ({ game }) => {
  return (
    <li key={game._id} className="game-item">
      <Link to={`/games/${game._id}`}>
        <div className="image-container">
          <img src={game.imagen} alt={game.nombre} />
        </div>
        <div className="game-details">
          <h2>{game.nombre}</h2>
          <p className="categoria">{game.categoria}</p>
          <p className="precio">{game.precio} €</p>
        </div>
      </Link>
    </li>
  );
};

export default GameItem;
