import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { tagMappingService } from "@/api/services/tagMapping";
import type { CommonIdType } from "@/api/types/shared";
import { UnitFlowOptions, UnitTempOptions, UnitPressureOptions } from "@/api/types/tagMapping";
import type { DataSettingsType, TagMapping } from "@/api/types/tagMapping";
import TitleText from "@/components/TitleText";
import { showToast } from "@/components/ToasterCustom";
interface PhysicalUnitAndSystemBoundarySettingDialogProps {
    open: boolean;
    onClose: () => void;
    uploadId?: CommonIdType;
    dataSettings?: DataSettingsType;
    onSaved: (savedData: TagMapping) => void;
}

type DataSettingsDraft = Omit<DataSettingsType, "data_interval" | "sys_design_rt" | "sys_design_kw"> & {
    data_interval: string;
    sys_design_rt: string;
    sys_design_kw: string;
};

const toDraft = (settings?: DataSettingsType): DataSettingsDraft => ({
    unit_flow: settings?.unit_flow ?? "LPM",
    unit_temp: settings?.unit_temp ?? "°C",
    unit_pressure: settings?.unit_pressure ?? "kg/cm2",
    data_interval: settings ? String(settings.data_interval) : "15",
    sys_design_rt: settings ? settings.sys_design_rt.toFixed(2) : "0.00",
    sys_design_kw: settings ? settings.sys_design_kw.toFixed(2) : "0.00",
});

const PhysicalUnitAndSystemBoundarySettingDialog = ({
    open,
    onClose,
    uploadId,
    dataSettings,
    onSaved,
}: PhysicalUnitAndSystemBoundarySettingDialogProps) => {
    const { t } = useTranslation();
    const [form, setForm] = useState<DataSettingsDraft>(() => toDraft(dataSettings));
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    console.log("dataSettings", dataSettings)

    useEffect(() => {
        if (open) {
            setForm(toDraft(dataSettings));
            setErrorMessage("");
        }
    }, [open, dataSettings]);

    const handleClose = () => {
        if (!isSaving) onClose();
    };

    const updateField = (field: keyof DataSettingsDraft, value: string) => {
        setForm((previous) => ({ ...previous, [field]: value }));
        setErrorMessage("");
    };

    const handleSave = async () => {
        if (uploadId === undefined || isSaving) return;

        const dataInterval = Number(form.data_interval);
        const designRt = Number(Number(form.sys_design_rt).toFixed(2));
        const designKw = Number((Number(form.sys_design_kw)).toFixed(2))
        if (![dataInterval, designRt, designKw].every((value) => Number.isFinite(value) && value > 0)) {
            setErrorMessage(t("dataCleaning.settings.validation_error"));
            return;
        }

        try {
            setIsSaving(true);
            setErrorMessage("");
            const savedData = await tagMappingService.update({
                upload_id: uploadId,
                data_settings: {
                    unit_flow: form.unit_flow,
                    unit_temp: form.unit_temp,
                    unit_pressure: form.unit_pressure,
                    data_interval: dataInterval,
                    sys_design_rt: designRt,
                    sys_design_kw: designKw,
                },
            });
            onSaved(savedData);
            showToast(t("dataCleaning.settings.saved"), "success");
            onClose();
        } catch {
            setErrorMessage(t("dataCleaning.settings.save_error"));
        } finally {
            setIsSaving(false);
        }
    };

    const unitOptions = (currentValue: string, options: string[]) =>
        Array.from(new Set([currentValue, ...options].filter(Boolean)));

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TitleText title={t("dataCleaning.physical_unit_and_system_boundary")} />
                <IconButton onClick={handleClose} aria-label={t("common.close")} size="small" disabled={isSaving}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2, mt: 1 }}>
                    <TextField
                        select
                        fullWidth
                        label={t("dataCleaning.settings.unit_flow")}
                        value={form.unit_flow}
                        onChange={(event) => updateField("unit_flow", event.target.value)}
                        disabled={isSaving}
                    >
                        {unitOptions(form.unit_flow, UnitFlowOptions).map((unit) => (
                            <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        label={t("dataCleaning.settings.unit_temp")}
                        value={form.unit_temp}
                        onChange={(event) => updateField("unit_temp", event.target.value)}
                        disabled={isSaving}
                    >
                        {unitOptions(form.unit_temp, UnitTempOptions).map((unit) => (
                            <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        label={t("dataCleaning.settings.unit_pressure")}
                        value={form.unit_pressure}
                        onChange={(event) => updateField("unit_pressure", event.target.value)}
                        disabled={isSaving}
                    >
                        {unitOptions(form.unit_pressure, UnitPressureOptions).map((unit) => (
                            <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        type="number"
                        label={t("dataCleaning.settings.data_interval")}
                        value={form.data_interval}
                        onChange={(event) => updateField("data_interval", event.target.value)}
                        slotProps={{ htmlInput: { min: 1, step: 1 } }}
                        disabled={isSaving}
                    />
                    <TextField
                        fullWidth
                        type="number"
                        label={t("dataCleaning.settings.sys_design_rt")}
                        value={form.sys_design_rt}
                        onChange={(event) => updateField("sys_design_rt", event.target.value)}
                        slotProps={{ htmlInput: { min: 0, step: "any" } }}
                        // disabled={isSaving}
                        disabled={true}

                    />
                    <TextField
                        fullWidth
                        type="number"
                        label={t("dataCleaning.settings.sys_design_kw")}
                        value={form.sys_design_kw}
                        onChange={(event) => updateField("sys_design_kw", event.target.value)}
                        slotProps={{ htmlInput: { min: 0, step: "any" } }}
                        // disabled={isSaving}
                        disabled={true}
                    />
                </Box>
                {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleClose} disabled={isSaving}>{t("common.cancel")}</Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving || uploadId === undefined}
                    startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : <SaveOutlinedIcon />}
                >
                    {t("common.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PhysicalUnitAndSystemBoundarySettingDialog;
