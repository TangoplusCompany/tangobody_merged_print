import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ko from './locales/ko.json';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      en: { translation: en },
    },
    fallbackLng: 'ko', // 지원하지 않는 언어일 때 기본 언어
    interpolation: {
      escapeValue: false, // React 자체 XSS 방지 사용
    },
    detection: {
      order: ['navigator'], // 브라우저 언어 우선 감지
      caches: [], // 필요 시 로컬스토리지 캐시 제외
    },
  });

export default i18n;