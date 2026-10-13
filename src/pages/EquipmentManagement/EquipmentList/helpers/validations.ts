// helpers/fieldValidation.ts
export type FieldValidation = {
    messageKey: string;
} | null;

export const validateEquipmentField = (
    fieldKey: string,
    value: unknown,
): FieldValidation => {
    if (fieldKey === "cop") {
        if (value === "" || value === null || value === undefined) return null;

        const cop = Number(value);
        if (!Number.isFinite(cop)) return null;

        if (cop < 0.4 || cop > 0.85) {
            return {
                messageKey: "equipment-list.helper.cop-range",
            };
        }
    }

    return null;
};