import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CharactersPage() {
  const navigate = useNavigate();
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/characters")
      .then(res => setChars(res.data))
      .finally(() => setLoading(false));
  }, []);

  // ... (JSX як у тебе)
}
