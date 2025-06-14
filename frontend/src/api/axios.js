import axios from "axios";

// Holds ToastContext's showToast function. Call setAxiosToast(showToast) from a
// React component to enable toast notifications for API errors.
let showToast;

export function setAxiosToast(fn) {
  showToast = fn;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Automatically attach JWT from localStorage if present
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor uses ToastContext. Call setAxiosToast from a component
// with the showToast function to display API errors globally.
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (showToast) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          showToast("Авторизація потрібна", "error");
        } else if (status >= 500) {
          showToast("Серверна помилка", "error");
        }
      } else {
        showToast("Мережева помилка", "error");
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
