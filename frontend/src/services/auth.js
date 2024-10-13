import axios from "../api/axios";
// The service handles the details of interacting with the backend API (including error responses).
export const signInUser = async (credentials) => {
  try {
    const response = await axios.post("/login", credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Login failed");
    }
    throw new Error("Network error. Please try again later.");
  }
};

export const signUpUser = async (userData) => {
  try {
    const response = await axios.post("/signup", userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Signup failed");
    }
    throw new Error("Network error. Please try again later.");
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.get("/logout");
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Logout failed");
    }
    throw new Error("Network error. Please try again later.");
  }
};

export const updatePwd = async (payload) => {
  try {
    const res = await axios.patch("/update/password", payload);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Password update failed");
    }
    throw new Error("Network Error. Please try again later.");
  }
};
