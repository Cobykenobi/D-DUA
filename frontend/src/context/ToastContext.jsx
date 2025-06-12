
import React, { createContext, useState, useContext } from 'react';
 main

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`fixed bottom-6 right-6 p-3 rounded shadow-lg text-sm z-50
          ${toast.type === "success" ? "bg-green-600 text-white" : ""}
          ${toast.type === "error" ? "bg-red-600 text-white" : ""}
          ${toast.type === "info" ? "bg-blue-600 text-white" : ""}
        `}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);