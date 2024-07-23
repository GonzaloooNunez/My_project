import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchGames = () => api.get("/games");
export const fetchGameById = (id) => api.get(`/games/${id}`);
export const createGame = (gameData) => api.post("/games/create", gameData);
export const signupUser = (userData) => api.post("/user/signup", userData);
export const loginUser = (userData) => api.post("/user/login", userData);

export default api;
