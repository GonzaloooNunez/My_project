import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutForm from "./components/LogoutForm";
import SignupPage from "./pages/SignupPage";
import GameDetailPage from "./pages/GameDetailPage";
import UserLogedPage from "./pages/UserLogedPage";
import UserProfilePage from "./pages/UserProfilePage";
import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <nav>
        <div className="nav-left">
          {!isAuthenticated && (
            <>
              <Link to="/login" className="nav-link">
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
        <div className="nav-right">
          {!isAuthenticated && (
            <Link to="/signup" className="nav-link-2">
              Registrarse
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/logout" className="nav-link">
              Cerrar sesión
            </Link>
          )}
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/logout"
            element={<LogoutForm onLogout={handleLogout} />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/games/:gameId" element={<GameDetailPage />} />
          <Route path="/user-logged" element={<UserLogedPage />} />
          <Route path="/user-profile/:userId" element={<UserProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
