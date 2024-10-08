import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    updateCartSummary(cart);
  }, []);

  const updateCartSummary = (cart) => {
    const price = cart.reduce((acc, game) => acc + game.precio, 0);
    setTotalPrice(price);
    setTotalItems(cart.length);
  };

  const removeFromCart = (gameId) => {
    const updatedCart = cartItems.filter((game) => game._id !== gameId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartSummary(updatedCart);
  };

  const handleCheckout = () => {
    if (totalPrice === 0) {
      alert(`Descargar gratis ${totalItems} productos.`);
    } else {
      alert(
        `Realizando pago de ${totalPrice.toFixed(
          2
        )} € por ${totalItems} productos.`
      );
    }
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
                {game.precio > 0 && (
                  <p className="precio">{`${game.precio.toFixed(2)} €`}</p>
                )}
                {game.precio === 0 && <p className="precio">Gratis</p>}
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
      {cartItems.length > 0 && (
        <div className="summary">
          <p>Total de productos: {totalItems}</p>
          {totalPrice > 0 ? (
            <p>Precio total: {totalPrice.toFixed(2)} €</p>
          ) : (
            <p>Descargar gratis</p>
          )}
          <button className="checkout-button" onClick={handleCheckout}>
            {totalPrice === 0 ? "Descargar" : "Pagar y descargar"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
