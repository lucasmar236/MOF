import axios from "axios";

// const API_URL = "http://54.233.165.115:8080/api/v1"
const API_URL = "http://localhost:8080/api/v1";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  let authUser = localStorage.getItem("auth");
  if (authUser !== null) {
    config.headers.Authorization = "Bearer " + authUser;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      return Promise.reject(error.response.data.error);
    } catch {
      return Promise.reject("Erro ao conectar");
    }
  }
);

export default api;
