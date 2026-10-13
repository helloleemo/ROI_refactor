import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
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
import type { EquipmentCategory, EquipmentField, EquipementResponse } from "@/api/types/equipment";
import TitleText from "@/components/TitleText";
import IplvNplvDataField from "./IplvNplvDataField";
import {
    getInitialSpecs,
    isFieldReadonly,
    isRequiredFieldEmpty,
    normalizeFieldValue,
} from "./FieldException";
import { convertUnitValue, getTargetUnit } from "./UnitTransfer";
import toasterWording from "@/settings/toasterWording";
import { showToast } from "@/components/ToasterCustom";
import { calculateChwFlowLpm, calculateCop, calculateCwFlowLpm, calculateEfficiency, calculateMotorPower } from "../helpers/calculations";
import { validateEquipmentField } from "../helpers/validations";


interface EquipmentEditDialogProps {
    open: boolean;
    equipment: EquipementResponse | null;
    category?: EquipmentCategory;
    units?: EvalSetting;
    onClose: () => void;
    onSuccess?: () => void | Promise<void>;
    exceptionFields?: Record<string, unknown>;
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

const EquipmentEditDialog = ({
    open,
    equipment,
    category,
    units,
    onClose,
    onSuccess,
    exceptionFields,
}: EquipmentEditDialogProps) => {
    const { t } = useTranslation();
    const [equipmentName, setEquipmentName] = useState("");
    const [remarks, setRemarks] = useState("");
    const [specs, setSpecs] = useState<Record<string, unknown>>({});
    const [submitting, setSubmitting] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!open) return;

        setEquipmentName(equipment?.equipment_name ?? "");
        setRemarks(equipment?.remarks ?? "");
        setSpecs(getInitialSpecs(category, equipment));
        // setErrorMessage("");

        const initialSpecs = getInitialSpecs(category, null, exceptionFields);
        initialSpecs.cw_flow_lpm = calculateCwFlowLpm(
            initialSpecs.heat_rejection_kw,
            initialSpecs.cw_temp_in,
            initialSpecs.cw_temp_out,
        );
        initialSpecs.efficiency_kw_per_rt = calculateEfficiency(
            initialSpecs.rated_power_kw,
            initialSpecs.cooling_capacity_rt,
        );
        initialSpecs.cop = calculateCop(initialSpecs.efficiency_kw_per_rt);
        initialSpecs.motor_power_kw = calculateMotorPower(
            initialSpecs.motor_count,
            initialSpecs.heat_rejection_kw,
        );
        // setSpecs(initialSpecs);



    }, [open, equipment, category]);

    const isReadOnly = (field: EquipmentField) =>
        submitting || (field.key !== "chw_flow_lpm" && (field.readonly || isFieldReadonly(field)));

    const handleClose = () => {
        if (!submitting) onClose();
    };

    const handleSpecChange = (key: string, value: unknown) => {
        setSpecs((previous) => {
            const next = { ...previous, [key]: value };

            if (["rated_power_kw", "chw_temp_in", "chw_temp_out"].includes(key)) {
                next.chw_flow_lpm = calculateChwFlowLpm(
                    next.rated_power_kw,
                    next.chw_temp_in,
                    next.chw_temp_out,
                );
            }

            if (["heat_rejection_kw", "cw_temp_in", "cw_temp_out"].includes(key)) {
                next.cw_flow_lpm = calculateCwFlowLpm(
                    next.heat_rejection_kw,
                    next.cw_temp_in,
                    next.cw_temp_out,
                );
            }

            if (["rated_power_kw", "cooling_capacity_rt"].includes(key)) {
                next.efficiency_kw_per_rt = calculateEfficiency(
                    next.rated_power_kw,
                    next.cooling_capacity_rt,
                );
            }

            if (["rated_power_kw", "cooling_capacity_rt", "efficiency_kw_per_rt"].includes(key)) {
                next.cop = calculateCop(next.efficiency_kw_per_rt);
            }


            if (["rated_power_kw", "cooling_capacity_rt", "efficiency_kw_per_rt"].includes(key)) {
                next.cop = calculateCop(next.efficiency_kw_per_rt);
            }

            if (["motor_count", "heat_rejection_kw"].includes(key)) {
                next.motor_power_kw = calculateMotorPower(
                    next.motor_count,
                    next.heat_rejection_kw,
                );
            }

            return next;
        });
    };

    const handleSubmit = async () => {
        const hasMissingRequiredField = category?.fields.some((field) =>
            isRequiredFieldEmpty(field, specs[field.key], specs.iplv_nplv_mode),
        );
        if (!equipment || !category || !equipmentName.trim() || hasMissingRequiredField || submitting) return;

        try {
            setSubmitting(true);
            // setErrorMessage("");
            await equipmentService.update({
                id: equipment.id,
                equipment_name: equipmentName.trim(),
                remarks: remarks.trim(),
                specs: category.fields.reduce<Record<string, unknown>>((values, field) => {
                    const normalizedValue = normalizeFieldValue(field, specs[field.key]);
                    if (field.key === "iplv_nplv_mode" && normalizedValue === null) return values;

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
            showToast(t(toasterWording.success.equipment_edit), "success");
            onClose();
        } catch (error: any) {
            // setErrorMessage(t("equipment-list.edit-dialog.error", {
            //     message: error?.message ?? t("equipment-list.add-dialog.try-again"),
            // }));
            showToast(t(toasterWording.error.equipment_edit), "error");
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

        const fieldValidation = validateEquipmentField(field.key, specs[field.key]);


        if (field.key === "iplv_nplv_mode" && field.options?.length) {
            const modeValue = specs[field.key];
            const selectedModes: string[] = Array.isArray(modeValue)
                ? modeValue.map(String)
                : modeValue
                    ? [String(modeValue)]
                    : [];

            return (
                <FormControl key={field.key} component="fieldset" disabled={isReadOnly(field)}>
                    <FormLabel component="legend">{label}</FormLabel>
                    <FormGroup row>
                        {field.options.map((option) => {
                            const value = String(getOptionValue(option));
                            return (
                                <FormControlLabel
                                    key={value}
                                    label={getOptionLabel(option)}
                                    control={
                                        <Checkbox
                                            checked={selectedModes.includes(value)}
                                            onChange={(event) => {
                                                const nextModes = event.target.checked
                                                    ? [...selectedModes, value]
                                                    : selectedModes.filter((mode) => mode !== value);
                                                handleSpecChange(field.key, nextModes);
                                            }}
                                        />
                                    }
                                />
                            );
                        })}
                    </FormGroup>
                </FormControl>
            );
        }

        if (fieldType === "boolean" || fieldType === "bool") {
            return (
                <FormControlLabel
                    key={field.key}
                    control={
                        <Switch
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
                    fullWidth
                    required
                    label={label}
                    type={["number", "integer", "float"].includes(fieldType) ? "number" : "text"}
                    value={specs[field.key] ?? ""}
                    onChange={(event) => handleSpecChange(field.key, event.target.value)}
                    disabled={isReadOnly(field)}
                    helperText={fieldValidation ? t(fieldValidation.messageKey) : undefined}
                    slotProps={{
                        formHelperText: {
                            error: Boolean(fieldValidation),
                        },
                    }}
                    sx={{
                        gridColumn: fieldUnits ? "span 1" : "1 / -1",
                    }}
                />
                {fieldUnits && <TextField
                    fullWidth
                    required
                    select
                    label={t("equipment-list.unit")}
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
                {fieldUnits && (
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            {t("equipment-list.stored-value")}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {targetUnit && Number.isFinite(numericValue)
                                ? `${Number(convertedValue ?? numericValue).toFixed(1)} ${targetUnit}`
                                : ""}
                        </Typography>
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TitleText title={t("equipment-list.edit-dialog.title")} />
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
                    {/* {errorMessage && <Typography color="error">{errorMessage}</Typography>} */}
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
                        !equipment ||
                        !category ||
                        !equipmentName.trim() ||
                        category.fields.some((field) =>
                            isRequiredFieldEmpty(field, specs[field.key], specs.iplv_nplv_mode),
                        )
                    }
                    startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : undefined}
                >
                    {t("common.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EquipmentEditDialog;
