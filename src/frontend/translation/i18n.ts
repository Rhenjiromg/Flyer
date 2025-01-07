import i18n from "i18next";
import en from "./locales/en.json";

const resources = {
  en: {
    translation: en,
  },
};

i18n.init({
  resources,
  lng: "en",
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export { i18n };
