import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCartPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import "../styles/GameItem.css";

// Función para añadir un juego al carrito en localStorage
const addToCart = (game) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(game);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Función para comprobar si un juego está en el carrito
const isGameInCart = (gameId) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.some((item) => item._id === gameId);
};

const GameItem = ({ game, onAddToCart }) => {
  const [added, setAdded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setAdded(isGameInCart(game._id));
  }, [game._id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!added) {
      addToCart(game);
      setAdded(true);
      onAddToCart(); // Llamar a la función para actualizar el contador
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
                  <FontAwesomeIcon icon={faCheck} className="icon-check" />
                  <span>Añadido al carro</span>
                </>
              ) : (
                <>
                  Añadir al carro{" "}
                  <FontAwesomeIcon icon={faCartPlus} className="icon-cart" />
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
