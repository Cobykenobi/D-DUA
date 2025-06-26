import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SettingsProvider } from './context/SettingsContext';
import { ToastProvider } from './context/ToastContext';
import { AppearanceProvider } from './context/AppearanceContext';
import AxiosToastProvider from './components/AxiosToastProvider';
import i18n from './i18n';

// Set Ukrainian as the default language on first load
if (!localStorage.getItem('lang')) {
  i18n.changeLanguage('ua');
}
import './index.css';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppearanceProvider>
      <SettingsProvider>
        <ToastProvider>
          <AxiosToastProvider />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToastProvider>
      </SettingsProvider>
    </AppearanceProvider>
  </React.StrictMode>
);
