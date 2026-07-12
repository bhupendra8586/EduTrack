import axios from "axios";

const API = axios.create({
  baseURL: "https://edutrack-backend-vb35.onrender.com/",
  withCredentials: true
});

export default API;