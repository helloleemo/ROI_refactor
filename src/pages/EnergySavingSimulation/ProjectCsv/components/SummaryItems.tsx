import { alpha, Box, Chip, Grid, Paper, Typography, type ChipProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DatasetTypeText } from "@/api/types/shared";
import type { ImportFile } from "@/api/types/importFile";

type SummaryItemsProps = {
    file: ImportFile | null;
    tags: string[];
};

const SummaryItems = ({ file, tags }: SummaryItemsProps) => {
    const { t } = useTranslation();
    const statusLabel = file?.status === 1
        ? t("projectCsv.status_uploading")
        : file?.status === 2
            ? t("projectCsv.status_success")
            : file?.status === 3
                ? t("projectCsv.status_failed")
                : t("projectCsv.status_unknown");
    const statusColor: ChipProps["color"] = file?.status === 1
        ? "warning"
        : file?.status === 2
            ? "success"
            : file?.status === 3
                ? "error"
                : "default";
    const uploadType = file?.upload_type == null ? "-" : DatasetTypeText[file.upload_type];
    const summaryItems = [
        { label: t("projectCsv.file_name"), value: file?.file_name ?? "-" },
        { label: t("projectCsv.field_count"), value: t("projectCsv.field_count_value", { count: tags.length }) },
        { label: t("projectCsv.row_count"), value: t("projectCsv.row_count_value", { count: file?.row_count ?? "-" }) },
        { label: t("projectCsv.status"), value: statusLabel, isStatus: true },
        { label: t("projectCsv.file_type"), value: uploadType },
    ];

    return (
        <Grid container spacing={1.5}>
            {summaryItems.map((item) => (
                <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={item.label}>
                    <Paper
                        variant="outlined"
                        sx={(theme) => ({
                            px: 1,
                            py: 1,
                            borderRadius: 1.2,
                            borderColor: theme.palette.divider,
                            backgroundColor: theme.palette.mode === "dark"
                                ? alpha(theme.palette.common.white, 0.04)
                                : theme.palette.semantic.surfaceSubtle,
                            height: "100%",
                            minHeight: 58,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: 1,
                        })}
                    >
                        <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.1 }}>
                            {item.label}
                        </Typography>
                        {item.isStatus ? (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Chip size="small" label={statusLabel} color={statusColor} variant="outlined" />
                            </Box>
                        ) : (
                            <Typography sx={{ fontSize: 13, color: "text.primary", fontWeight: 600, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {item.value}
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default SummaryItems;