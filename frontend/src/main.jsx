import "./i18n";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from './context/ToastContext';
import { SettingsProvider } from './context/SettingsContext';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
    <ToastProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
          </ToastProvider>
  </SettingsProvider>
  </React.StrictMode>
);