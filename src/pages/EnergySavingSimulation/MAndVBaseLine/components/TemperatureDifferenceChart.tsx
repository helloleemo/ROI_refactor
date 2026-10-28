import { Chart, type ChartOptions } from "@highcharts/react";
import { ScatterSeries } from "@highcharts/react/series/Scatter";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { getHighchartsThemeOptions } from "@/pages/Models/components/charts/helpers/highchartsTheme";

interface TemperatureDifferenceChartProps {
    points: { rt: number; dt: number }[];
    title: string;
}

const TemperatureDifferenceChart = ({ points, title }: TemperatureDifferenceChartProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const themeOptions = getHighchartsThemeOptions(theme);
    const xAxis = Array.isArray(themeOptions.xAxis) ? themeOptions.xAxis[0] : themeOptions.xAxis;
    const yAxis = Array.isArray(themeOptions.yAxis) ? themeOptions.yAxis[0] : themeOptions.yAxis;
    const data = points.filter(point => Number.isFinite(point.rt) && Number.isFinite(point.dt))
        .map(point => ({ x: point.rt, y: point.dt }));
    const options: ChartOptions = {
        ...themeOptions,
        chart: { ...themeOptions.chart, type: "scatter", height: 360, animation: false },
        title: { text: title },
        credits: { enabled: false },
        legend: { enabled: false },
        xAxis: { ...xAxis, title: { ...xAxis?.title, text: "RT" }, gridLineWidth: 1 },
        yAxis: { ...yAxis, title: { ...yAxis?.title, text: "\u0394T (\u00b0C)" } },
        tooltip: {
            ...themeOptions.tooltip,
            headerFormat: "",
            pointFormat: "RT: <b>{point.x:,.1f}</b><br/>\u0394T: <b>{point.y:.1f} \u00b0C</b>",
        },
        plotOptions: { scatter: { marker: { radius: 4, symbol: "circle" } } },
    };

    return (
        <Box sx={{ width: "100%", minWidth: 0 }}>
            {data.length ? (
                <Chart options={options} containerProps={{ style: { width: "100%" } }}>
                    <ScatterSeries name={title} data={data} color={theme.palette.chart.scatterDot} />
                </Chart>
            ) : (
                <Box sx={{ height: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <Typography variant="subtitle2">{title}</Typography>
                    <Typography sx={{ fontSize: 14, color: "text.secondary" }}>{t("common.no_data")}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default TemperatureDifferenceChart;