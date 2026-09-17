// Central language registry for UI dropdowns and i18n configuration.
export const languages = [
    { label: "English", value: "en-US" },
    { label: "繁體中文", value: "zh-TW" },
    // { label: "简体中文", value: "zh-CN" },
    // { label: "ภาษาไทย", value: "th-TH" },
    // { label: "日本語", value: "ja-JP" },
    // { label: "Tiếng Việt", value: "vi-VN" },
] as const;

export type SupportedLanguage = (typeof languages)[number]["value"];

export const defaultLanguage: SupportedLanguage = "en-US";

export const supportedLanguages: SupportedLanguage[] = languages.map(
    (language) => language.value,
);

