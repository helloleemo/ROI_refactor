
import type { EquipmentCategory, EquipmentField, EquipementResponse } from "@/api/types/equipment";

interface FieldExceptionProps {
    field: EquipmentField;
}

const isWetBulbTemperature = (field: EquipmentField) => field.key === "design_approach_temp";

const isFieldReadonly = (field: EquipmentField) => field.readonly || isWetBulbTemperature(field);

const getFieldExceptionValue = (field: EquipmentField, value?: unknown) =>
    isOtherDefualtField(field, value);

const getInitialSpecs = (
    category?: EquipmentCategory,
    equipment?: EquipementResponse | null,
    exceptionFields?: Record<string, unknown>,
) => {
    if (!category) return {};

    return category.fields.reduce<Record<string, unknown>>((specs, field) => {
        specs[field.key] =
            equipment?.specs[field.key] ??
            getFieldExceptionValue(field, exceptionFields?.[field.key]) ??
            category.default_specs[field.key] ??
            field.default ??
            "";
        return specs;
    }, {});
};

const normalizeFieldValue = (field: EquipmentField, value: unknown) => {
    const fieldType = field.field_type.toLowerCase();
    if (["number", "integer", "float"].includes(fieldType)) {
        return value === "" ? null : Number(value);
    }
    return value;
};

const isRequiredFieldEmpty = (field: EquipmentField, value: unknown) => {
    const fieldType = field.field_type.toLowerCase();
    if (fieldType === "boolean" || fieldType === "bool") return false;

    return value === null || value === undefined || String(value).trim() === "";
};

const FieldException = ({ field }: FieldExceptionProps) => {
    return isFieldReadonly(field) ? <span aria-label="不可編輯" /> : null;
};

const isOtherDefualtField = (field: EquipmentField, value?: unknown) => {
    return field.key === "design_approach_temp" ? value : undefined;
}

export {
    getInitialSpecs,
    isFieldReadonly,
    isRequiredFieldEmpty,
    isWetBulbTemperature,
    normalizeFieldValue,
};
export default FieldException;