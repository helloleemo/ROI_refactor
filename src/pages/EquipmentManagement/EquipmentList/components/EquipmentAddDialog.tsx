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

import equipmentService from "@/api/services/equipment";
import type { EquipmentCategory, EquipmentField } from "@/api/types/equipment";
import TitleText from "@/components/TitleText";
import {
    getInitialSpecs,
    isFieldReadonly,
    isRequiredFieldEmpty,
    normalizeFieldValue,
} from "./FieldException";


interface EquipmentAddDialogProps {
    exceptionFields?: Record<string, unknown>;
    open: boolean;
    category?: EquipmentCategory;
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
    onClose,
    onSuccess,
    exceptionFields,
}: EquipmentAddDialogProps) => {

    // console.log("Open:", open);
    // console.log("Category:", category);
    // console.log("Exception Fields:", exceptionFields);



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
                    values[field.key] = normalizeFieldValue(field, specs[field.key]);
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

    const renderField = (field: EquipmentField) => {
        const fieldType = field.field_type.toLowerCase();
        const label = t(`equipment-list.fields${category?.equipment_type}.${field.key}`, {
            defaultValue: field.label,
        });

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

        return (
            <TextField
                key={field.key}
                fullWidth
                required
                label={label}
                type={["number", "integer", "float"].includes(fieldType) ? "number" : "text"}
                value={specs[field.key] ?? ""}
                onChange={(event) => handleSpecChange(field.key, event.target.value)}
                disabled={isReadOnly(field)}
            />
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