import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

export default api;