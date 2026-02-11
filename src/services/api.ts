import axios from "axios";

const API = axios.create({
  baseURL: "https://ekart-lqt2.onrender.com/api",
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
