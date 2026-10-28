import SectionLayout from "@/components/gridLayout/SectionLayout";
import EfficiencyPointChart from "./components/EfficiencyPoint";
import CopDailyTrend from "./components/CopDailyTrend";
import TemperatureDifferenceChart from "./components/TemperatureDifferenceChart";
// import CheckIcon from "@mui/icons-material/Check";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Chip, CircularProgress, MenuItem, TextField } from "@mui/material";
import MetricCards from "@/components/MetricCards";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import CircularProgress from "@mui/material/CircularProgress";
import { showToast, Tabs, TitleText } from "@/components";
import ReportSection from "@/components/ReportSection";
import { mAndVBaselineService } from "@/api/services/mAndVBaseline";
import type { FilterRequest, MAndVBaseline, TrainRequest } from "@/api/types/mAndVBaseline";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BaselineSettingsDialog from "./components/BaselineSettingsDialog";
import { useOpenDialog } from "@/hooks/index";
import useLoading from "@/hooks/useLoading";
import ParamSettingsDialog from "./components/ParamSettingsDialog";
import ScartterChart from "./components/ScartterChart";
import { getReportMetrics, type ReportMetric } from "./helpers/reportMetrics";

const MAndVBaseLinePage = () => {
    const { t, i18n } = useTranslation();
    const [baseline, setBaseline] = useState<MAndVBaseline | null>(null);

    const [tabs, setTabs] = useState<string[]>([])
    const [selectedTabValue, setSelectedTabValue] = useState("chillers");

    const [equipmentNames, setEquipmentNames] = useState<string[]>([]);
    const [selectedEquipmentName, setSelectedEquipmentName] = useState("");

    const [chartData, setChartData] = useState<Record<string, any[]>>({});
    const [chartInfo, setChartInfo] = useState<Record<string, any>>({})
    const [visibleCharts, setVisibleCharts] = useState({
        // chiller
        efficiency_points: true,
        cop_daily_trend: true,
        chw_dt_points: true,
        cw_dt_points: true,

        // pump
        rt_chart: true,
        flow_chart: true,
        dt_chart: true,
    });

    // chiller
    const chartChillerOptions = [
        { key: "efficiency_points", label: t("mAndVBaseline.charts.efficiency_points") },
        { key: "cop_daily_trend", label: t("mAndVBaseline.charts.cop_daily_trend") },
        { key: "chw_dt_points", label: t("mAndVBaseline.charts.chw_dt_points") },
        { key: "cw_dt_points", label: t("mAndVBaseline.charts.cw_dt_points") },
    ] as const;

    const chartPumpOptions = [
        { key: "rt_chart", label: t("mAndVBaseline.charts.rt_chart") },
        { key: "flow_chart", label: t("mAndVBaseline.charts.flow_chart") },
        { key: "dt_chart", label: t("mAndVBaseline.charts.dt_chart") }
    ] as const;



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

    const loading = {
        paramsLoading: "params",
        settingLoading: "setting",
        qualityLoading: "quality",
        deepDiveLoading: "deepDive"
    }

    const getBaseline = async () => {
        try {
            const data = await mAndVBaselineService.get();
            setBaseline(data);

            const options = data.deep_dive_options ?? {};

            const tabArray = Object.keys(options)
            console.log("tabs", tabArray);
            setTabs(tabArray);


            const initialCategory = tabArray[0] ?? "";
            const names: string[] = Array.isArray(options[initialCategory]) ? options[initialCategory] : [];

            setSelectedTabValue(initialCategory);
            setEquipmentNames(names);
            setSelectedEquipmentName(names[0] ?? "");

        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getBaseline();
    }, [])

    const hasTowerData = baseline?.deep_dive_options.has_tower_data === true;

    useEffect(() => {
        let active = true;
        setChartInfo({});

        const getDeepDiveOptions = async () => {
            // setIsDeepDiveLoading(true);
            startLoading(loading.deepDiveLoading);
            try {
                switch (selectedTabValue) {
                    case "chillers": {
                        if (!selectedEquipmentName) return;
                        const data = await mAndVBaselineService.deepDiveChiller(selectedEquipmentName);
                        if (active) {
                            setChartData({
                                efficiency_points: data.efficiency_points ?? [],
                                cop_daily_trend: data.cop_daily_trend ?? [],
                                chw_dt_points: data.chw_dt_points ?? [],
                                cw_dt_points: data.cw_dt_points ?? []
                            })
                            setChartInfo({
                                chiller_name: selectedEquipmentName,
                                rated_rt: data.rated_rt,
                                rated_dt: data.rated_dt,
                                rated_cw_dt: data.rated_cw_dt,
                            })
                        }
                        break;
                    }
                    case "pumps":
                        if (!selectedEquipmentName) return;
                        const data = await mAndVBaselineService.deepDivePump(selectedEquipmentName);
                        if (active) {
                            setChartData({
                                rt_chart: data.rt_chart.points,
                                flow_chart: data.flow_chart.points,
                                dt_chart: data.dt_chart.points,
                            });
                            setChartInfo({

                            })
                        }

                        break;
                    case "has_tower_data":
                        if (hasTowerData) await mAndVBaselineService.deepDiveTower();
                        break;
                }
            } catch (error) {
                if (active) console.error(error);
            } finally {
                if (active) stopLoading(loading.deepDiveLoading);
            }
        };

        void getDeepDiveOptions();
        return () => { active = false; };
    }, [selectedTabValue, selectedEquipmentName, hasTowerData]);

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
        // console.log("filterRequest", filterRequest);

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
        startLoading(loading.paramsLoading);
        try {
            const data = await mAndVBaselineService.train(params);
            setBaseline(data);
            closeDialog("params");
        } catch (error) {
            setError(true);
            showToast(error instanceof Error ? error.message : t("mAndVBaseline.save_failed"), "error");
        } finally {
            setIsSaving(false);
            stopLoading(loading.paramsLoading);
        }
    };

    const handleCategoryChange = (category: string) => {
        const value = baseline?.deep_dive_options[category];
        const names: string[] = Array.isArray(value) ? value : [];

        setSelectedTabValue(category);
        setEquipmentNames(names);
        setSelectedEquipmentName(names[0] ?? "");
    };

    const handleEquipmentChange = (equipmentName: string) => {
        setSelectedEquipmentName(equipmentName);
    };

    const { qualityMetrics, systemMetrics } = getReportMetrics(baseline);

    const renderMetrics = (metrics: ReportMetric[], startIndex = 0) => (
        <MetricCards
            items={metrics.map((metric) => ({ ...metric, label: t(`data_quality_and_steady_state_report.${metric.key}`) }))}
            locale={i18n.resolvedLanguage}
            startIndex={startIndex}
        />
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
                        disabled={!baseline || isLoading(loading.qualityLoading) || isSaving}
                        startIcon={isLoading(loading.qualityLoading) || isSaving ? <CircularProgress size={16} /> : undefined}
                    >
                        {t("mAndVBaseline.enable_settings")}
                    </Button>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                        {
                            isLoading(loading.qualityLoading) || isSaving ?
                                (
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "320px" }}>
                                        <CircularProgress size={24} color="primary" />
                                    </Box>
                                ) : (
                                    <>
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
                                            {renderMetrics(systemMetrics, qualityMetrics.length)}
                                        </Box>
                                    </>
                                )
                        }

                    </Box>
                </ReportSection>


                {/* 2 -  ipmvp_modeling*/}
                <ReportSection title={t("mAndVBaseline.ipmvp_modeling")}>
                    <Button
                        // onClick={handleRefresh}
                        variant="outlined"
                        size="small"
                        onClick={handldOpenParamsSettings}
                        disabled={isLoading(loading.paramsLoading) || isSaving}
                        startIcon={isLoading(loading.paramsLoading) || isSaving ? <CircularProgress size={16} color="inherit" /> : undefined}
                    >
                        {t("mAndVBaseline.param_settings")}
                    </Button>

                    <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", xl: "repeat(1, minmax(0, 1fr))" }, gap: 2 }}>

                        {
                            isLoading(loading.paramsLoading) || isSaving
                                ? (
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "320px" }}>
                                        <CircularProgress size={24} color="primary" />
                                    </Box>
                                )
                                : <ScartterChart results={baseline?.model_results} />
                        }

                    </Box>

                </ReportSection>


                {/* 3 - Deep Dive */}

                <ReportSection title={t("mAndVBaseline.deep_dive")}>
                    <Tabs
                        onChange={(_, newValue) => handleCategoryChange(newValue)}
                        value={selectedTabValue}
                        items={tabs?.map(tab => ({
                            label: t(`mAndVBaseline.tabs.${tab}`),
                            value: tab
                        }))}
                    />
                    {
                        selectedTabValue === "has_tower_data"
                            ? null
                            : (
                                <Box sx={{ mt: 2, minWidth: 0, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}>

                                    <TextField
                                        size="small"
                                        select
                                        value={selectedEquipmentName}
                                        onChange={(event) => handleEquipmentChange(event.target.value)}
                                        disabled={equipmentNames.length === 0}
                                    >
                                        {equipmentNames.map((name, key) => (
                                            <MenuItem key={`${name}-${key}`} value={name}>{name}</MenuItem>
                                        ))}

                                    </TextField>

                                    {selectedTabValue === "chillers" && (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, minWidth: 0 }}>
                                            {[
                                                { key: "rated_rt", label: t("mAndVBaseline.rated_rt"), unit: "RT" },
                                                { key: "rated_dt", label: t("mAndVBaseline.rated_dt"), unit: "°C" },
                                                { key: "rated_cw_dt", label: t("mAndVBaseline.rated_cw_dt"), unit: "°C" },
                                            ].map(({ key, label, unit }) => {
                                                const value = !isLoading(loading.deepDiveLoading)
                                                    && chartInfo.chiller_name === selectedEquipmentName
                                                    ? chartInfo[key as "rated_rt" | "rated_dt" | "rated_cw_dt"]
                                                    : undefined;
                                                return (
                                                    <Typography key={key} variant="subtitle2" sx={{ overflowWrap: "anywhere" }}>
                                                        {label}: {value == null ? "-" : `${value.toLocaleString(i18n.resolvedLanguage)} ${unit}`}
                                                    </Typography>
                                                );
                                            })}
                                        </Box>
                                    )}
                                    {selectedTabValue === "chillers" && (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, minWidth: 0 }}>
                                            {chartChillerOptions.map(({ key, label }) => (
                                                <Chip
                                                    key={key}
                                                    label={label}
                                                    // icon={visibleCharts[key] ? <CheckIcon /> : <VisibilityOffIcon />}
                                                    color={visibleCharts[key] ? "primary" : "default"}
                                                    variant={visibleCharts[key] ? "filled" : "outlined"}
                                                    aria-pressed={visibleCharts[key]}
                                                    onClick={() => setVisibleCharts(current => ({ ...current, [key]: !current[key] }))}
                                                    sx={{ maxWidth: "100%", cursor: "pointer", height: "auto", minHeight: 32, "& .MuiChip-label": { whiteSpace: "normal", py: 0.5, cursor: "pointer" } }}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    {
                                        selectedTabValue === "pumps" && (
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, minWidth: 0 }}>
                                                {chartPumpOptions.map(({ key, label }) => (
                                                    <Chip
                                                        key={key}
                                                        label={label}
                                                        color={visibleCharts[key] ? "primary" : "default"}
                                                        variant={visibleCharts[key] ? "filled" : "outlined"}
                                                        aria-pressed={visibleCharts[key]}
                                                        onClick={() => setVisibleCharts(current => ({ ...current, [key]: !current[key] }))}
                                                        sx={{ maxWidth: "100%", cursor: "pointer", height: "auto", minHeight: 32, "& .MuiChip-label": { whiteSpace: "normal", py: 0.5, cursor: "pointer" } }}
                                                    />
                                                ))}
                                            </Box>
                                        )
                                    }
                                </Box>
                            )
                    }
                    {selectedTabValue === "chillers" && (
                        <Box sx={{ mt: 2, minWidth: 0 }}>
                            {isLoading(loading.deepDiveLoading) ? (
                                <Box sx={{ height: 360, display: "grid", placeItems: "center" }}>
                                    <CircularProgress size={24} />
                                </Box>
                            ) : (
                                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", xl: "repeat(2, minmax(0, 1fr))" }, gap: 2 }}>
                                    {visibleCharts.efficiency_points && <EfficiencyPointChart points={chartData.efficiency_points ?? []} />}
                                    {visibleCharts.cop_daily_trend && <CopDailyTrend points={chartData.cop_daily_trend ?? []} />}
                                    {visibleCharts.chw_dt_points && (
                                        <TemperatureDifferenceChart
                                            points={chartData.chw_dt_points ?? []}
                                            title={t("mAndVBaseline.charts.chw_dt_points")}
                                        />
                                    )}
                                    {visibleCharts.cw_dt_points && (
                                        <TemperatureDifferenceChart
                                            points={chartData.cw_dt_points ?? []}
                                            title={t("mAndVBaseline.charts.cw_dt_points")}
                                        />
                                    )}
                                </Box>
                            )}
                        </Box>
                    )}

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