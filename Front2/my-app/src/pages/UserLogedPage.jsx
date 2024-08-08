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
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [cartCount, setCartCount] = useState(0); // Estado para contar los juegos en el carrito
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name);
        setUserId(parsedUser._id);
      }
    };

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

    getUserInfo();
    getGames();
    updateCartCount(); // Actualizar el contador al cargar el componente
  }, []);

  useEffect(() => {
    let filtered = games;

    if (selectedCategory) {
      filtered = filtered.filter((game) => game.categoria === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  const handleAddToCart = () => {
    updateCartCount(); // Actualizar el contador al añadir un juego
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
          onClick={() => navigate(`/cart/${userId}`)}
          className="cart-button"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/9356/9356974.png"
            alt="Carrito"
          />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
      <h1 className="homepage-titulo">
        <img
          src="https://images.emojiterra.com/twitter/v13.1/512px/1f3ae.png"
          alt="Game Controller"
          className="title-image"
        />
        EL VICIOTE.COM
      </h1>
      <h2>Bienvenido {userName}!</h2>
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
          filteredGames.map((game) => (
            <GameItem
              key={game._id}
              game={game}
              onAddToCart={handleAddToCart} // Pasar la función como prop
            />
          ))
        ) : (
          <p>No se han encontrado juegos.</p>
        )}
      </ul>
    </div>
  );
};

export default UserLogedPage;
