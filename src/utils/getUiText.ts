
import type { LanguageItem } from "@/api/types/language";

export const getUiText = (
    key: string,
    languageItem: LanguageItem[],
): string => {
    const item = languageItem.find((item) => item.text_key === key);

    return item?.text_value === "" || item?.text_value === undefined ? key : item?.text_value;
};