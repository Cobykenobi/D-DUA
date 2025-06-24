import api from '../api/axios';

export const getCharacters = async () => {
  const res = await api.get('/character');
  return res.data;
};

export const getCharacter = async (id) => {
  const res = await api.get(`/character/${id}`);
  return res.data;
};

export const createCharacter = async (data) => {
  let payload = data;
  if (data.image instanceof File) {
    payload = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) payload.append(key, data[key]);
    });
  }
  const res = await api.post('/character', payload);
  return res.data;
};

export const deleteCharacter = async (id) => {
  const res = await api.delete(`/character/${id}`);
  return res.data;
};

export const updateCharacter = async (id, data) => {
  let payload = data;
  if (data.image instanceof File) {
    payload = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) payload.append(key, data[key]);
    });
  }
  const res = await api.put(`/character/${id}`, payload);
  return res.data;
};

export const getRaces = async () => {
  const res = await api.get('/race');
  return res.data;
};

export const getProfessions = async () => {
  const res = await api.get('/profession');
  return res.data;
};
