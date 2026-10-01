import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

type AboutApplicationDialogProps = {
    open: boolean;
    onClose: () => void;
};

const AboutApplicationDialog = ({ open, onClose }: AboutApplicationDialogProps) => {
    const { t } = useTranslation();
    const { projectSettings, supportedLocales } = useLanguage();

    const formatDateTime = (value?: string) =>
        value ? new Date(value).toLocaleString() : "-";

    const localeLabel = (value: string) =>
        supportedLocales.find((locale) => locale.value === value)?.label ?? value;

    const rows = projectSettings
        ? [
            { key: "system-title", label: t("about-application.system-title"), value: projectSettings.system_title },
            { key: "default-locale", label: t("about-application.default-locale"), value: localeLabel(projectSettings.default_locale) },
            { key: "enabled-locales", label: t("about-application.enabled-locales"), value: "" },
            { key: "timezone", label: t("about-application.timezone"), value: projectSettings.timezone },
            { key: "date-format", label: t("about-application.date-format"), value: projectSettings.date_format },
        ]
        : [];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{t("about-application.title")}</DialogTitle>
            <DialogContent>
                <Stack spacing={1.5}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                    }}>
                        <Typography sx={{ fontWeight: 600, color: "semantic.brandAdaptive" }}>
                            ROI TOOL
                        </Typography>
                        {projectSettings && (
                            <Typography variant="caption" color="text.secondary">
                                {`${t("about-application.updated-at")}: ${formatDateTime(projectSettings.updated_at)}`}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{
                        border: "1px solid",
                        borderColor: "semantic.borderSubtle",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}>
                        {rows.map((row, index) => (
                            <Box
                                key={row.key}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    px: 2.5,
                                    py: 1.5,
                                    borderTop: index === 0 ? "none" : "1px solid",
                                    borderColor: "semantic.borderSubtle",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ width: 140, flexShrink: 0 }}
                                >
                                    {row.label}
                                </Typography>
                                {row.key === "enabled-locales" && projectSettings ? (
                                    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                                        {projectSettings.enabled_locales.map((locale) => (
                                            <Chip
                                                key={locale}
                                                label={localeLabel(locale)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {row.value}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="text">
                    {t("about-application.close")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AboutApplicationDialog;
