import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7878",
  withCredentials: true
});

export default API;