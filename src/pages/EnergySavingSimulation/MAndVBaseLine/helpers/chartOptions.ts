import type { TFunction } from "i18next";

export const getChartOptions = (t: TFunction) => ({
    chartChillerOptions: [
        { key: "efficiency_points", label: t("mAndVBaseline.charts.efficiency_points") },
        { key: "cop_daily_trend", label: t("mAndVBaseline.charts.cop_daily_trend") },
        { key: "chw_dt_points", label: t("mAndVBaseline.charts.chw_dt_points") },
        { key: "cw_dt_points", label: t("mAndVBaseline.charts.cw_dt_points") },
    ] as const,

    chartPumpOptions: [
        { key: "rt_chart", label: t("mAndVBaseline.charts.rt_chart") },
        { key: "flow_chart", label: t("mAndVBaseline.charts.flow_chart") },
        { key: "dt_chart", label: t("mAndVBaseline.charts.dt_chart") },
    ] as const,

    chartTowerOptions: [
        { key: "approach_vs_heat", label: t("mAndVBaseline.charts.approach_vs_heat") },
        { key: "plr_vs_approach", label: t("mAndVBaseline.charts.plr_vs_approach") },
        { key: "power_vs_approach", label: t("mAndVBaseline.charts.power_vs_approach") },
    ] as const,
});