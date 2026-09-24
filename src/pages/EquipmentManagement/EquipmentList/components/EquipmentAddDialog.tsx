import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    MenuItem,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type EvalSetting from "@/api/types/evalSetting";
import equipmentService from "@/api/services/equipment";
import type { EquipmentCategory, EquipmentField } from "@/api/types/equipment";
import TitleText from "@/components/TitleText";
import IplvNplvDataField from "./IplvNplvDataField";
import {
    getInitialSpecs,
    isFieldReadonly,
    isRequiredFieldEmpty,
    normalizeFieldValue,
} from "./FieldException";
import { convertUnitValue, getTargetUnit } from "./UnitTransfer";

interface EquipmentAddDialogProps {
    exceptionFields?: Record<string, unknown>;
    open: boolean;
    category?: EquipmentCategory;
    units?: EvalSetting;
    onClose: () => void;
    onSuccess?: () => void | Promise<void>;
}

interface SelectOption {
    label?: string;
    value?: unknown;
}

const getOptionValue = (option: unknown) => {
    if (typeof option === "object" && option !== null && "value" in option) {
        return (option as SelectOption).value;
    }
    return option;
};

const getOptionLabel = (option: unknown) => {
    if (typeof option === "object" && option !== null) {
        const selectOption = option as SelectOption;
        return String(selectOption.label ?? selectOption.value ?? "");
    }
    return String(option);
};

const EquipmentAddDialog = ({
    open,
    category,
    units,
    onClose,
    onSuccess,
    exceptionFields,
}: EquipmentAddDialogProps) => {

    // console.log("Open:", open);
    // console.log("Category:", category);
    // console.log("Exception Fields:", exceptionFields);
    // console.log("Units:", units);


    const { t } = useTranslation();
    const [equipmentName, setEquipmentName] = useState("");
    const [remarks, setRemarks] = useState("");
    const [specs, setSpecs] = useState<Record<string, unknown>>({});
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const isReadOnly = (field: EquipmentField) => submitting || field.readonly || isFieldReadonly(field);

    useEffect(() => {
        if (open) {
            setEquipmentName("");
            setRemarks("");
            setSpecs(getInitialSpecs(category, null, exceptionFields));
            setErrorMessage("");
        }
    }, [open, category, exceptionFields]);

    const handleClose = () => {
        if (!submitting) onClose();
    };

    const handleSpecChange = (key: string, value: unknown) => {
        setSpecs((previous) => ({ ...previous, [key]: value }));
    };

    const handleSubmit = async () => {
        const hasMissingRequiredField = category?.fields.some((field) =>
            isRequiredFieldEmpty(field, specs[field.key]),
        );
        if (!category || !equipmentName.trim() || hasMissingRequiredField || submitting) return;

        try {
            setSubmitting(true);
            setErrorMessage("");
            await equipmentService.create({
                equipment_type: category.equipment_type,
                equipment_name: equipmentName.trim(),
                remarks: remarks.trim(),
                specs: category.fields.reduce<Record<string, unknown>>((values, field) => {
                    const normalizedValue = normalizeFieldValue(field, specs[field.key]);
                    const fieldUnits = getFieldUnits(field);
                    const selectedUnit = String(
                        specs[`${field.key}_unit`] ?? fieldUnits?.[0] ?? "",
                    );
                    values[field.key] = convertUnitValue({
                        originalUnit: selectedUnit,
                        unitCategory: field.unit,
                        value: typeof normalizedValue === "number" ? normalizedValue : null,
                    }) ?? normalizedValue;
                    return values;
                }, {}),
            });
            await onSuccess?.();
            onClose();
            // console.log(`Category: ${JSON.stringify(category)} Equipment Name: ${equipmentName} Remarks: ${remarks} Specs: ${JSON.stringify(specs)}`);
        } catch (error: any) {
            setErrorMessage(t("equipment-list.add-dialog.error", {
                defaultValue: `新增失敗：${error?.message ?? "請稍後再試"}`,
                message: error?.message ?? t("equipment-list.add-dialog.try-again"),
            }));
        } finally {
            setSubmitting(false);
        }
    };

    const getFieldUnits = (field: EquipmentField) => {
        if (!units?.available_units || !field.unit) return null;

        const unitKey = field.unit.endsWith("_units")
            ? field.unit
            : field.unit.endsWith("_unit")
                ? `${field.unit}s`
                : `${field.unit}_units`;

        return units.available_units[
            unitKey as keyof EvalSetting["available_units"]
        ] ?? null;
    };

    // Render fileds
    const renderField = (field: EquipmentField) => {
        const fieldUnits = getFieldUnits(field);
        const fieldType = field.field_type.toLowerCase();
        const label = t(`equipment-list.fields${category?.equipment_type}.${field.key}`, {
            defaultValue: field.label,
        });
        const unitSpecKey = `${field.key}_unit`;
        const selectedUnit = String(specs[unitSpecKey] ?? fieldUnits?.[0] ?? "");
        const targetUnit = getTargetUnit(field.unit);
        const numericValue = Number(specs[field.key]);
        const convertedValue = convertUnitValue({
            originalUnit: selectedUnit,
            unitCategory: field.unit,
            value: Number.isFinite(numericValue) ? numericValue : null,
        });



        if (fieldType === "boolean" || fieldType === "bool") {
            return (
                <FormControlLabel
                    key={field.key}
                    control={
                        <Switch
                            // key={field.key}
                            checked={Boolean(specs[field.key])}
                            onChange={(event) => handleSpecChange(field.key, event.target.checked)}
                            disabled={isReadOnly(field)}
                        />
                    }
                    label={label}
                />
            );
        }

        if (field.options?.length) {
            return (
                <TextField
                    key={field.key}
                    select
                    fullWidth
                    required
                    label={label}
                    value={specs[field.key] ?? ""}
                    onChange={(event) => handleSpecChange(field.key, event.target.value)}
                    disabled={isReadOnly(field)}
                >
                    {field.options.map((option) => {
                        const value = getOptionValue(option);
                        return (
                            <MenuItem key={String(value)} value={String(value)}>
                                {getOptionLabel(option)}
                            </MenuItem>
                        );
                    })}
                </TextField>
            );
        }

        if (field.field_type.toLowerCase() === "list" && field.key === "iplv_nplv_data") {
            return (
                <IplvNplvDataField
                    key={field.key}
                    value={specs[field.key]}
                    mode={specs.iplv_nplv_mode}
                    disabled={isReadOnly(field)}
                    onChange={(value) => handleSpecChange(field.key, value)}
                />
            );
        }

        return (
            <Box
                key={field.key}
                sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: "3fr 1fr 1fr",
                }}>
                <TextField
                    key={field.key}
                    fullWidth
                    required
                    label={`${label}`}
                    type={["number", "integer", "float"].includes(fieldType) ? "number" : "text"}
                    value={specs[field.key] ?? ""}
                    onChange={(event) => handleSpecChange(field.key, event.target.value)}
                    disabled={isReadOnly(field)}
                    sx={{
                        gridColumn: fieldUnits ? "span 1" : "1 / -1",
                    }}
                />
                {fieldUnits && <TextField
                    key={`${field.key}-extra`}
                    fullWidth
                    required
                    select
                    label={`單位`}
                    value={selectedUnit}
                    onChange={(event) => handleSpecChange(unitSpecKey, event.target.value)}
                    disabled={isReadOnly(field)}
                >
                    {fieldUnits.map((option) => (
                        <MenuItem key={String(option)} value={String(option)}>
                            {String(option)}
                        </MenuItem>
                    ))}
                </TextField>}

                {/* 計算轉換後顯示 */}
                {
                    fieldUnits && (
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                儲存值
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {targetUnit && Number.isFinite(numericValue)
                                    ? `${convertedValue ?? numericValue} ${targetUnit}`
                                    : ""}
                            </Typography>
                            {/* <TextField
                                key={`${field.key}-converted`}
                                fullWidth
                                required
                                label={`${label}`}
                                type="number"
                                value={convertedValue ?? specs[field.key] ?? ""}
                                disabled={true}
                            /> */}
                        </Box>)
                }
            </Box>
        );
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TitleText title={t("equipment-list.add-dialog.title")} />
                <IconButton onClick={handleClose} disabled={submitting} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
                    <TextField
                        fullWidth
                        required
                        label={t("equipment-list.add-dialog.name")}
                        value={equipmentName}
                        onChange={(event) => setEquipmentName(event.target.value)}
                        disabled={submitting}
                        slotProps={{ htmlInput: { maxLength: 100 } }}
                    />
                    {category?.fields.map(renderField)}
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        label={t("equipment-list.add-dialog.remarks")}
                        value={remarks}
                        onChange={(event) => setRemarks(event.target.value)}
                        disabled={submitting}
                        slotProps={{ htmlInput: { maxLength: 500 } }}
                    />
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleClose} disabled={submitting}>
                    {t("equipment-list.add-dialog.cancel")}
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                        submitting ||
                        !category ||
                        !equipmentName.trim() ||
                        category.fields.some((field) => isRequiredFieldEmpty(field, specs[field.key]))
                    }
                >
                    {submitting
                        ? t("equipment-list.add-dialog.submitting")
                        : t("equipment-list.add-dialog.submit")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EquipmentAddDialog;