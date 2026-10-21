
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Slider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { MAndVBaseline, TrainRequest, TrainXType, TrainYType } from "@/api/types/mAndVBaseline";

const X_OPTIONS: TrainXType[] = ["rt", "outside_air_temperature", "wet_bulb_temperature"];
const Y_OPTIONS: TrainYType[] = ["system_kw", "total_chiller_kw", "total_chp_kw", "total_zp_kw", "total_cwp_kw", "total_ct_kw"];

const DEFAULT_PARAMS: TrainRequest = { x1: "rt", x2: "none", y: "system_kw", train_split_ratio: 0.8 };

interface ParamSettingsDialogProps {
    open: boolean;
    baseline: MAndVBaseline | null;
    isSaving: boolean;
    error: boolean;
    onClose: () => void;
    onSave: (params: TrainRequest) => void;
}

const ParamSettingsDialog = ({
    open,
    baseline,
    isSaving,
    error,
    onClose,
    onSave,
}: ParamSettingsDialogProps) => {
    const { t } = useTranslation();
    const [params, setParams] = useState<TrainRequest>(DEFAULT_PARAMS);

    useEffect(() => {
        if (!open) return;
        const config = baseline?.model_config;
        setParams({
            x1: config?.x1 ?? DEFAULT_PARAMS.x1,
            x2: config?.x2 ?? "none",
            y: config?.y ?? DEFAULT_PARAMS.y,
            train_split_ratio: config?.train_split_ratio ?? DEFAULT_PARAMS.train_split_ratio,
        });
    }, [open, baseline]);

    const handleX1Change = (x1: TrainXType) => {
        setParams((prev) => ({ ...prev, x1, x2: prev.x2 === x1 ? "none" : prev.x2 }));
    };

    return (
        <Dialog open={open} onClose={() => !isSaving && onClose()} maxWidth="sm" fullWidth>
            <DialogTitle>{t("mAndVBaseline.param_settings_title")}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
                    <TextField
                        select
                        fullWidth
                        label={t("mAndVBaseline.x1")}
                        value={params.x1}
                        onChange={(e) => handleX1Change(e.target.value as TrainXType)}
                        disabled={isSaving}
                    >
                        {X_OPTIONS.map((v) => (
                            <MenuItem key={v} value={v}>{t(`mAndVBaseline.var_${v}`)}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        label={t("mAndVBaseline.x2")}
                        value={params.x2}
                        onChange={(e) => setParams((prev) => ({ ...prev, x2: e.target.value as TrainRequest["x2"] }))}
                        disabled={isSaving}
                    >
                        <MenuItem value="none">{t("mAndVBaseline.var_none")}</MenuItem>
                        {X_OPTIONS.filter((v) => v !== params.x1).map((v) => (
                            <MenuItem key={v} value={v}>{t(`mAndVBaseline.var_${v}`)}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        label={t("mAndVBaseline.y")}
                        value={params.y}
                        onChange={(e) => setParams((prev) => ({ ...prev, y: e.target.value as TrainYType }))}
                        disabled={isSaving}
                    >
                        {Y_OPTIONS.map((v) => (
                            <MenuItem key={v} value={v}>{t(`mAndVBaseline.var_${v}`)}</MenuItem>
                        ))}
                    </TextField>
                    <Box sx={{ px: 1 }}>
                        <Typography id="train-split-ratio-label" gutterBottom>
                            {t("mAndVBaseline.train_split_ratio")} ({params.train_split_ratio})
                        </Typography>
                        <Slider
                            aria-labelledby="train-split-ratio-label"
                            value={params.train_split_ratio}
                            onChange={(_, value) => typeof value === "number" && setParams((prev) => ({ ...prev, train_split_ratio: value }))}
                            min={0.1}
                            max={1}
                            step={0.05}
                            valueLabelDisplay="auto"
                            disabled={isSaving}
                        />
                    </Box>
                </Box>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{t("mAndVBaseline.save_failed")}</Alert>}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} disabled={isSaving}>{t("common.cancel")}</Button>
                <Button variant="contained" onClick={() => onSave(params)} disabled={isSaving}>
                    {t("common.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ParamSettingsDialog;