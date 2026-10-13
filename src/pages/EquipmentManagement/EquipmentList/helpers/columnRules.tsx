import type { EquipmentField } from "@/api/types/equipment";
import { BooleanChip } from "@/components";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import type { TFunction } from "i18next";
import { formatOneDecimal } from "./formatDecimal";

export const oneDecimalFieldKeys = new Set([
    // CH (1)
    "chw_temp_out",
    "chw_temp_in",
    "cw_temp_in",
    "cw_temp_out",
    "efficiency_kw_per_rt",
    "cop",
    "heat_rejection_kw",
    "chw_flow_lpm",
    "cw_flow_lpm",
    "motor_power_kw",

    // CHP / ZP / CWP (2, 3, 4)
    "rated_power_kw",
    "rated_flow_lpm",
    "head_m",

    // CT (5)
    "fan_power_kw",
    "design_temp_in",
    "design_temp_out",
    "design_approach_temp",
    "design_wet_bulb_temp",
]);

export interface ColumnContext {
    t: TFunction;
    selectedCategory: string;
}

export interface ColumnRule {
    name: string;
    match: (field: EquipmentField) => boolean;
    getColDef: (field: EquipmentField, context: ColumnContext) => Partial<GridColDef>;
}

export const columnRules: ColumnRule[] = [
    {
        name: "boolean",
        match: (field) => {
            const fieldType = field.field_type.toLowerCase();
            return fieldType === "boolean" || fieldType === "bool";
        },
        getColDef: () => ({
            renderCell: (params: GridRenderCellParams) => <BooleanChip value={Boolean(params.value)} />,
        }),
    },
    {
        name: "oneDecimal",
        match: (field) => oneDecimalFieldKeys.has(field.key),
        getColDef: () => ({
            renderCell: (params: GridRenderCellParams) => formatOneDecimal(params.value),
        }),
    },
    {
        name: "compressorType",
        match: (field) => field.key === "compressor_type",
        getColDef: (_field, { t, selectedCategory }) => ({
            renderCell: (params: GridRenderCellParams) => {
                const val = String(params.value ?? "");
                return val
                    ? t(`equipment-list.fields${selectedCategory}.compressor_type_options.${val}`, { defaultValue: val })
                    : "-";
            },
        }),
    },
];

export const resolveColumnDef = (field: EquipmentField, context: ColumnContext): GridColDef => {
    const matchedRule = columnRules.find((rule) => rule.match(field));
    const customColDef = matchedRule ? matchedRule.getColDef(field, context) : {};

    return {
        field: field.key,
        headerName: context.t(`equipment-list.fields${context.selectedCategory}.${field.key}`),
        width: 150,
        ...customColDef,
    };
};
