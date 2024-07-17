import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en_gb, de_de_m, de_de_x } from './translations';

/*
 * Debugging instructions:
 * Detecting the selected language receive from react-native-localization-settings
 * import { ReactNativeLanguageDetector, getLanguage } from 'react-native-localization-settings';
 * console.log(getLanguage());
 *
 * References:
 * 1. https://www.i18next.com/
 * 2. https://github.com/jakex7/react-native-localization-settings
 */

const resources = {
  en_gb: {
    translation: en_gb,
  },
  de_de_m: {
    translation: de_de_m,
  },
  de_de_x: {
    translation: de_de_x,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'de_de_x',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
