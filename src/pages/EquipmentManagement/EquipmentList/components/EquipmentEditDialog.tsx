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
import type { EquipmentCategory, EquipmentField, EquipementResponse } from "@/api/types/equipment";
import TitleText from "@/components/TitleText";
import {
    getInitialSpecs,
    isFieldReadonly,
    isRequiredFieldEmpty,
    normalizeFieldValue,
} from "./FieldException";

interface EquipmentEditDialogProps {
    open: boolean;
    equipment: EquipementResponse | null;
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

const EquipmentEditDialog = ({
    open,
    equipment,
    category,
    onClose,
    onSuccess,
}: EquipmentEditDialogProps) => {
    const { t } = useTranslation();
    const [equipmentName, setEquipmentName] = useState("");
    const [remarks, setRemarks] = useState("");
    const [specs, setSpecs] = useState<Record<string, unknown>>({});
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!open) return;

        setEquipmentName(equipment?.equipment_name ?? "");
        setRemarks(equipment?.remarks ?? "");
        setSpecs(getInitialSpecs(category, equipment));
        setErrorMessage("");
    }, [open, equipment, category]);

    const isReadOnly = (field: EquipmentField) => submitting || field.readonly || isFieldReadonly(field);

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
        if (!equipment || !category || !equipmentName.trim() || hasMissingRequiredField || submitting) return;

        try {
            setSubmitting(true);
            setErrorMessage("");
            await equipmentService.update({
                id: equipment.id,
                equipment_name: equipmentName.trim(),
                remarks: remarks.trim(),
                specs: category.fields.reduce<Record<string, unknown>>((values, field) => {
                    values[field.key] = normalizeFieldValue(field, specs[field.key]);
                    return values;
                }, {}),
            });
            await onSuccess?.();
            onClose();
        } catch (error: any) {
            setErrorMessage(`更新失敗：${error?.message ?? "請稍後再試"}`);
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
                <TitleText title="編輯設備" />
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
                        !equipment ||
                        !category ||
                        !equipmentName.trim() ||
                        category.fields.some((field) => isRequiredFieldEmpty(field, specs[field.key]))
                    }
                >
                    {submitting ? "更新中..." : "儲存"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EquipmentEditDialog;
