import { forwardRef, useMemo, useState, type ReactElement, type Ref } from "react";
import { TitleText } from "@/components";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    alpha,
    Box,
    Button,
    Collapse,
    Dialog,
    Divider,
    Chip,
    Grid,
    IconButton,
    Paper,
    Slide,
    Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { ImportFile } from "@/api/types/index.ts";

const getCsvStatusLabel = (status?: number) => {
    if (status === 1) return "UPLOADING";
    if (status === 2) return "SUCCESS";
    if (status === 3) return "FAILED";
    return "UNKNOWN";
};

const getCsvStatusColor = (status?: number): "default" | "success" | "error" | "warning" => {
    if (status === 1) return "warning";
    if (status === 2) return "success";
    if (status === 3) return "error";
    return "default";
};

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<unknown>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type CsvReviewDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedRow?: ImportFile
};

type CsvPreviewRow = {
    id: number;
    no: number;
    tag: string;
};

const CsvReviewDialog = ({
    open,
    setOpen,
    selectedRow,
}: CsvReviewDialogProps) => {
    const [isInfoOpen, setIsInfoOpen] = useState(true);

    const tagCount = useMemo(() => {
        return selectedRow?.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean).length ?? "-";
    }, [selectedRow?.tags]);

    const previewColumns: GridColDef<CsvPreviewRow>[] = useMemo(
        () => [
            { field: "no", headerName: "序號", width: 90 },
            { field: "tag", headerName: "TAGS", flex: 1, minWidth: 240 },
        ],
        [],
    );

    const previewRows: CsvPreviewRow[] = useMemo(() => {
        if (!selectedRow) return [];
        const tags = selectedRow.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        return tags.map((tag, index) => ({
            id: index + 1,
            no: index + 1,
            tag,
        }));
    }, [selectedRow]);

    const summaryCards = useMemo(
        () => [
            { label: "檔名", value: selectedRow?.file_name ?? "mock_csv_data.csv" },
            { label: "欄位數", value: `${tagCount} 欄` },
            { label: "行數", value: `${selectedRow?.row_count} 筆` },
            { label: "狀態", value: selectedRow?.status, isStatus: true },
        ],
        [selectedRow?.file_name, tagCount, previewRows.length],
    );

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={() => setOpen(false)}
            slots={{ transition: Transition }}
            slotProps={{
                paper: {
                    sx: (theme) => ({
                        backgroundColor: theme.palette.background.default,
                    }),
                },
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box
                    sx={(theme) => ({
                        px: 2,
                        py: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                    })}
                >
                    <Box>
                        <TitleText
                            title="CSV 資料預覽"
                        />
                        {/* <Typography sx={{ fontSize: 16, fontWeight: 700, color: "text.primary" }}>
                            CSV 資料預覽
                        </Typography> */}
                        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                            {selectedRow?.file_name ?? "mock_csv_data.csv"}
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setOpen(false)} aria-label="close" size="small">
                        <CloseIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        p: 1,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        overflow: "hidden",
                    }}
                >
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
                            onClick={() => setIsInfoOpen((prev) => !prev)}
                            color="inherit"
                            sx={{
                                px: 1,
                                py: 1,
                                minHeight: 40,
                                justifyContent: "space-between",
                                textTransform: "none",
                                borderRadius: 0,
                            }}
                        >
                            <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary", lineHeight: 1 }}>
                                基本資訊
                            </Typography>
                            {isInfoOpen ? <ExpandLessIcon sx={{ fontSize: 20 }} /> : <ExpandMoreIcon sx={{ fontSize: 20 }} />}
                        </Button>
                        <Collapse in={isInfoOpen} timeout="auto" unmountOnExit>
                            <Divider />
                            <Box sx={{ p: 1.5 }}>
                                <Grid container spacing={1.5}>
                                    {summaryCards.map((card) => (
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.label}>
                                            <Paper
                                                variant="outlined"
                                                sx={(theme) => ({
                                                    px: 1,
                                                    py: 1,
                                                    borderRadius: 1.2,
                                                    borderColor: theme.palette.divider,
                                                    backgroundColor:
                                                        theme.palette.mode === "dark"
                                                            ? alpha(theme.palette.common.white, 0.04)
                                                            : "#fbfcfe",
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    gap: 1,
                                                })}
                                            >
                                                <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.1 }}>
                                                    {card.label}
                                                </Typography>
                                                {card.isStatus ? (
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <Chip
                                                            size="small"
                                                            label={getCsvStatusLabel(card.value as number | undefined)}
                                                            color={getCsvStatusColor(card.value as number | undefined)}
                                                            variant="outlined"
                                                        />
                                                    </Box>
                                                ) : (
                                                    <Typography
                                                        sx={{
                                                            fontSize: 13,
                                                            color: "text.primary",
                                                            fontWeight: 600,
                                                            lineHeight: 1.2,
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        {card.value}
                                                    </Typography>
                                                )}
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
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
                        <Box
                            sx={(theme) => ({
                                px: 1,
                                py: 1,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                            })}
                        >
                            <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary" }}>
                                欄位瀏覽
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1, minHeight: 0 }}>
                            <DataGrid
                                rows={previewRows}
                                columns={previewColumns}
                                disableRowSelectionOnClick
                                columnHeaderHeight={36}
                                sx={{
                                    border: 0,
                                    "& .MuiDataGrid-columnHeaders": {
                                        borderBottom: "1px solid",
                                        borderColor: (theme) => theme.palette.semantic.borderSubtle,
                                        minHeight: "36px !important",
                                        maxHeight: "36px !important",
                                    },
                                    "& .MuiDataGrid-columnHeaderTitle": {
                                        fontWeight: "bold",
                                        fontSize: 13,
                                    },
                                }}
                            />
                        </Box>
                    </Paper>
                </Box>

                <Divider />

                <Box
                    sx={(theme) => ({
                        px: 2,
                        py: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                        backgroundColor: theme.palette.background.paper,
                    })}
                >
                    <Button variant="text" onClick={() => setOpen(false)}>關閉</Button>
                    <Button variant="contained" onClick={() => setOpen(false)}>確認</Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default CsvReviewDialog;