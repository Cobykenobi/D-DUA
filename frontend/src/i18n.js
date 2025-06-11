import i18n from "i18next";
import ua from "./locales/ua.json";
import en from "./locales/en.json";

const resources = {;
  ua: { translation: ua },
  en: { translation: en },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lang") || "ua",
    fallbackLng: "ua",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;