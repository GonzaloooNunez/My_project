import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GameDetailPage from "./pages/GameDetailPage";
import UserLogedPage from "./pages/UserLogedPage";
import UserProfilePage from "./pages/UserProfilePage";
import UsersProfile from "./pages/UsersProfile"; // Ruta corregida
import "./styles/App.css";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/games/:gameId" element={<GameDetailPage />} />
          <Route path="/user-logged" element={<UserLogedPage />} />
          <Route path="/user-profile/:userId" element={<UserProfilePage />} />
          <Route path="/users" element={<UsersProfile />} /> /*simplemente para
          ver los ID se puede prescindir*/
        </Routes>
      </div>
    </Router>
  );
}

export default App;
