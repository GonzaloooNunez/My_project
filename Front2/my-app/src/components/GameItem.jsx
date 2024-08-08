import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCartPlus, faCheck } from "@fortawesome/free-solid-svg-icons"; // Importa el ícono de "tic"
import "../styles/ListGames.css";

// Función para añadir un juego al carrito en localStorage
const addToCart = (game) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(game);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const GameItem = ({ game }) => {
  const [added, setAdded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!added) {
      addToCart(game);
      setAdded(true);
    }
  };

  return (
    <li key={game._id} className="game-item">
      <Link to={`/games/${game._id}`}>
        <div className="image-container">
          <img src={game.imagen} alt={game.name} />
        </div>
        <div className="game-details">
          <h2>{game.name}</h2>
          <p className="categoria">{game.categoria}</p>
          <p className="precio">
            {game.precio === 0 ? "Gratis" : `${game.precio} €`}
          </p>
          {user && user.role === "Admin" && (
            <button className="admin-button">
              <FontAwesomeIcon icon={faEdit} /> Editar
            </button>
          )}
          {user && user.role === "User" && (
            <button
              className={`add-to-cart-button ${
                added ? "added-to-cart-button" : ""
              }`}
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? (
                <>
                  Juego añadido{" "}
                  <FontAwesomeIcon icon={faCheck} className="icon" />{" "}
                  {/* Cambiar el ícono aquí */}
                </>
              ) : (
                <>
                  Añadir al carro{" "}
                  <FontAwesomeIcon icon={faCartPlus} className="icon" />
                </>
              )}
            </button>
          )}
        </div>
      </Link>
    </li>
  );
};

export default GameItem;
