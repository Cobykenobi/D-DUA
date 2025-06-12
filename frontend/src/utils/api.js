const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getCharacters = async () => {
  const res = await fetch(`${API_URL}/character`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const createCharacter = async (data) => {
  const res = await fetch(`${API_URL}/character`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCharacter = async (id) => {
  const res = await fetch(`${API_URL}/character/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return res.json();
};
