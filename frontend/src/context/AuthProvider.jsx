import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "../api/axios";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const [user, setUser] = useState({
    id: null,
    fullname: null,
    username: null,
    profileImage: null,
    tagline: null,
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await axios.get("/check-auth");

        if (data.isAuthenticated) {
          setAuth(true);
          setUser({
            id: data.user.id,
            fullname: data.user.fullname,
            username: data.user.username,
            tagline: data.user.tagline,
            profileImage: `${data.user.profileImage}` || "/no-dp.png",
          });
        } else {
          setAuth(false);
        }
      } catch (error) {
        setAuth(false);
      }
    };

    verifyToken();
  }, [auth]);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ auth, user, setUser, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
