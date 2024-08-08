import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutForm = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    onLogout();

    navigate("/");
  }, []);

  return null;
};

export default LogoutForm;
