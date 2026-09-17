import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { defaultLanguage, supportedLanguages } from './languages';

const LANGUAGE_STORAGE_KEY = 'language';

const supportedLanguageSet = new Set<string>(supportedLanguages);

export function normalizeLanguage(locale?: string | null) {
    if (!locale) return defaultLanguage;
    return supportedLanguageSet.has(locale) ? locale : defaultLanguage;
}

export function getStoredLanguage() {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return normalizeLanguage(stored);
}

i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: getStoredLanguage(),
        fallbackLng: defaultLanguage,
        supportedLngs: supportedLanguages,

        // namespace
        // ns: ["sidebar", "basicSettings"],
        // defaultNS: "sidebar",

        backend: {
            loadPath: "/locales/{{lng}}.json",
        },

        interpolation: {
            escapeValue: false,
        },
        debug: false,
        react: {
            useSuspense: false,
        },
    });

export default i18n;
