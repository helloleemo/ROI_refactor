import type { MAndVBaseline } from "@/api/types/mAndVBaseline";

export interface ReportMetric {
    key: string;
    value: number | null | undefined;
    unit: string;
}

export const getReportMetrics = (baseline: MAndVBaseline | null) => {
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
        { key: "avg_chw_dt", value: baseline?.system_kpis.avg_chw_dt, unit: "\u00b0C" },
        { key: "sys_design_chw_dt", value: baseline?.system_kpis.sys_design_chw_dt, unit: "\u00b0C" },
        { key: "avg_cw_dt", value: baseline?.system_kpis.avg_cw_dt, unit: "\u00b0C" },
        { key: "sys_design_cw_dt", value: baseline?.system_kpis.sys_design_cw_dt, unit: "\u00b0C" },
    ];

    return { qualityMetrics, systemMetrics };
};