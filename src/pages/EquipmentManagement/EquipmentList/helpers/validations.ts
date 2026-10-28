// helpers/fieldValidation.ts
export type FieldValidation = {
    messageKey: string;
} | null;

export const validateEquipmentField = (
    fieldKey: string,
    value: unknown,
): FieldValidation => {
    if (fieldKey === "efficiency_kw_per_rt") {
        if (value === "" || value === null || value === undefined) return null;

        const efficiency = Number(value);
        if (!Number.isFinite(efficiency)) return null;

        if (efficiency < 0.4 || efficiency > 0.85) {
            return {
                messageKey: "equipment-list.helper.efficiency_kw_per_rt-range",
            };
        }
    }

    return null;
};