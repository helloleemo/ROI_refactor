import { Chart, type ChartOptions } from "@highcharts/react";
import { ScatterSeries } from "@highcharts/react/series/Scatter";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { getHighchartsThemeOptions } from "@/pages/Models/components/charts/helpers/highchartsTheme";

export interface EfficiencyPoint {
    rt: number;
    kw_rt: number;
}

interface EfficiencyPointChartProps {
    points: EfficiencyPoint[];
}

const EfficiencyPointChart = ({ points }: EfficiencyPointChartProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const themeOptions = getHighchartsThemeOptions(theme);
    const xAxis = Array.isArray(themeOptions.xAxis) ? themeOptions.xAxis[0] : themeOptions.xAxis;
    const yAxis = Array.isArray(themeOptions.yAxis) ? themeOptions.yAxis[0] : themeOptions.yAxis;
    const validPoints = points.filter(point => Number.isFinite(point.rt) && Number.isFinite(point.kw_rt));
    const options: ChartOptions = {
        ...themeOptions,
        chart: { ...themeOptions.chart, type: "scatter", height: 360, animation: false },
        title: { text: t("mAndVBaseline.charts.efficiency_points") },
        credits: { enabled: false },
        legend: { enabled: false },
        xAxis: { ...xAxis, title: { ...xAxis?.title, text: "RT" }, gridLineWidth: 1 },
        yAxis: { ...yAxis, title: { ...yAxis?.title, text: "kW/RT" } },
        tooltip: {
            ...themeOptions.tooltip,
            headerFormat: "",
            pointFormat: "RT: <b>{point.x:,.1f}</b><br/>kW/RT: <b>{point.y:.3f}</b>",
        },
        plotOptions: { scatter: { marker: { radius: 4, symbol: "circle" } } },
    };

    return (
        <Box sx={{ width: "100%", minWidth: 0 }}>
            {validPoints.length ? (
                <Chart options={options} containerProps={{ style: { width: "100%" } }}>
                    <ScatterSeries
                        name="kW/RT"
                        color={theme.palette.chart.scatterDot}
                        data={validPoints.map(point => ({ x: point.rt, y: point.kw_rt }))}
                    />
                </Chart>
            ) : (
                <Box sx={{ height: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <Typography variant="subtitle2">
                        {t("mAndVBaseline.charts.efficiency_points")}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                        {t("common.no_data")}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default EfficiencyPointChart;