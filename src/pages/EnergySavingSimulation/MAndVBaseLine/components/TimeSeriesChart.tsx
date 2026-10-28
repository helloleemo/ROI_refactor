import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart, type ChartOptions } from "@highcharts/react";
import { LineSeries } from "@highcharts/react/series/Line";
import { useTranslation } from "react-i18next";
import type { BaselineModelResults } from "@/api/types/mAndVBaseline";
import { getHighchartsThemeOptions } from "@/pages/Models/components/charts/helpers/highchartsTheme";

interface TimeSeriesChartProps {
    results: BaselineModelResults | null | undefined;
}

const TimeSeriesChart = ({ results }: TimeSeriesChartProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const themeOptions = getHighchartsThemeOptions(theme);
    const xAxisOptions = Array.isArray(themeOptions.xAxis) ? themeOptions.xAxis[0] : themeOptions.xAxis;
    const yAxisOptions = Array.isArray(themeOptions.yAxis) ? themeOptions.yAxis[0] : themeOptions.yAxis;
    const points = results?.time_series_points ?? [];
    const hasData = points.some((point) => Number.isFinite(point.y) || Number.isFinite(point.y_pred));
    const options: ChartOptions = {
        ...themeOptions,
        chart: { ...themeOptions.chart, type: "line", animation: false, height: 360 },
        title: { text: undefined },
        credits: { enabled: false },
        xAxis: {
            ...xAxisOptions,
            categories: points.map((point) => point.timestamp ?? String(point.x)),
            title: { ...xAxisOptions?.title, text: t("mAndVBaseline.chart_time") },
        },
        yAxis: {
            ...yAxisOptions,
            title: {
                ...yAxisOptions?.title,
                text: results ? t(`mAndVBaseline.var_${results.y_name}`, { defaultValue: results.y_name }) : "",
            },
        },
        legend: { ...themeOptions.legend, enabled: true, verticalAlign: "top", align: "center" },
        tooltip: { ...themeOptions.tooltip, shared: true, valueDecimals: 2 },
        plotOptions: { line: { lineWidth: 2, marker: { enabled: false }, connectNulls: false } },
    };

    return (
        <Box sx={{ width: "100%", minWidth: 0 }}>
            {hasData ? (
                <Chart options={options} containerProps={{ style: { width: "100%", height: "360px" } }}>
                    <LineSeries name={t("mAndVBaseline.chart_actual")} data={points.map((point) => Number.isFinite(point.y) ? point.y : null)} />
                    <LineSeries name={t("mAndVBaseline.chart_predicted")} data={points.map((point) => Number.isFinite(point.y_pred) ? point.y_pred : null)} />
                </Chart>
            ) : (
                <Box sx={{ height: 360, display: "grid", placeItems: "center" }}>
                    <Typography color="text.secondary">{t("common.no_data")}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default TimeSeriesChart;