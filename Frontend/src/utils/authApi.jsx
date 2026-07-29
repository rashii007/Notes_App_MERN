import axios from "axios";

export const api = axios.create({
  baseURL: "https://notes-app-mern-sv03.onrender.com/api/auth",
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = async (registerData) => {
  try {
    const response = await api.post("/register", registerData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);

    throw (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/login", loginData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);

    throw (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

export const logoutUser = async () => {
  const response = await api.post("/logout");

  localStorage.removeItem("token");

  return response.data;
};
