import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGameById, addRating, addComment, deleteComment } from "../Api";
import "../styles/GameDetailPage.css";

const GameDetailPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser({ ...user, token });
    } else {
      console.log("No user or token found in localStorage");
    }
  }, []);

  const handleRatingChange = async (newRating) => {
    if (!user) {
      setError("You must be logged in to rate this game.");
      return;
    }
    try {
      await addRating(gameId, newRating);
      setGame((prevGame) => ({
        ...prevGame,
        ratings: [...prevGame.ratings, { userId: user._id, rating: newRating }],
      }));
      setRating(newRating);
    } catch (error) {
      setError("Error adding rating");
      console.error("Error adding rating:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Tienes que estar logueado para comentar.");
      return;
    }
    try {
      await addComment(gameId, { comment });
      setGame((prevGame) => ({
        ...prevGame,
        comments: [
          ...prevGame.comments,
          {
            userId: user._id,
            comment,
            userName: user.name || "Anónimo",
          },
        ],
      }));
      setComment("");
    } catch (error) {
      setError("Error adding comment");
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) {
      setError("You must be logged in to delete a comment.");
      return;
    }

    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este comentario?"
    );

    if (confirmDelete) {
      try {
        await deleteComment(gameId, commentId);

        setGame((prevGame) => ({
          ...prevGame,
          comments: prevGame.comments.filter(
            (comment) => comment._id !== commentId
          ),
        }));
      } catch (error) {
        setError("Error deleting comment");
        console.error("Error deleting comment:", error);
      }
    }
  };

  const calculateAverageRating = () => {
    if (!game || !game.ratings || game.ratings.length === 0) return 0;
    const totalRatings = game.ratings.reduce((sum, r) => sum + r.rating, 0);
    return (totalRatings / game.ratings.length).toFixed(2);
  };

  const averageRating = calculateAverageRating();

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.find((item) => item._id === game._id)) {
      cart.push(game);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Juego añadido al carrito");
    } else {
      alert("Este juego ya está en el carrito");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div className="game-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver
      </button>
      <div className="game-info">
        <img src={game.imagen} alt={game.name} />
        <div className="game-details">
          <h2>{game.name}</h2>
          <p>
            <i>Categoría:</i> {game.categoria}
          </p>
          <p>
            <i>Precio:</i> {game.precio === 0 ? "Gratis" : `${game.precio} €`}
          </p>
          <p>
            <i>Stock: </i>
            {game.stock}
          </p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Añadir al carrito
          </button>
        </div>
      </div>
      <div className="game-description">
        <p>
          <strong>Acerca del juego: </strong>
          <br />
          <br />
          {game.description}
        </p>
      </div>
      {user && (
        <div className="rating-comment-section">
          <div className="rating-container">
            <div className="star-rating">
              {[...Array(5)].map((_, i) => (
                <React.Fragment key={i}>
                  <input
                    type="radio"
                    id={`star${i + 1}`}
                    name="rating"
                    value={i + 1}
                    checked={rating === i + 1}
                    onChange={() => handleRatingChange(i + 1)}
                  />
                  <label htmlFor={`star${i + 1}`}>★</label>
                </React.Fragment>
              ))}
            </div>
            <p className="current-rating">
              Valoración: {averageRating} estrellas
            </p>
          </div>
          <div className="comments-section">
            <h3>Deja tu opinión:</h3>
            <form onSubmit={handleCommentSubmit}>
              <label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
      <div className="game-comments">
        <h3>Opiniones:</h3>
        {game.comments.length === 0 ? (
          <p>No hay opiniones aún.</p>
        ) : (
          game.comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>
                <strong>{comment.userName || "Anónimo"}:</strong>{" "}
                {comment.comment}
                {user && user._id === comment.userId && (
                  <button
                    className="delete-comment-button"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/7491/7491835.png"
                      alt="Delete"
                    />
                  </button>
                )}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameDetailPage;
