import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGameById, addRating, addComment, deleteComment } from "../Api";
import "../styles/GameDetailPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

const GameDetailPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getGame = async () => {
      try {
        const response = await fetchGameById(gameId);
        setGame(response.data);
        setComments(
          response.data.comments.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          )
        );
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setIsAddedToCart(cart.some((item) => item._id === response.data._id));
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
      const newComment = {
        userId: user._id,
        comment,
        userName: user.name || "Anónimo",
        date: new Date().toISOString(),
      };
      setComments((prevComments) => [newComment, ...prevComments]); // Agrega el nuevo comentario al inicio
      setComment("");
    } catch (error) {
      setError("Error adding comment");
      console.error("Error adding comment:", error);
    }
  };

  const handleCancelComment = () => {
    setComment(""); // Limpia el contenido del área de texto
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
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
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
    if (!isAddedToCart) {
      cart.push(game);
      localStorage.setItem("cart", JSON.stringify(cart));
      setIsAddedToCart(true);
    } else {
      alert("Este juego ya está en el carrito");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses son base 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
          <button
            className={`add-to-cart-button ${
              isAddedToCart ? "added-to-cart-button" : ""
            }`}
            onClick={handleAddToCart}
            disabled={isAddedToCart}
          >
            {isAddedToCart ? (
              <>
                <FontAwesomeIcon icon={faCheck} className="icon-check" />
                <span>En el carrito</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCartPlus} className="icon" />
                <span>Añadir al carrito</span>
              </>
            )}
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
      <h3 className="game-comments-title">{comments.length} Comentarios</h3>
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
            <p className="current-rating">Valoración: {averageRating}</p>
          </div>
          <div className="comments-section">
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                className="comment-textarea"
                placeholder="Deja tu opinión..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              {comment.trim() && (
                <div className="comment-buttons-container">
                  <button type="submit" className="submit-comment-button">
                    Comentar
                  </button>
                  <button
                    type="button"
                    className="cancel-comment-button"
                    onClick={handleCancelComment}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      <div className="game-comments">
        {comments.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <strong className="comment-username">
                  {comment.userName || "Anónimo"}
                </strong>{" "}
                -{" "}
                <span className="comment-date">{formatDate(comment.date)}</span>
              </div>
              <p>{comment.comment}</p>
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameDetailPage;
