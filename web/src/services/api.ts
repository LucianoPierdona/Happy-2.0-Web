import axios from "axios";

// connection with the api
const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;
