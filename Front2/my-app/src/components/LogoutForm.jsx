import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutForm = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    onLogout(); // Actualiza el estado de autenticación

    navigate("/"); // Redirige a la página de inicio
  }, []);

  return null;
};

export default LogoutForm;
