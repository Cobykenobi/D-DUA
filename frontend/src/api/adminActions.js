import api from "./axios";

// СЕСІЇ
export const startSession = () => api.post("/api/session/start");
export const endSession = () => api.post("/api/session/end");
export const getSessionLog = () => api.get("/api/session/log");

// Музика
export const setMusic = (url) => api.post("/api/music", { url });

// Раси
export const createRace = (data) => api.post("/api/races", data);
export const getRaces = () => api.get("/api/races");
export const deleteRace = (id) => api.delete(`/api/races/${id}`);

// Карти
export const uploadMap = (data) => api.post("/api/maps", data);
