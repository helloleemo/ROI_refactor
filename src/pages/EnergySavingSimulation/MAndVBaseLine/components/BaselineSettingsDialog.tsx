import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Slider, TextField, Typography } from "@mui/material";
import type { FilterRequest, MAndVBaseline } from "@/api/types/mAndVBaseline";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface BaselineSettingsDialogProps {
    open: boolean;
    baseline: MAndVBaseline | null;
    isSaving: boolean;
    error: boolean;
    onClose: () => void;
    onSave: (settings: { balance_mode: string; hb_threshold?: number; eb_threshold?: number }) => void;
}

const BaselineSettingsDialog = ({
    open,
    baseline,
    isSaving,
    error,
    onClose,
    onSave,
}: BaselineSettingsDialogProps) => {
    if (!baseline) return;

    console.log("baseline", baseline)

    const { t } = useTranslation();
    const [filter, setFilter] = useState<FilterRequest>({
        balance_mode: baseline.balance_mode,
        hb_threshold: baseline.hb_threshold,
        eb_threshold: baseline.eb_threshold
    });

    const handleBalanceModeChange = (balanceMode: string) => {
        setFilter((prev) => ({
            ...prev,
            balance_mode: balanceMode,
            ...(balanceMode === "none" ? { hb_threshold: 0, eb_threshold: 0 } : {}),
        }));
    };

    const handleThresholdChange = (key: "hb_threshold" | "eb_threshold", value: number) => {
        setFilter((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        if (!canSave) return;
        if (filter.balance_mode === "none") {
            onSave({ balance_mode: "none" });
        } else if (filter.balance_mode === "heat_balance") {
            onSave({ balance_mode: "heat_balance", hb_threshold: filter.hb_threshold });
        } else if (filter.balance_mode === "energy_balance") {
            onSave({ balance_mode: "energy_balance", eb_threshold: filter.eb_threshold });
        }

    }


    useEffect(() => {
        if (!open || !baseline) return;
        setFilter({
            balance_mode: baseline.balance_mode,
            hb_threshold: baseline.hb_threshold,
            eb_threshold: baseline.eb_threshold
        });
    }, [open, baseline]);



    const parsedHbThreshold = Number(filter.hb_threshold);
    const parsedEbThreshold = Number(filter.eb_threshold);
    const canSave = String(filter.hb_threshold).trim() !== "" && String(filter.eb_threshold).trim() !== ""
        && Number.isFinite(parsedHbThreshold) && parsedHbThreshold >= 0
        && Number.isFinite(parsedEbThreshold) && parsedEbThreshold >= 0;

    return (
        <Dialog open={open} onClose={() => !isSaving && onClose()} maxWidth="sm" fullWidth>
            <DialogTitle>{t("mAndVBaseline.settings_title")}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(1, minmax(0, 1fr))" }, gap: 2, pt: 1 }}>
                    <TextField
                        label={t("mAndVBaseline.balance_mode")}
                        value={filter.balance_mode}
                        onChange={(event) => handleBalanceModeChange(event.target.value)}
                        fullWidth
                        select
                        disabled={isSaving}
                    >
                        <MenuItem value="none">{t("mAndVBaseline.mode_none")}</MenuItem>
                        <MenuItem value="heat_balance">{t("mAndVBaseline.mode_heat_balance")}</MenuItem>
                        <MenuItem value="energy_balance">{t("mAndVBaseline.mode_energy_balance")}</MenuItem>
                    </TextField>
                    <Box sx={{ px: 1, display: "flex", flexDirection: "column", gap: 2 }}>

                        <Box>
                            <Typography id="eb-threshold-label" gutterBottom>
                                {t("mAndVBaseline.energy_threshold")} ({filter.eb_threshold}%)
                            </Typography>
                            <Slider
                                size="medium"
                                sx={{ width: "100%", cursor: "pointer", height: 3.1 }}
                                aria-labelledby="eb-threshold-label"
                                value={filter.eb_threshold ?? 0}
                                onChange={(_, value) => typeof value === "number" && handleThresholdChange("eb_threshold", value)}
                                min={5}
                                max={25}
                                step={1}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value}%`}
                                disabled={filter.balance_mode !== "energy_balance" || isSaving}
                            />
                        </Box >

                        <Box>
                            <Typography id="hb-threshold-label" gutterBottom>
                                {t("mAndVBaseline.heat_threshold")} ({filter.hb_threshold}%)
                            </Typography>
                            <Slider
                                size="medium"
                                sx={{ width: "100%", cursor: "pointer", height: 3 }}
                                aria-labelledby="hb-threshold-label"
                                value={filter.hb_threshold ?? 0}
                                onChange={(_, value) => typeof value === "number" && handleThresholdChange("hb_threshold", value)}
                                min={5}
                                max={25}
                                step={1}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value}%`}
                                disabled={filter.balance_mode !== "heat_balance" || isSaving}
                            />
                        </Box>
                    </Box>
                    {baseline?.feasibility.message && (
                        <Typography sx={{ gridColumn: "1 / -1", fontSize: "small" }} color="error">
                            {baseline.feasibility.message}
                        </Typography>
                    )}
                </Box>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{t("mAndVBaseline.save_failed")}</Alert>}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} disabled={isSaving}>{t("common.cancel")}</Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving || !canSave}
                >
                    {t("common.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BaselineSettingsDialog;
