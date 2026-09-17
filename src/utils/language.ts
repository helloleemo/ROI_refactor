import type { LanguageItem } from "@/api/types/language";

export type LanguageTableRow = {
    id: string;
    category: string;
    text_key: string;
    translations: Record<string, LanguageItem>;
};

export const groupLanguageItems = (items: LanguageItem[]): LanguageTableRow[] => {
    const grouped = items.reduce<Record<string, LanguageTableRow>>((result, item) => {
        const groupKey = `${item.category}:${item.text_key}`;
        const current = result[groupKey];

        if (current) {
            current.translations[item.locale] = item;
            return result;
        }

        result[groupKey] = {
            id: groupKey,
            category: item.category,
            text_key: item.text_key,
            translations: {
                [item.locale]: item,
            },
        };

        return result;
    }, {});

    return Object.values(grouped);
};
