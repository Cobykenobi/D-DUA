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

export const getCharacter = async (id) => {
  const res = await fetch(`${API_URL}/character/${id}`, {
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
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || res.statusText);
  }
  return res.json();
};

export const deleteCharacter = async (id) => {
  const res = await fetch(`${API_URL}/character/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const updateCharacter = async (id, data) => {
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
  const res = await fetch(`${API_URL}/character/${id}`, {
    method: 'PUT',
    headers,
    body,
  });
  return res.json();
};

export const getRaces = async () => {
  const res = await fetch(`${API_URL}/race`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

export const getProfessions = async () => {
  const res = await fetch(`${API_URL}/profession`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

export const getInventory = async (characterId) => {
  const res = await fetch(`${API_URL}/inventory/${characterId}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

export const updateInventory = async (characterId, items) => {
  const res = await fetch(`${API_URL}/inventory/${characterId}`, {
    method: 'PUT',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};
