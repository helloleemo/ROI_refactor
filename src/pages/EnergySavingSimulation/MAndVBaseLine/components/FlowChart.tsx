import { Chart, type ChartOptions } from "@highcharts/react";
import { ScatterSeries } from "@highcharts/react/series/Scatter";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { getHighchartsThemeOptions } from "@/pages/Models/components/charts/helpers/highchartsTheme";
import XAxisReference from "./XAxisReference";

interface FlowChartProps {
    points: { x: number; y: number }[];
    xTitle: string;
    yTitle: string;
}

export const FlowChart = ({ points, xTitle, yTitle }: FlowChartProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const title = t("mAndVBaseline.charts.flow_chart");
    const themeOptions = getHighchartsThemeOptions(theme);
    const xAxis = Array.isArray(themeOptions.xAxis) ? themeOptions.xAxis[0] : themeOptions.xAxis;
    const yAxis = Array.isArray(themeOptions.yAxis) ? themeOptions.yAxis[0] : themeOptions.yAxis;
    const data = points.filter(point => Number.isFinite(point.x) && Number.isFinite(point.y))
        .map(point => ({ x: point.x, y: point.y }));
    const options: ChartOptions = {
        ...themeOptions,
        chart: { ...themeOptions.chart, type: "scatter", height: 360, animation: false },
        title: { text: title },
        credits: { enabled: false },
        legend: { enabled: false },
        xAxis: { ...xAxis, title: { ...xAxis?.title, text: xTitle }, gridLineWidth: 1 },
        yAxis: { ...yAxis, title: { ...yAxis?.title, text: yTitle } },
        tooltip: {
            ...themeOptions.tooltip,
            headerFormat: "",
            pointFormat: `${xTitle}: <b>{point.x:,.1f}</b><br/>${yTitle}: <b>{point.y:,.1f}</b>`,
        },
        plotOptions: { scatter: { marker: { radius: 4, symbol: "circle" } } },
    };

    return (
        <Box sx={{ width: "100%", minWidth: 0 }}>
            {data.length ? (
                <>
                    <Chart options={options} containerProps={{ style: { width: "100%" } }}>
                        <ScatterSeries name={yTitle} data={data} color={theme.palette.chart.scatterDot} />
                    </Chart>
                    <XAxisReference info={t("mAndVBaseline.charts.x_flow")} />

                </>
            ) : (
                <Box sx={{ height: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <Typography variant="subtitle2">{title}</Typography>
                    <Typography sx={{ fontSize: 14, color: "text.secondary" }}>{t("common.no_data")}</Typography>
                </Box>
            )}
        </Box>
    );
};