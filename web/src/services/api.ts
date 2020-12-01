import axios from "axios";

// connection with the api
const api = axios.create({
  baseURL: "https://happy-two-point-zero-backend.herokuapp.com/",
});

export default api;
