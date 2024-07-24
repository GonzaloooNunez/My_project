import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchGames = () => api.get("/games", { withCredentials: true });
export const fetchGameById = (id) =>
  api.get(`/games/${id}`, { withCredentials: true });
export const createGame = (gameData) =>
  api.post("/games/create", gameData, { withCredentials: true });
export const signupUser = (userData) =>
  api.post("/user/signup", userData, { withCredentials: true });
export const loginUser = (userData) =>
  api.post("/user/login", userData, { withCredentials: true });
export const fetchUserById = (id) =>
  api.get(`/user/${id}`, { withCredentials: true });

export default api;
