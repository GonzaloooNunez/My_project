import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const removeFromCart = (gameId) => {
    const updatedCart = cartItems.filter((game) => game._id !== gameId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver
      </button>
      <h1>Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p>No hay juegos en el carrito.</p>
      ) : (
        <ul>
          {cartItems.map((game) => (
            <li key={game._id} className="cart-item">
              <div className="image-container">
                <img src={game.imagen} alt={game.name} />
              </div>
              <div className="game-details">
                <h2>{game.name}</h2>
                <p className="categoria">{game.categoria}</p>
                <p className="precio">
                  {game.precio === 0 ? "Gratis" : `${game.precio} €`}
                </p>
                <button
                  className="remove-from-cart-button"
                  onClick={() => removeFromCart(game._id)}
                >
                  Quitar del carrito
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="button-container"></div>
    </div>
  );
};

export default CartPage;
