

// СЕСІЇ
export const startSession = () => api.post("/api/session/start");
export const endSession = () => api.post("/api/session/end");
export const getSessionLog = () => api.get("/api/session/log");
