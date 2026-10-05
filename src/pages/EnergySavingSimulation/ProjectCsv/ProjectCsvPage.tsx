import OneSectionStyled from "@/components/gridLayout/SectionLayout";
import { Box, Button, CircularProgress, Collapse, Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useOpenDialog from "@/hooks/useOpenDialog";
import TitleText from "@/components/TitleText";
import { useTranslation } from "react-i18next";
import useLoading from "@/hooks/useLoading";
import importFileService from "@/api/services/importFile";
import { DatasetTypeNum } from "@/api/types/shared";
import tagDataService from "@/api/services/tagData";
import type { ImportFile } from "@/api/types/importFile";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CsvDatagrid from "./components/CsvDatagrid";
import SummaryItems from "./components/SummaryItems";

export const ProjectCsvPage = () => {

    const { t } = useTranslation();
    const [tags, setTags] = useState<string[] | null>(null);
    const [file, setFile] = useState<ImportFile | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [isInfoOpen, setIsInfoOpen] = useState(true);


    const { isLoading } = useLoading();

    const { openDialog } = useOpenDialog({
        upload: false
    });

    const getFiles = async () => {
        try {
            const projectFiles = await importFileService.getList({
                upload_type: DatasetTypeNum.TRAINING
            });
            const selectedFile = projectFiles[0];

            if (!selectedFile) {
                setFile(null);
                setTags([]);
                return;
            }

            setFile(selectedFile);
            const fileTags = (await tagDataService.getTagList(selectedFile.id)).tags;
            console.log(fileTags);

            const mockTags = Array.from({ length: 150 }, (_, i) => `mock_tag${i + 1}`);
            fileTags.push(...mockTags);

            setTags(fileTags);

        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        void getFiles();
    }, []);

    return (
        <OneSectionStyled sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2
            }}>
                <Box sx={{ minWidth: 0 }}>
                    <TitleText title={t("projectCsv.title")} />
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }} noWrap>
                        {file?.file_name ?? t("projectCsv.description")}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
                    <Button
                        sx={{
                            whiteSpace: "nowrap"
                        }}
                        variant="outlined"
                        onClick={() => openDialog("upload")}
                        disabled={isLoading("upload")}
                        startIcon={isLoading("upload") ? <CircularProgress size={16} color="inherit" /> : undefined}
                    >
                        + {t("equipment-list.add")}
                    </Button>
                </Box>
            </Box>
            <Box sx={{ p: 0, flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
                <Paper
                    variant="outlined"
                    sx={(theme) => ({
                        mb: 0.75,
                        borderRadius: 1.5,
                        borderColor: theme.palette.divider,
                        backgroundColor: theme.palette.background.paper,
                        flexShrink: 0,
                        overflow: "hidden",
                    })}
                >
                    <Button
                        fullWidth
                        onClick={() => setIsInfoOpen((previous) => !previous)}
                        color="inherit"
                        sx={{ px: 1, py: 1, minHeight: 40, justifyContent: "space-between", textTransform: "none", borderRadius: 0 }}
                    >
                        <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary", lineHeight: 1 }}>
                            {t("projectCsv.basic_info")}
                        </Typography>
                        {isInfoOpen ? <ExpandLessIcon sx={{ fontSize: 20 }} /> : <ExpandMoreIcon sx={{ fontSize: 20 }} />}
                    </Button>
                    <Collapse in={isInfoOpen} timeout="auto" unmountOnExit>
                        <Divider />
                        <Box sx={{ p: 1.5 }}>
                            <SummaryItems file={file} tags={tags ?? []} />
                        </Box>
                    </Collapse>
                </Paper>

                <Paper
                    variant="outlined"
                    sx={(theme) => ({
                        flex: 1,
                        minHeight: 0,
                        borderRadius: 1.5,
                        borderColor: theme.palette.divider,
                        backgroundColor: theme.palette.background.paper,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    })}
                >
                    <Box sx={(theme) => ({ px: 1, py: 1, borderBottom: `1px solid ${theme.palette.divider}` })}>
                        <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary" }}>
                            {t("projectCsv.field_browse")}
                        </Typography>
                    </Box>
                    <CsvDatagrid tags={tags ?? []} loading={isFetching} />
                </Paper>
            </Box>
        </OneSectionStyled>
    );
};