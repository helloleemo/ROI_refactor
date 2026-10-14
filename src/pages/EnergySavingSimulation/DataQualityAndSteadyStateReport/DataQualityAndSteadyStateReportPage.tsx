import SectionLayout from "@/components/gridLayout/SectionLayout";
import { Box, Button, Card, CardContent, Chip, Collapse, Divider, Paper, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TitleText from "@/components/TitleText";
import { useTranslation } from "react-i18next";
import { useState, type ReactNode } from "react";
import { PieChart } from "./components/PieChart";

interface ReportSectionProps {
    title: string;
    children: ReactNode;
    action?: ReactNode;
}

const ReportSection = ({ title, children, action }: ReportSectionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Paper
            variant="outlined"
            sx={{
                borderRadius: 1.5,
                borderColor: "divider",
                backgroundColor: "background.paper",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
                minWidth: 0,
                flex: isOpen ? "1 1 0%" : "0 0 auto",
                transition: "flex 225ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
        >
            <Button
                fullWidth
                onClick={() => setIsOpen((previous) => !previous)}
                color="inherit"
                aria-expanded={isOpen}
                sx={{ px: 1, py: 1, minHeight: 40, justifyContent: "space-between", textTransform: "none", borderRadius: 0 }}
            >
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary", lineHeight: 1.4, textAlign: "left" }}>
                    {title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
                    {action}
                    {isOpen ? <ExpandLessIcon sx={{ fontSize: 20 }} /> : <ExpandMoreIcon sx={{ fontSize: 20 }} />}
                </Box>
            </Button>
            <Collapse
                in={isOpen}
                timeout="auto"
                unmountOnExit
                sx={{
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    "& .MuiCollapse-wrapper": { minHeight: 0 },
                    "& .MuiCollapse-wrapperInner": { minHeight: 0, display: "flex", flexDirection: "column" },
                }}
            >
                <Divider />
                <Box sx={{ p: 1.5, flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", overscrollBehavior: "contain" }}>
                    {children}
                </Box>
            </Collapse>
        </Paper>
    );
};

const mockData = {
    "success": true,
    "message": "Data calculation and M&V analysis completed successfully",
    "status_code": "200",
    "data": {
        "data_quality": {
            "total_raw_rows": 3568,
            "running_rows": 3568,
            "final_valid_len": 0,
            "yield_rate": 0,
            "nan_dropped": 0,
            "outlier_dropped": 3568
        },
        "system_kpis": {
            "total_kwh": 1784,
            "total_rth": 0,
            "avg_kw_rt": 0,
            "avg_plr": 0,
            "avg_chw_dt": 0,
            "sys_design_chw_dt": 5,
            "avg_cw_dt": null,
            "sys_design_cw_dt": 5
        },
        "energy_breakdown": [
            {
                "category": "一次側冰水泵 (CHP)",
                "total_kwh": 892,
                "avg_kw_rt": 0,
                "percentage": 50
            },
            {
                "category": "二次側冰水泵 (ZP)",
                "total_kwh": 892,
                "avg_kw_rt": 0,
                "percentage": 50
            }
        ],
        "pie_chart": {
            "labels": [
                "一次側冰水泵 (CHP)",
                "二次側冰水泵 (ZP)"
            ],
            "values": [
                892,
                892
            ]
        },
        "calculated_at": "2026-10-14 01:35:25"
    }
}

const DataQualityAndSteadyStateReportPage = () => {
    const { t, i18n } = useTranslation();
    const reportData = mockData.data;
    const text = (key: string) =>
        t(`data_quality_and_steady_state_report.${key}`);
    const formatNumber = (value: number | null) => value === null
        ? text("no_data")
        : new Intl.NumberFormat(i18n.resolvedLanguage, { maximumFractionDigits: 2 }).format(value);
    const qualityMetrics = [
        { key: "total_raw_rows", label: t("data_quality_and_steady_state_report.total_raw_rows"), value: reportData.data_quality.total_raw_rows, unit: "" },
        { key: "running_rows", label: t("data_quality_and_steady_state_report.running_rows"), value: reportData.data_quality.running_rows, unit: "" },
        { key: "final_valid_len", label: t("data_quality_and_steady_state_report.final_valid_len"), value: reportData.data_quality.final_valid_len, unit: "" },
        { key: "yield_rate", label: t("data_quality_and_steady_state_report.yield_rate"), value: reportData.data_quality.yield_rate, unit: "%" },
        { key: "nan_dropped", label: t("data_quality_and_steady_state_report.nan_dropped"), value: reportData.data_quality.nan_dropped, unit: "" },
        { key: "outlier_dropped", label: t("data_quality_and_steady_state_report.outlier_dropped"), value: reportData.data_quality.outlier_dropped, unit: "" },
    ];
    const systemMetrics = [
        { key: "total_kwh", label: t("data_quality_and_steady_state_report.total_kwh"), value: reportData.system_kpis.total_kwh, unit: "kWh" },
        { key: "total_rth", label: t("data_quality_and_steady_state_report.total_rth"), value: reportData.system_kpis.total_rth, unit: "RTh" },
        { key: "avg_kw_rt", label: t("data_quality_and_steady_state_report.avg_kw_rt"), value: reportData.system_kpis.avg_kw_rt, unit: "kW/RT" },
        { key: "avg_plr", label: t("data_quality_and_steady_state_report.avg_plr"), value: reportData.system_kpis.avg_plr, unit: "" },
        { key: "avg_chw_dt", label: t("data_quality_and_steady_state_report.avg_chw_dt"), value: reportData.system_kpis.avg_chw_dt, unit: "°C" },
        { key: "sys_design_chw_dt", label: t("data_quality_and_steady_state_report.sys_design_chw_dt"), value: reportData.system_kpis.sys_design_chw_dt, unit: "°C" },
        { key: "avg_cw_dt", label: t("data_quality_and_steady_state_report.avg_cw_dt"), value: reportData.system_kpis.avg_cw_dt, unit: "°C" },
        { key: "sys_design_cw_dt", label: t("data_quality_and_steady_state_report.sys_design_cw_dt"), value: reportData.system_kpis.sys_design_cw_dt, unit: "°C" },
    ];
    const pieData: Array<[string, number]> = reportData.pie_chart.labels.map((label, index) =>
        [label, reportData.pie_chart.values[index] ?? 0]);
    const energyBreakdownRows = reportData.energy_breakdown.map((item, index) => ({
        id: index,
        category: item.category,
        total_kwh: `${formatNumber(item.total_kwh)} kWh`,
        avg_kw_rt: `${formatNumber(item.avg_kw_rt)} kW/RT`,
        percentage: `${formatNumber(item.percentage)}%`,
    }));
    const energyBreakdownColumns: GridColDef[] = [
        { field: "category", headerName: text("equipment"), flex: 1.5, minWidth: 160 },
        { field: "total_kwh", headerName: t("data_quality_and_steady_state_report.total_kwh"), flex: 1, minWidth: 130 },
        { field: "avg_kw_rt", headerName: t("data_quality_and_steady_state_report.avg_kw_rt"), flex: 1, minWidth: 130 },
        { field: "percentage", headerName: t("data_quality_and_steady_state_report.percentage"), flex: 0.8, minWidth: 110 },
    ];
    const cardSx = { height: "100%", borderRadius: 2, boxShadow: "none" };
    const renderMetrics = (metrics: typeof systemMetrics) => (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 2 }}>
            {metrics.map((metric) => (
                <Card key={metric.key} variant="outlined" sx={cardSx}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {metric.label}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, overflowWrap: "anywhere" }}>
                                {formatNumber(metric.value)}
                            </Typography>
                            {metric.value !== null && <Typography variant="body2" color="text.secondary">{metric.unit}</Typography>}
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );

    return (
        <SectionLayout sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
                mb: 2
            }}>
                <TitleText title={t("data_quality_and_steady_state_report.title")} />
                <Typography variant="body2" color="text.secondary">
                    {text("calculated_at")}: {reportData.calculated_at}
                </Typography>
            </Box>
            <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden", pr: 1, display: "flex", flexDirection: "column", gap: 0.75 }}>
                <ReportSection
                    title={text("data_quality")}
                    action={reportData.data_quality.final_valid_len === 0 && (
                        <Chip size="small" color="warning" label={text("no_valid_data")} />
                    )}
                >
                    {renderMetrics(qualityMetrics)}
                </ReportSection>
                <ReportSection title={text("system_kpis")}>
                    {renderMetrics(systemMetrics)}
                </ReportSection>
                <ReportSection title={text("energy_breakdown")}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, minHeight: 360 }}>
                        <DataGrid
                            rows={energyBreakdownRows}
                            columns={energyBreakdownColumns}
                            hideFooter
                            disableRowSelectionOnClick
                            columnHeaderHeight={48}
                            rowHeight={52}
                            sx={{ height: 360, width: "100%", minWidth: 0, flex: 2 }}
                        />
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                            <PieChart title={text("pie_chart")} data={pieData} />
                        </Box>
                    </Box>
                </ReportSection>
            </Box>
        </SectionLayout>
    );
}

export default DataQualityAndSteadyStateReportPage;