import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7236/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request：自動帶 JWT（用 localStorage）
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ✅ 改這裡
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response：處理登入失效（401）
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // ✅ key 統一：token
      localStorage.removeItem("token");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("userName");
    }
    return Promise.reject(error);
  }
);

export default api;
