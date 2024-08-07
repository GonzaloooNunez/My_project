/*import React, { useEffect, useState } from "react";
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
  const [userName, setUserName] = useState(""); // Nuevo estado para el nombre del usuario
  const [userId, setUserId] = useState(""); // Nuevo estado para el ID del usuario
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

  return <>HOLA ADMIN</>;
};

export default UserLogedPage;*/
