
export const uiTextsKeys = {
    nested: (locale: string, category?: string) =>
        [locale, category] as const,
}

export const equipmentDataKeys = {
    unit: (unit_category: string) =>
        ["unit", unit_category] as const,
}

