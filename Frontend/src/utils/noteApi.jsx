import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/note",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("Token:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(config.headers);

  return config;
});

// Create Note
export const createNote = async (data) => {
  const response = await api.post("/create", data);
  return response.data;
};


// Get All Notes
export const getAll = async () => {
  const response = await api.get("/get");
  return response.data;
};


// Update Note
export const updateNote = async (id, data) => {
  const response = await api.put(`/update/${id}`, data);
  return response.data;
};


// Delete Note
export const deleteNote = async (id) => {
  const response = await api.delete(`/delete/${id}`);
  return response.data;
};
