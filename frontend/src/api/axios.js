import axios from "axios";

// Вказуємо базовий URL з environment змінної
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // якщо потрібна підтримка cookie
});

export default instance;
