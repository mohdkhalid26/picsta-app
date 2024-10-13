// components/PublicRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import usePathname from "../hooks/usePathname";

const PublicRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  // If the user is authenticated, redirect to the home page
  const path = usePathname()
  return auth ? <Navigate to={path} replace /> : children;
};

export default PublicRoute;
