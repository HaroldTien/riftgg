import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // Load translations over http (e.g., from your server)
  .use(LanguageDetector) // Detect language from the browser
  .use(initReactI18next) // Initialize react-i18next
  .init({
    fallbackLng: 'en', // Fallback language
    detection: {
      order: ['htmlTag', 'cookie', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: (lng) => {
        // Custom logic to determine the path
        return `/locales/{{lng}}/{{ns}}.json`;
      }
    },
    
  });

export default i18n;