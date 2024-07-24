import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const login = (user) => {
    setUserId(user._id); // Guarda el ID del usuario después del inicio de sesión
  };

  const logout = () => {
    setUserId(null); // Limpia el ID del usuario al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
