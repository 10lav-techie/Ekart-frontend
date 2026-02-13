import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const seller = localStorage.getItem("seller");

  if (seller) {
    const parsed = JSON.parse(seller);
    req.headers.Authorization = `Bearer ${parsed.token}`;
  }

  return req;
});

export default API;
