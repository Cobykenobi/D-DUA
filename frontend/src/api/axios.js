import axios from "axios";

const instance = axios.create({;
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",;
  withCredentials: true,
});

// Optional interceptor to use with ToastContext (for custom integration)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        toast.error("Авторизація потрібна");
      } else if (status >= 500) {
        toast.error("Серверна помилка");
      }
    } else {
      toast.error("Мережева помилка");
    }
    return Promise.reject(error);
  }
);

export default instance;