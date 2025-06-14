import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SettingsProvider } from './context/SettingsContext';
import { ToastProvider } from './context/ToastContext';
import AxiosToastProvider from './components/AxiosToastProvider';
import './i18n';
import './index.css';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <ToastProvider>
        <AxiosToastProvider />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </SettingsProvider>
  </React.StrictMode>
);
