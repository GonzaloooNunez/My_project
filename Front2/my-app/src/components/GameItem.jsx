import React from "react";

const GameItem = ({ game }) => {
  return (
    <div>
      <h3>{game.nombre}</h3>
      <p>Categoría: {game.categoria}</p>
      <p>Precio: ${game.precio}</p>
      <p>Stock: {game.stock}</p>
      <p>Fecha de Creación: {game.fecha_creacion}</p>
      <img src={game.imagen} alt={game.nombre} />
    </div>
  );
};

export default GameItem;
