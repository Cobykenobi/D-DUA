import api from "./axios";

// СЕСІЇ
export const startSession = () => api.post("/session/start");
export const endSession = () => api.post("/session/end");
export const getSessionLog = () => api.get("/session/log");

// Музика
export const setMusic = (url) => api.post("/music", { url });

// Раси
export const createRace = (data) => api.post("/races", data);
export const getRaces = () => api.get("/races");
export const deleteRace = (id) => api.delete(`/races/${id}`);

// Карти
export const uploadMap = (data) => api.post("/maps", data);
