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
 main
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