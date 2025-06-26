import api from "./axios";

// СЕСІЇ
export const startSession = () => api.post("/session/start");
export const endSession = () => api.post("/session/end");
export const getSessionLog = () => api.get("/session/log");

// Музика
export const setMusic = (url) => api.post("/music", { url });

// Раси
export const createRace = (data) => api.post("/race", data);
export const getRaces = () => api.get("/race");
export const deleteRace = (id) => api.delete(`/race/${id}`);

// Карти
export const uploadMap = (data) => api.post("/map", data);

// Користувачі
export const getUsers = () => api.get('/admin/users');
export const updateUserRole = (id, role) =>
  api.put(`/admin/users/${id}/role`, { role });

// Appearance
export const getAppearance = () => api.get('/appearance');
export const updateAppearance = (data) => api.put('/appearance', data);
