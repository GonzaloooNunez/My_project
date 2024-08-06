import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGames } from "../Api";
import GameItem from "../components/GameItem";
import CategoryFilter from "../components/CategoryFilter";
import SearchFilter from "../components/SearchFilter";
import "../styles/UserLogedPage.css";

const UserLogedPage = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await fetchGames();
        setGames(response.data);
        setFilteredGames(response.data);

        const gameCategories = [
          ...new Set(response.data.map((game) => game.categoria)),
        ];
        setCategories(gameCategories);
      } catch (error) {
        setError("Error fetching games");
        console.error("Error fetching games:", error);
      }
    };

    getGames();
  }, []);

  useEffect(() => {
    let filtered = games;

    if (selectedCategory) {
      filtered = filtered.filter((game) => game.categoria === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((game) =>
        game.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGames(filtered);
  }, [selectedCategory, searchTerm, games]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="user-loged-page-container">
      <div className="navigation">
        <button
          onClick={() => navigate(`/user-profile/${userId}`)}
          className="profile-button"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
            alt="User Profile"
          />
        </button>
        <button
          onClick={() => alert("Botón 2 clickeado")}
          className="cart-button"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/9356/9356974.png"
            alt="Carrito"
          />
        </button>
      </div>
      <h1 className="homepage-titulo">EL VICIOTE.COM</h1>
      {error && <p>{error}</p>}
      <div className="user-filter-container">
        <div className="user-category-filter-custom">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </div>
      <ul className="game-list">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => <GameItem key={game._id} game={game} />)
        ) : (
          <p>No se han encontrado juegos.</p>
        )}
      </ul>
    </div>
  );
};

export default UserLogedPage;
/*import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGames } from "../Api";
import GameItem from "../components/GameItem";
import CategoryFilter from "../components/CategoryFilter";
import "../styles/UserLogedPage.css";

const UserLogedPage = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await fetchGames();
        setGames(response.data);
        setFilteredGames(response.data);

        const gameCategories = [
          ...new Set(response.data.map((game) => game.categoria)),
        ];
        setCategories(gameCategories);
      } catch (error) {
        setError("Error fetching games");
        console.error("Error fetching games:", error);
      }
    };

    getGames();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredGames(
        games.filter((game) => game.categoria === selectedCategory)
      );
    } else {
      setFilteredGames(games);
    }
  }, [selectedCategory, games]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="user-loged-page-container">
      <div className="navigation">
        <button
          onClick={() => navigate(`/user-profile/${userId}`)}
          className="profile-button"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
            alt="User Profile"
          />
        </button>
        <button
          onClick={() => alert("Botón 2 clickeado")}
          className="cart-button"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/9356/9356974.png"
            alt="Carrito"
          />
        </button>
      </div>
      <h1 className="homepage-titulo">Tu tIendA dE Ju€go$</h1>
      {error && <p>{error}</p>}
      <div className="user-category-filter">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <ul className="game-list">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => <GameItem key={game._id} game={game} />)
        ) : (
          <p>No games available.</p>
        )}
      </ul>
    </div>
  );
};

export default UserLogedPage;*/
