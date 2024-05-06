import axios, { AxiosInstance } from "axios";

let api: AxiosInstance;

const token = localStorage.getItem("@todo-izi:token");

if (token) {
  api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
} else {
  api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
  });
}

export default api;
