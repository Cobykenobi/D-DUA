const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  return headers;
};

export const getCharacters = async () => {
  const res = await fetch(`${API_URL}/character`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

export const createCharacter = async (data) => {
  const headers = getAuthHeaders();
  let body;
  if (data.image instanceof File) {
    body = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) body.append(key, data[key]);
    });
  } else {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(data);
  }
  const res = await fetch(`${API_URL}/character`, {
    method: 'POST',
    headers,
    body,
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
