import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutForm from "./components/LogoutForm";
import SignupPage from "./pages/SignupPage";
import GameDetailPage from "./pages/GameDetailPage";
import UserLogedPage from "./pages/UserLogedPage";
import CartPage from "./pages/CartPage";
import UserProfilePage from "./pages/UserProfilePage";
import "./styles/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

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
          {isAuthenticated ? (
            <Route path="/" element={<Navigate to="/user-logged" replace />} />
          ) : (
            <Route path="/" element={<HomePage />} />
          )}
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/logout"
            element={<LogoutForm onLogout={() => setIsAuthenticated(false)} />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/games/:gameId" element={<GameDetailPage />} />
          <Route path="/user-logged" element={<UserLogedPage />} />
          <Route path="/cart/:userId" element={<CartPage />} />
          <Route path="/user-profile/:userId" element={<UserProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
