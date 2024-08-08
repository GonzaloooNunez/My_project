import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchGameById,
  addRating,
  addComment,
  deleteComment,
  updateGame,
} from "../Api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import "../styles/GameDetailPage.css";
import "../styles/EditGameDetail.css";

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
  const [userRating, setUserRating] = useState(null); // Valoración del user
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedGame, setEditedGame] = useState({
    name: "",
    imagen: "",
    precio: 0,
    stock: 0,
    description: "",
  });

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
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        if (user && token) {
          setUser({ ...user, token });
          setIsAdmin(user.role === "Admin");

          const savedRating = response.data.ratings.find(
            (rating) => rating.userId === user._id
          );
          if (savedRating) {
            setUserRating(savedRating.rating);
          }
        } else {
          console.log("No user or token found in localStorage");
        }

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
      setIsAdmin(user.role === "Admin");
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
      localStorage.setItem(`rating_${gameId}_${user._id}`, newRating);
      await addRating(gameId, newRating, user._id);

      setGame((prevGame) => {
        const existingRatingIndex = prevGame.ratings.findIndex(
          (r) => r.userId === user._id
        );

        if (existingRatingIndex > -1) {
          prevGame.ratings[existingRatingIndex].rating = newRating;
        } else {
          prevGame.ratings.push({ userId: user._id, rating: newRating });
        }

        return {
          ...prevGame,
          ratings: [...prevGame.ratings],
        };
      });
      setUserRating(newRating);
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
      setComments((prevComments) => [newComment, ...prevComments]);
      setComment("");
    } catch (error) {
      setError("Error adding comment");
      console.error("Error adding comment:", error);
    }
  };

  const handleCancelComment = () => {
    setComment("");
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

  const handleAdminDeleteComment = async (commentId) => {
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedGame((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateGame(gameId, editedGame);
      setGame((prev) => ({ ...prev, ...editedGame }));
      setEditMode(false);
    } catch (error) {
      setError("Error updating game details");
      console.error("Error updating game details:", error);
    }
  };

  const handleEditToggle = () => {
    if (editMode) {
      setEditMode(false);
    } else {
      setEditedGame({
        name: game.name,
        imagen: game.imagen,
        precio: game.precio,
        stock: game.stock,
        description: game.description,
      });
      setEditMode(true);
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
    const month = String(date.getMonth() + 1).padStart(2, "0");
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
      {isAdmin && (
        <div className="edit-game-container">
          {editMode ? (
            <form onSubmit={handleEditSubmit} className="edit-game-form">
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={editedGame.name}
                  onChange={handleEditChange}
                  placeholder="Nombre del juego"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="imagen">Imagen:</label>
                <input
                  id="imagen"
                  type="text"
                  name="imagen"
                  value={editedGame.imagen}
                  onChange={handleEditChange}
                  placeholder="URL de la imagen"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio:</label>
                <input
                  id="precio"
                  type="number"
                  name="precio"
                  value={editedGame.precio}
                  onChange={handleEditChange}
                  placeholder="Precio"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock:</label>
                <input
                  id="stock"
                  type="number"
                  name="stock"
                  value={editedGame.stock}
                  onChange={handleEditChange}
                  placeholder="Stock"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción:</label>
                <textarea
                  id="description"
                  name="description"
                  value={editedGame.description}
                  onChange={handleEditChange}
                  placeholder="Descripción"
                  required
                />
              </div>
              <button type="submit">Guardar cambios</button>
              <button type="button" onClick={handleEditToggle}>
                Cancelar
              </button>
            </form>
          ) : (
            <button onClick={handleEditToggle}>Editar</button>
          )}
        </div>
      )}
      <h3 className="game-comments-title">{comments.length} Comentarios</h3>
      {user && (
        <div className="rating-comment-section">
          <div className="rating-container">
            <div className="star-rating">
              {[...Array(5)].map((_, i) => {
                const starValue = 5 - i;
                return (
                  <React.Fragment key={i}>
                    <input
                      type="radio"
                      id={`star${starValue}`}
                      name="rating"
                      value={starValue}
                      checked={userRating === starValue}
                      onChange={() => handleRatingChange(starValue)}
                    />
                    <label
                      htmlFor={`star${starValue}`}
                      className={`star ${
                        userRating >= starValue ? "selected" : ""
                      }`}
                    >
                      ★
                    </label>
                  </React.Fragment>
                );
              })}
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
              {user && (user._id === comment.userId || isAdmin) && (
                <button
                  className="delete-comment-button"
                  onClick={() =>
                    isAdmin
                      ? handleAdminDeleteComment(comment._id)
                      : handleDeleteComment(comment._id)
                  }
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
