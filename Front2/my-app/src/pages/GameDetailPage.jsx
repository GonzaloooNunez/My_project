import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGameById, addRating, addComment } from "../Api";
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
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (userId && token) {
      setUser({ userId, token });
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
        ratings: [
          ...prevGame.ratings,
          { userId: user.userId, rating: newRating },
        ],
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
      setError("You must be logged in to comment on this game.");
      return;
    }
    try {
      await addComment(gameId, comment);
      setGame((prevGame) => ({
        ...prevGame,
        comments: [...prevGame.comments, { userId: user.userId, comment }],
      }));
      setComment("");
    } catch (error) {
      setError("Error adding comment");
      console.error("Error adding comment:", error);
    }
  };

  const calculateAverageRating = () => {
    if (!game || !game.ratings || game.ratings.length === 0) return 0;
    const totalRatings = game.ratings.reduce((sum, r) => sum + r.rating, 0);
    return (totalRatings / game.ratings.length).toFixed(2);
  };

  const averageRating = calculateAverageRating();

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
        <img src={game.imagen} alt={game.nombre} />
        <div className="game-details">
          <h2>{game.nombre}</h2>
          <p>
            <i>Categoría:</i> {game.categoria}
          </p>
          <p>
            <i>Precio:</i> {game.precio} €
          </p>
          <p>
            <i>Stock: </i>
            {game.stock}
          </p>
        </div>
      </div>
      <div className="game-description">
        <p>
          <strong>Acerca del juego: </strong>
          <br></br>
          <br></br>
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
          game.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>Usuario {comment.userId.name}:</strong>{" "}
                {comment.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameDetailPage;

/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById, addRating, addComment } from "../Api";
import "../styles/GameDetailPage.css"; // Importa el CSS aquí

const GameDetailPage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0); // Para el estado de las estrellas seleccionadas
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
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (userId && token) {
      setUser({ userId, token });
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
        ratings: [
          ...prevGame.ratings,
          { userId: user.userId, rating: newRating },
        ],
      }));
      setRating(newRating); // Actualiza la valoración seleccionada
    } catch (error) {
      setError("Error adding rating");
      console.error("Error adding rating:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to comment on this game.");
      return;
    }
    try {
      await addComment(gameId, comment);
      setGame((prevGame) => ({
        ...prevGame,
        comments: [...prevGame.comments, { userId: user.userId, comment }],
      }));
      setComment("");
    } catch (error) {
      setError("Error adding comment");
      console.error("Error adding comment:", error);
    }
  };

  const calculateAverageRating = () => {
    if (!game || !game.ratings || game.ratings.length === 0) return 0;
    const totalRatings = game.ratings.reduce((sum, r) => sum + r.rating, 0);
    return (totalRatings / game.ratings.length).toFixed(2);
  };

  const averageRating = calculateAverageRating();

  if (error) {
    return <p>{error}</p>;
  }

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div className="game-detail-container">
      <div className="game-info">
        <img src={game.imagen} alt={game.nombre} />
        <div className="game-details">
          <h2>{game.nombre}</h2>
          <p>Categoría: {game.categoria}</p>
          <p>Precio: {game.precio}</p>
          <p>Stock: {game.stock}</p>
        </div>
      </div>
      <div className="game-description">
        <p>Acerca del juego: {game.description}</p>
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
          game.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>Usuario {comment.userId.name}:</strong>{" "}
                {comment.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameDetailPage;*/
