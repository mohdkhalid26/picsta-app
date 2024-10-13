import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./module/home/index";
import Auth from "./module/auth";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import usePathname from "./hooks/usePathname";

function App() {
  const { auth } = useContext(AuthContext);
  const path = usePathname();
  const isAuthenticated = auth;
  const [state, setState] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setState(true);
    } else {
      setState(false);
    }
  }, [auth, path]);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        {state ? (
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        ) : (
          <Route
            path="/*"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
        )}
      </Routes>
    </>
  );
}

export default App;
