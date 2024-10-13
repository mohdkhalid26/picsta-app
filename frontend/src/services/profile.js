import axios from "../api/axios";

export async function uploadUserProfileImage(payload) {
  try {
    const response = await axios.post("/profile/uploadImage", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);

    if (error.response) {
      throw new Error(error.response.data.error || "Image upload failed");
    }
    throw new Error("Network Error. Please try again later.");
  }
}

export async function updateUserProfileImage(payload) {
  try {
    const response = await axios.patch("/profile/updateImage", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);

    if (error.response) {
      throw new Error(error.response.data.error || "Image update failed");
    }
    throw new Error("Network Error. Please try again later.");
  }
}

export async function getSpecificUser() {
  try {
    const res = await axios.get("/profile");
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Password update failed");
    }
    throw new Error("Network Error. Please try again later.");
  }
}

export async function updateSpecificUser() {
  try {
    const res = axios.patch("/edit/user");
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Password update failed");
    }
    throw new Error("Network Error. Please try again later.");
  }
}
