// src/components/ProtectedRoute.jsx (ensure correct casing)
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user); // Get entire user object
  const token = user?.token; // Safely access token

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;