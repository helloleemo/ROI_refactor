import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart, type ChartOptions } from "@highcharts/react";
import { ScatterSeries } from "@highcharts/react/series/Scatter";
import { LineSeries } from "@highcharts/react/series/Line";
import { useTranslation } from "react-i18next";
import type { BaselineModelResults } from "@/api/types/mAndVBaseline";
import { getHighchartsThemeOptions } from "@/pages/Models/components/charts/helpers/highchartsTheme";

interface ScartterChartProps {
    results: BaselineModelResults | null | undefined;
}

const ScartterChart = ({ results }: ScartterChartProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const themeOptions = getHighchartsThemeOptions(theme);
    const xAxisOptions = Array.isArray(themeOptions.xAxis) ? themeOptions.xAxis[0] : themeOptions.xAxis;
    const yAxisOptions = Array.isArray(themeOptions.yAxis) ? themeOptions.yAxis[0] : themeOptions.yAxis;
    const points = (results?.scatter_points ?? []).filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
    const xLabel = results?.is_single_var
        ? t(`mAndVBaseline.var_${results.x1_name}`, { defaultValue: results.x1_name })
        : t("mAndVBaseline.chart_predicted");
    const yLabel = results ? t(`mAndVBaseline.var_${results.y_name}`, { defaultValue: results.y_name }) : "";
    const options: ChartOptions = {
        ...themeOptions,
        chart: { ...themeOptions.chart, type: "scatter", animation: false, height: 360 },
        title: { text: undefined },
        credits: { enabled: false },
        xAxis: { ...xAxisOptions, title: { ...xAxisOptions?.title, text: xLabel }, gridLineWidth: 1 },
        yAxis: { ...yAxisOptions, title: { ...yAxisOptions?.title, text: `${yLabel} (${t("mAndVBaseline.chart_actual")})` } },
        legend: { ...themeOptions.legend, enabled: true, verticalAlign: "top", align: "center" },
        tooltip: {
            ...themeOptions.tooltip,
            headerFormat: "{point.custom.timestamp}<br/>",
            pointFormat: `${xLabel}: <b>{point.x:,.2f}</b><br/>${t("mAndVBaseline.chart_actual")}: <b>{point.y:,.2f}</b>`,
        },
        plotOptions: {
            scatter: { marker: { radius: 2, symbol: "circle" } },
            line: { marker: { enabled: false }, lineWidth: 2, enableMouseTracking: false },
        },
    };

    return (
        <Box sx={{ width: "100%", minWidth: 0 }}>
            {points.length ? (
                <Chart options={options} containerProps={{ style: { width: "100%" } }}>
                    <ScatterSeries
                        name={t("mAndVBaseline.chart_actual")}
                        data={points.map((point) => ({ x: point.x, y: point.y, custom: { timestamp: point.timestamp ?? "" } }))}
                        color={theme.palette.chart.scatterDot}
                    />
                    <LineSeries
                        name={t(results?.is_single_var ? "mAndVBaseline.chart_fitted_line" : "mAndVBaseline.chart_perfect_fit")}
                        data={(results?.line_points ?? []).filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y))
                            .map((point): [number, number | null] => [point.x, point.y])}
                        color={theme.palette.chart.perfectFitLine}
                    />
                </Chart>
            ) : (
                <Box sx={{ height: 360, display: "grid", placeItems: "center" }}>
                    <Typography sx={{ fontSize: 14, color: "grey.400" }}>{t("common.no_data")}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default ScartterChart;
