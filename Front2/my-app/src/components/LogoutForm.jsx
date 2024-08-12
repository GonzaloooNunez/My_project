import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutForm = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    onLogout();

    const timer = setTimeout(() => {
      navigate("/");
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate, onLogout]);

  return null;
};

export default LogoutForm;
