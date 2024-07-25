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

export default api;
