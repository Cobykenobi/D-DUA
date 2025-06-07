import React, { useState } from "react";
import axios from "axios";
import { useUserStore } from "../store/user";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { login, password }
      );
      // Автоматично логінитись після реєстрації:
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { login, password }
      );
      setUser(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Login"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
