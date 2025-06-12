import "./i18n";
import React from 'react';
import ReactDOM from 'react-dom/client';
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