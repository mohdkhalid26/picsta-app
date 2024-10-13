// components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import usePathname from "../hooks/usePathname";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const path = usePathname();

  return auth ? (
    path === "/signup" ? (
      <Navigate to="/" replace />
    ) : (
      children
    )
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
