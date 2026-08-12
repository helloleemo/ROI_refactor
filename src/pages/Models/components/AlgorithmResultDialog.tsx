import { useEffect, useState } from "react";
import { N30x30OptionsList, TitleText } from "@/components";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    alpha,
    Box,
    Button,
    Chip,
    Collapse,
    Dialog,
    Divider,
    Grid,
    IconButton,
    Paper,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import type { AlgorithmPreviewRow } from "./AlgorithmPreviewRow.types";
import XTagsDialog from "./XTagsDialog";
import Y_XTimeChart from "./charts/Y_XTimeChart";
import YChart from "./charts/YChart";
import modelAlgorithm from "@/api/services/modelAlgorithm";
import type { algorithmListResponse } from "@/api/types/modelAlgorithm";


type ChartTabKey = "yxtime" | "yx";

const chartTabs: { key: ChartTabKey; label: string }[] = [
    { key: "yxtime", label: "Y-XTIME圖" },
    { key: "yx", label: "Y-X圖" },
];

const getStatusChipColor = (statusLabel: string): "default" | "success" | "error" | "warning" | "info" => {
    if (statusLabel === "SUCCESS") return "success";
    if (statusLabel === "FAILED") return "error";
    if (statusLabel === "TRAINING") return "warning";
    if (statusLabel === "WAITING" || statusLabel === "PENDING") return "info";
    return "default";
};

const cardPaperSx = (theme: any) => ({
    px: 1,
    py: 1,
    borderRadius: 1.2,
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.04) : "#fbfcfe",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 1,
});

type AlgorithmResultDialogProps = {
    open: boolean;
    onClose: () => void;
    row: AlgorithmPreviewRow & { dataset: algorithmListResponse["metrics"]["dataset"] | null } | null;
    onEnable: (row: AlgorithmPreviewRow) => void;
};

const AlgorithmResultDialog = ({ open, onClose, row, onEnable }: AlgorithmResultDialogProps) => {
    // 
    // console.log("AlgorithmResultDialog row:", row);

    const [isParamsOpen, setIsParamsOpen] = useState(true);
    const [activeChartTab, setActiveChartTab] = useState<ChartTabKey>("yxtime");
    const [isXTagsOpen, setIsXTagsOpen] = useState(false);
    const [chartData, setChartData] = useState<{ times: string[]; actual: number[]; predict: number[]; dataset: algorithmListResponse["metrics"]["dataset"] | null }>({
        times: [],
        actual: [],
        predict: [],
        dataset: null
    });

    const getYXTimeChartData = async () => {
        if (!row?.id) {
            setChartData({ times: [], actual: [], predict: [], dataset: null });
            return;
        }

        const payload = {
            algorithm_id: row.id,
            start_time: "",
            end_time: "",
        };

        try {
            const data = await modelAlgorithm.comparisonList(payload);
            setChartData({
                times: data?.times ?? [],
                actual: data?.actual ?? [],
                predict: data?.predict ?? [],
                dataset: row?.dataset ?? null
            });
        } catch (error) {
            setChartData({ times: [], actual: [], predict: [], dataset: null });
            console.error("Error fetching Y-XTIME chart data:", error);
        }
    };


    useEffect(() => {
        if (open) {
            setIsParamsOpen(true);
            setActiveChartTab("yxtime");
            getYXTimeChartData();
        }
    }, [open, row?.id]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth

            slotProps={{
                paper: {
                    elevation: 0,
                    sx: (theme) => ({
                        backgroundColor: theme.palette.background.default,
                    }),
                },
            }}
        >
            <Box
                sx={(theme) => ({
                    px: 2,
                    py: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.default,
                })}
            >
                <TitleText title="瀏覽結果" />
                <IconButton onClick={onClose} aria-label="close" size="small">
                    <CloseIcon sx={{ fontSize: 18 }} />
                </IconButton>
            </Box>

            <Box
                sx={{
                    p: 1.5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    height: "70vh",
                    minHeight: 0,
                    // overflow: "hidden",
                }}
            >
                <Paper
                    variant="outlined"
                    sx={(theme) => ({
                        borderRadius: 1.5,
                        borderColor: theme.palette.divider,
                        // 
                        overflow: "visible",
                        flexShrink: 0,
                    })}
                >
                    <Button
                        fullWidth
                        onClick={() => setIsParamsOpen((prev) => !prev)}
                        color="inherit"
                        sx={{
                            px: 1.5,
                            py: 1,
                            minHeight: 40,
                            justifyContent: "space-between",
                            textTransform: "none",
                            borderRadius: 0,
                            borderTopLeftRadius: 1.5,
                            borderTopRightRadius: 1.5,
                            backgroundColor: "semantic.surfaceSubtle",
                        }}
                    >
                        <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary", lineHeight: 1 }}>
                            參數區塊
                        </Typography>
                        {isParamsOpen ? <ExpandLessIcon sx={{ fontSize: 20 }} /> : <ExpandMoreIcon sx={{ fontSize: 20 }} />}
                    </Button>
                    <Collapse in={isParamsOpen} timeout="auto" unmountOnExit>
                        <Divider />
                        <Box sx={{ p: 1 }}>
                            <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
                                {[
                                    { label: "來源檔名", value: row?.upload_name ?? "-" },
                                    { label: "演算法", value: row?.algorithm ?? "-" },
                                    { label: "模型目標Y", value: row?.y_tag ?? "-" },
                                ].map((card) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.label}>
                                        <Paper variant="outlined" sx={cardPaperSx}>
                                            <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.1 }}>
                                                {card.label}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: 13,
                                                    color: "text.primary",
                                                    fontWeight: 600,
                                                    lineHeight: 1.2,
                                                    // overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {card.value}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Paper variant="outlined" sx={cardPaperSx}>
                                        <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.1 }}>
                                            模型變數X
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                            <Typography
                                                sx={{
                                                    flex: 1,
                                                    fontSize: 13,
                                                    color: "text.primary",
                                                    fontWeight: 600,
                                                    lineHeight: 1.2,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {row?.x_tags ?? "-"}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                sx={{ p: 0.25 }}
                                                aria-label="檢視全部 X Tags"
                                                onClick={() => row && setIsXTagsOpen(true)}
                                            >
                                                <N30x30OptionsList />
                                            </IconButton>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1.5}>
                                {[
                                    { label: "R²", train: row?.metricsTrain.r2 ?? "-", test: row?.metricsTest.r2 ?? "-" },
                                    { label: "MAE", train: row?.metricsTrain.mae ?? "-", test: row?.metricsTest.mae ?? "-" },
                                    { label: "MAPE", train: row?.metricsTrain.mape ?? "-", test: row?.metricsTest.mape ?? "-" },
                                ].map((card) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.label}>
                                        <Paper variant="outlined" sx={cardPaperSx}>
                                            <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.1 }}>
                                                {card.label}
                                            </Typography>
                                            <Typography sx={{ fontSize: 13, color: "text.primary", lineHeight: 1.2 }}>
                                                <Box component="span" sx={{ color: "text.secondary", mr: 0.5 }}>訓練</Box>
                                                <Box component="span" sx={{ fontWeight: 700, mr: 1.5 }}>{card.train}</Box>
                                                <Box component="span" sx={{ color: "text.secondary", mr: 0.5 }}>測試</Box>
                                                <Box component="span" sx={{ fontWeight: 700 }}>{card.test}</Box>
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Paper variant="outlined" sx={cardPaperSx}>
                                        <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.1 }}>
                                            狀態
                                        </Typography>
                                        {row ? (
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Chip
                                                    size="small"
                                                    label={row.status}
                                                    color={getStatusChipColor(row.status)}
                                                    variant="outlined"
                                                />
                                            </Box>
                                        ) : (
                                            <Typography sx={{ fontSize: 13, color: "text.primary" }}>-</Typography>
                                        )}
                                    </Paper>
                                </Grid>
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
                        // overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    })}
                >
                    <Box
                        sx={(theme) => ({
                            px: 1.5,
                            py: 1,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                        })}
                    >
                        <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary" }}>
                            圖表區塊
                        </Typography>
                    </Box>
                    <Tabs
                        value={activeChartTab}
                        onChange={(_, value: ChartTabKey) => setActiveChartTab(value)}
                        variant="scrollable"
                        allowScrollButtonsMobile
                        sx={(theme) => ({ px: 1, minHeight: 40, borderBottom: `1px solid ${theme.palette.divider}` })}
                    >
                        {chartTabs.map((tab) => (
                            <Tab
                                key={tab.key}
                                value={tab.key}
                                label={tab.label}
                                sx={{ minHeight: 40, textTransform: "none", fontSize: 13 }}
                            />
                        ))}
                    </Tabs>
                    <Box sx={{ p: 1.5, flex: 1, minHeight: 0 }}>
                        <Box
                            sx={(theme) => ({
                                height: "100%",
                                minHeight: 0,
                                borderRadius: 1,
                                border: `1px dashed ${theme.palette.divider}`,
                                overflowY: "scroll",
                                backgroundColor:
                                    theme.palette.mode === "dark"
                                        ? alpha(theme.palette.common.white, 0.02)
                                        : alpha(theme.palette.primary.main, 0.04),
                            })}
                        >
                            {activeChartTab === "yxtime" && (
                                <Box sx={{ width: "100%", height: "100%", minHeight: 0 }}>
                                    <Y_XTimeChart
                                        times={chartData.times}
                                        actual={chartData.actual}
                                        predict={chartData.predict}
                                        dataset={chartData.dataset}
                                        y_tag={row?.y_tag ?? "Y"}
                                    />
                                </Box>
                            )}
                            {activeChartTab === "yx" && (
                                <Box sx={{ width: "100%", height: "100%", minHeight: 0 }}>
                                    <YChart
                                        times={chartData.times}
                                        actual={chartData.actual}
                                        predict={chartData.predict}
                                        dataset={chartData.dataset}
                                        y_tag={row?.y_tag ?? "Y"}
                                    />
                                </Box>
                            )}
                        </Box>
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
                <Button variant="text" onClick={onClose}>關閉</Button>
                <Button
                    variant="contained"
                    disabled={!row || row.enabled}
                    onClick={() => {
                        if (row) onEnable(row);
                    }}
                >
                    啟用
                </Button>
            </Box>

            <XTagsDialog
                open={isXTagsOpen}
                onClose={() => setIsXTagsOpen(false)}
                algorithmName={row?.algorithm ?? "-"}
                xTags={row?.x_tags_list ?? []}
            />
        </Dialog>
    );
};

export default AlgorithmResultDialog;
