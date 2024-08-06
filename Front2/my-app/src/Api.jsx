import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const attachToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(attachToken);

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
export const fetchAllUsers = () =>
  api.get("/usuarios", { withCredentials: true });
export const updateUser = (id, userData) => api.put(`/user/${id}`, userData);
export const addRating = (gameId, rating) =>
  api.post(`/games/${gameId}/rate`, { rating });
export const addComment = async (gameId, commentData) => {
  const response = await api.post(`/games/${gameId}/comment`, commentData);
  return response.data;
};
export const deleteComment = async (gameId, commentId) => {
  const response = await api.delete(`/games/${gameId}/comments/${commentId}`);
  return response.data;
};

export default api;
