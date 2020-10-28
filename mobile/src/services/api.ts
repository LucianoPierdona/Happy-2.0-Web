import axios from "axios";

// connection with the api
const api = axios.create({
  baseURL: "http://192.168.0.102:3333",
});

export default api;
