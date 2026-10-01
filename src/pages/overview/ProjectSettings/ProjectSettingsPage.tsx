import { showToast, TitleText } from "@/components";
import { useEffect, useState } from "react";
import { Box, Button, Chip, Divider, Stack, TextField, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useTranslation } from "react-i18next";
import SectionLayout from "@/components/gridLayout/SectionLayout.tsx";
import { ProjectService } from "@/api/services/project";
import type { ProjectUpdateRequest } from "@/api/types/project";
import { useProject } from "@/contexts/ProjectContext";
import { useLanguage } from "@/contexts/LanguageContext";
import toasterWording from "@/settings/toasterWording";

const EMPTY_FORM: ProjectUpdateRequest = {
    name: "",
    description: "",
    status: 1,
};

const ProjectSettingsPage = () => {
    const { t } = useTranslation();
    const { currentProject, refreshProjects, setCurrentProject } = useProject();
    const { projectSettings, supportedLocales } = useLanguage();
    const [form, setForm] = useState<ProjectUpdateRequest>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (currentProject) {
            setForm({
                name: currentProject.name,
                description: currentProject.description,
                status: currentProject.status ?? 1,
            });
            setNameError(false);
            setIsEditing(false);
        }
    }, [currentProject]);

    const handleChange = (field: keyof ProjectUpdateRequest, value: string | number) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!currentProject) return;

        const name = form.name.trim();
        if (!name) {
            setNameError(true);
            return;
        }

        try {
            setSubmitting(true);
            setNameError(false);

            const updatedProject = await ProjectService.UPDATE(String(currentProject.id), {
                name,
                description: form.description.trim(),
                status: form.status ?? 1,
            });

            await refreshProjects();
            setCurrentProject(updatedProject);
            setIsEditing(false);
            showToast(t(toasterWording.success.project_update), "success");
        } catch (error) {
            console.error("Failed to update project", error);
            showToast(`${t(toasterWording.error.project_update)}: ${error}`, "error");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (currentProject) {
            setForm({
                name: currentProject.name,
                description: currentProject.description,
                status: currentProject.status ?? 1,
            });
        }
        setNameError(false);
        setIsEditing(false);
    };

    const formatDateTime = (value?: string) =>
        value ? new Date(value).toLocaleString() : "-";

    const localeLabel = (value: string) =>
        supportedLocales.find((locale) => locale.value === value)?.label ?? value;

    const systemSettingRows = projectSettings
        ? [
            { key: "system-title", label: t("about-application.system-title"), value: projectSettings.system_title },
            { key: "default-locale", label: t("about-application.default-locale"), value: localeLabel(projectSettings.default_locale) },
            { key: "enabled-locales", label: t("about-application.enabled-locales"), value: projectSettings.enabled_locales.map(localeLabel).join(", ") },
            { key: "timezone", label: t("about-application.timezone"), value: projectSettings.timezone },
            { key: "date-format", label: t("about-application.date-format"), value: projectSettings.date_format },
        ]
        : [];

    return (
        <SectionLayout sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 5,
            }}>
                <TitleText title={t("project-settings.title")} />
            </Box>

            <Stack spacing={1.5} sx={{ maxWidth: 720 }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {t("project-settings.project-title")}
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        <Typography variant="caption" color="text.secondary">
                            {`${t("project-settings.created-at")}: ${formatDateTime(currentProject?.created_at)}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {`${t("project-settings.updated-at")}: ${formatDateTime(currentProject?.updated_at)}`}
                        </Typography>
                    </Stack>
                </Box>

                <Box sx={{
                    border: "1px solid",
                    borderColor: "semantic.borderSubtle",
                    borderRadius: 2,
                    p: 2.5,
                }}>
                    {isEditing ? (
                        <Stack spacing={2}>
                            <TextField
                                label={t("project-settings.name")}
                                value={form.name}
                                onChange={(event) => handleChange("name", event.target.value)}
                                size="small"
                                fullWidth
                                required
                                disabled={submitting}
                                error={nameError && !form.name.trim()}
                                helperText={nameError && !form.name.trim() ? t("project-settings.name-required") : " "}
                            />
                            <TextField
                                label={t("project-settings.description")}
                                value={form.description}
                                onChange={(event) => handleChange("description", event.target.value)}
                                size="small"
                                fullWidth
                                multiline
                                minRows={4}
                                disabled={submitting}
                            />
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                <Button
                                    color="inherit"
                                    onClick={handleCancel}
                                    disabled={submitting}
                                >
                                    {t("project-settings.cancel")}
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        void handleSubmit();
                                    }}
                                    disabled={submitting}
                                >
                                    {submitting ? t("project-settings.saving") : t("project-settings.save")}
                                </Button>
                            </Box>
                        </Stack>
                    ) : (
                        <Stack spacing={2}>
                            <Stack direction="row" spacing={2}>
                                <Typography variant="body2" color="text.secondary" sx={{ width: 160, flexShrink: 0 }}>
                                    {t("project-settings.name")}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {currentProject?.name ?? "-"}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Typography variant="body2" color="text.secondary" sx={{ width: 160, flexShrink: 0 }}>
                                    {t("project-settings.description")}
                                </Typography>
                                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                    {currentProject?.description || "-"}
                                </Typography>
                            </Stack>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<EditOutlinedIcon />}
                                    onClick={() => setIsEditing(true)}
                                    disabled={!currentProject}
                                >
                                    {t("project-settings.edit")}
                                </Button>
                            </Box>
                        </Stack>
                    )}
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {t("about-application.title")}
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
                    {systemSettingRows.map((row, index) => (
                        <Box
                            key={row.label}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                px: 2.5,
                                py: 1.75,
                                borderTop: index === 0 ? "none" : "1px solid",
                                borderColor: "semantic.borderSubtle",
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ width: 160, flexShrink: 0 }}
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

                <Divider sx={{ my: 2 }} />


            </Stack>
        </SectionLayout>
    );
};

export default ProjectSettingsPage;
