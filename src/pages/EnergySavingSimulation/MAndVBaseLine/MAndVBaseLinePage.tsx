import SectionLayout from "@/components/gridLayout/SectionLayout";
import { Box, Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import CircularProgress from "@mui/material/CircularProgress";
import { showToast, TitleText } from "@/components";
import ReportSection from "@/components/ReportSection";
import { mAndVBaselineService } from "@/api/services/mAndVBaseline";
import type { FilterRequest, MAndVBaseline, TrainRequest } from "@/api/types/mAndVBaseline";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BaselineSettingsDialog from "./components/BaselineSettingsDialog";
import { useOpenDialog } from "@/hooks/index";
import useLoading from "@/hooks/useLoading";
import ParamSettingsDialog from "./components/ParamSettingsDialog";

interface ReportMetric {
    key: string;
    value: number | null | undefined;
    unit: string;
}

const MAndVBaseLinePage = () => {
    const { t, i18n } = useTranslation();
    const [baseline, setBaseline] = useState<MAndVBaseline | null>(null);
    const [filters, setFilters] = useState<Partial<FilterRequest>>();

    const { open, openDialog, closeDialog } = useOpenDialog({
        setting: false,
        params: false,
    });

    const {
        isLoading,
        startLoading,
        stopLoading,
        error,
        setError,
        isSaving,
        setIsSaving
    } = useLoading();


    const getBaseline = async () => {
        try {
            const data = await mAndVBaselineService.get();
            setBaseline(data);
        } catch (error) {
            console.error(error);
        }
    }

    const updateFilter = async ({
        hb_threshold,
        eb_threshold,
        balance_mode,
    }: {
        hb_threshold: number;
        eb_threshold: number;
        balance_mode: string;
    }) => {
        try {
            const data = await mAndVBaselineService.filter({
                balance_mode: balance_mode,
                hb_threshold: hb_threshold,
                eb_threshold: eb_threshold
            })
            setBaseline(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBaseline();
    }, [])

    const formatNumber = (value: number | null | undefined) => {
        if (value == null || !Number.isFinite(value)) return "-";
        return new Intl.NumberFormat(i18n.resolvedLanguage, { maximumFractionDigits: 2 }).format(value);
    };

    const handleOpenSettings = () => {
        if (!baseline) return;
        setError(false);
        openDialog("setting");
    };

    const handldOpenParamsSettings = () => {
        setError(false);
        openDialog("params");
    }

    const handleSaveSettings = async (filterRequest: FilterRequest) => {
        if (!baseline) return;

        setIsSaving(true);
        setError(false);
        console.log("filterRequest", filterRequest);

        try {
            const data = await mAndVBaselineService.filter(filterRequest);
            setBaseline(data);
            closeDialog("setting");
        } catch (error) {
            setError(true);
            showToast(error instanceof Error ? error.message : t("mAndVBaseline.save_failed"), "error");
        } finally {
            setIsSaving(false);
        }
        // setIsSaving(false);

    };

    const handleSaveParams = async (params: TrainRequest) => {
        setIsSaving(true);
        setError(false);
        try {
            const data = await mAndVBaselineService.train(params);
            setBaseline(data);
            closeDialog("params");
        } catch (error) {
            setError(true);
            showToast(error instanceof Error ? error.message : t("mAndVBaseline.save_failed"), "error");
        } finally {
            setIsSaving(false);
        }
    };

    const qualityMetrics: ReportMetric[] = [
        { key: "total_raw_rows", value: baseline?.data_quality.total_raw_rows, unit: "" },
        { key: "running_rows", value: baseline?.data_quality.running_rows, unit: "" },
        { key: "final_valid_len", value: baseline?.data_quality.final_valid_len, unit: "" },
        { key: "yield_rate", value: baseline?.data_quality.yield_rate, unit: "%" },
        { key: "nan_dropped", value: baseline?.data_quality.nan_dropped, unit: "" },
        { key: "outlier_dropped", value: baseline?.data_quality.outlier_dropped, unit: "" },
    ];

    const systemMetrics: ReportMetric[] = [
        { key: "total_kwh", value: baseline?.system_kpis.total_kwh, unit: "kWh" },
        { key: "total_rth", value: baseline?.system_kpis.total_rth, unit: "RTh" },
        { key: "avg_kw_rt", value: baseline?.system_kpis.avg_kw_rt, unit: "kW/RT" },
        { key: "avg_plr", value: baseline?.system_kpis.avg_plr, unit: "" },
        { key: "avg_chw_dt", value: baseline?.system_kpis.avg_chw_dt, unit: "°C" },
        { key: "sys_design_chw_dt", value: baseline?.system_kpis.sys_design_chw_dt, unit: "°C" },
        { key: "avg_cw_dt", value: baseline?.system_kpis.avg_cw_dt, unit: "°C" },
        { key: "sys_design_cw_dt", value: baseline?.system_kpis.sys_design_cw_dt, unit: "°C" },
    ];

    const renderMetrics = (metrics: ReportMetric[]) => (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 2 }}>
            {metrics.map((metric) => (
                <Card key={metric.key} variant="outlined" sx={{ height: "100%", borderRadius: 2, boxShadow: "none" }}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {t(`data_quality_and_steady_state_report.${metric.key}`)}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, overflowWrap: "anywhere" }}>
                                {formatNumber(metric.value)}
                            </Typography>
                            {metric.unit && <Typography variant="body2" color="text.secondary">{metric.unit}</Typography>}
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
                <Box sx={{ minWidth: 0 }}>
                    <TitleText title={t("mAndVBaseline.title")} />
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }} noWrap>
                        {t("mAndVBaseline.description")}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
                    {/*  */}
                </Box>

            </Box>
            <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden", pr: 1, display: "flex", flexDirection: "column", gap: 0.75 }}>


                {/* 1 -  data_quality_and_steady_state_report*/}
                <ReportSection title={t("data_quality_and_steady_state_report.title")}>
                    <Button
                        onClick={handleOpenSettings}
                        variant="outlined"
                        size="small"
                        disabled={!baseline}
                    >

                        {t("mAndVBaseline.enable_settings")}
                    </Button>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                                {t("data_quality_and_steady_state_report.data_quality")}
                            </Typography>
                            {renderMetrics(qualityMetrics)}
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                                {t("data_quality_and_steady_state_report.system_kpis")}
                            </Typography>
                            {renderMetrics(systemMetrics)}
                        </Box>
                    </Box>
                </ReportSection>


                {/* 2 -  ipmvp_modeling*/}
                <ReportSection title={t("mAndVBaseline.ipmvp_modeling")}>
                    <Button
                        // onClick={handleRefresh}
                        variant="outlined"
                        size="small"
                        onClick={handldOpenParamsSettings}
                    // disabled={isLoading("loadReport")}
                    // startIcon={isLoading("loadReport") ? <CircularProgress size={16} color="inherit" /> : undefined}
                    >
                        {t("mAndVBaseline.param_settings")}
                    </Button>
                </ReportSection>
                <ReportSection title={t("mAndVBaseline.deep_dive")}>
                    <Button
                        // onClick={handleRefresh}
                        variant="outlined"
                        size="small"
                    // disabled={isLoading("loadReport")}
                    // startIcon={isLoading("loadReport") ? <CircularProgress size={16} color="inherit" /> : undefined}
                    >

                        {t("mAndVBaseline.enable_settings")}
                    </Button>
                </ReportSection>
            </Box>
            <BaselineSettingsDialog
                open={open.setting}
                baseline={baseline}
                isSaving={isSaving}
                error={error}
                onClose={() => closeDialog("setting")}
                onSave={handleSaveSettings}
            />

            <ParamSettingsDialog
                open={open.params}
                baseline={baseline}
                isSaving={isSaving}
                error={error}
                onSave={handleSaveParams}
                onClose={() => closeDialog("params")}
            />
        </SectionLayout>
    );
};

export default MAndVBaseLinePage;