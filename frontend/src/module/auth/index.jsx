import { Route, Routes } from "react-router";
import Signin from "../../components/Auth/Signin";
import Signup from "../../components/Auth/Signup";
import Forgot from "../../components/Auth/ForgotPassword";

const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<Forgot />} />
    </Routes>
  );
};

export default Auth;
