
import type { EquipmentCategory, EquipmentField, EquipementResponse } from "@/api/types/equipment";

interface FieldExceptionProps {
    field: EquipmentField;
}

const isWetBulbTemperature = (field: EquipmentField) => field.key === "design_approach_temp";

const isDataGridHiddenField = (field: EquipmentField) => field.key === "iplv_nplv_data" || field.key === "iplv_nplv_mode";

const isFieldReadonly = (field: EquipmentField) =>
    field.key === "motor_power_kw" || field.readonly || isWetBulbTemperature(field);


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
    if (field.key === "iplv_nplv_mode") {
        if (Array.isArray(value)) return value.length > 0 ? value : null;
        return value === null || value === undefined || String(value).trim() === ""
            ? null
            : [String(value)];
    }

    const fieldType = field.field_type.toLowerCase();
    if (["number", "integer", "float"].includes(fieldType)) {
        return value === "" ? null : Number(value);
    }
    return value;
};

const isRequiredFieldEmpty = (field: EquipmentField, value: unknown, mode?: unknown) => {
    const fieldType = field.field_type.toLowerCase();
    if (fieldType === "boolean" || fieldType === "bool") return false;
    if (field.key === "iplv_nplv_mode") return false;

    if (field.key === "iplv_nplv_data") {
        const selectedModes = Array.isArray(mode)
            ? mode.map(String).map((item) => item.toUpperCase())
            : mode
                ? [String(mode).toUpperCase()]
                : [];
        if (selectedModes.length === 0) return false;
        if (!Array.isArray(value) || value.length === 0) return true;

        return value.some((row) => {
            if (!row || typeof row !== "object") return true;

            const data = row as {
                load_ratio?: unknown;
                cw_temp_in?: unknown;
                kw_per_rt?: unknown;
            };
            const requiredValues = [data.load_ratio, data.kw_per_rt];
            if (selectedModes.includes("NPLV")) requiredValues.push(data.cw_temp_in);
            return requiredValues.some(
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
    getFieldExceptionValue,
};
export default FieldException;