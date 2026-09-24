
import type { EquipmentCategory, EquipmentField, EquipementResponse } from "@/api/types/equipment";

interface FieldExceptionProps {
    field: EquipmentField;
}

const isWetBulbTemperature = (field: EquipmentField) => field.key === "design_approach_temp";

const isDataGridHiddenField = (field: EquipmentField) => field.key === "iplv_nplv_data" || field.key === "iplv_nplv_mode";

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

    if (field.key === "iplv_nplv_data") {
        if (!Array.isArray(value) || value.length === 0) return true;

        return value.some((row) => {
            if (!row || typeof row !== "object") return true;

            const data = row as {
                load_ratio?: unknown;
                cw_temp_in?: unknown;
                kw_per_rt?: unknown;
            };
            return [data.load_ratio, data.cw_temp_in, data.kw_per_rt].some(
                (item) => item === null || item === undefined || String(item).trim() === "",
            );
        });
    }

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
    isDataGridHiddenField,
    isRequiredFieldEmpty,
    isWetBulbTemperature,
    normalizeFieldValue,
};
export default FieldException;