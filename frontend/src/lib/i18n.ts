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

// Get saved language from localStorage or default to 'id'
const getSavedLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('app-language');
    if (saved && ['id', 'en', 'cn'].includes(saved)) {
      return saved;
    }
  }
  return 'id';
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(), // Use saved language or default
    fallbackLng: 'id',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Add language detection
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 