import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en.json';
import idTranslations from './locales/id.json';
import cnTranslations from './locales/cn.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  id: {
    translation: idTranslations,
  },
  cn: {
    translation: cnTranslations,
  },
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id', // default language
    fallbackLng: 'id',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n; 