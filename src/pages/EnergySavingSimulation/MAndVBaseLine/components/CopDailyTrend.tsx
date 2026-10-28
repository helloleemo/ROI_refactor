import { Chart, type ChartOptions } from "@highcharts/react";
import { LineSeries } from "@highcharts/react/series/Line";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { DeepDiveChillerResponse } from "@/api/types/mAndVBaseline";
import { getHighchartsThemeOptions } from "@/pages/Models/components/charts/helpers/highchartsTheme";

interface CopDailyTrendProps {
    points: DeepDiveChillerResponse["cop_daily_trend"];
}

const CopDailyTrend = ({ points }: CopDailyTrendProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const themeOptions = getHighchartsThemeOptions(theme);
    const xAxis = Array.isArray(themeOptions.xAxis) ? themeOptions.xAxis[0] : themeOptions.xAxis;
    const yAxis = Array.isArray(themeOptions.yAxis) ? themeOptions.yAxis[0] : themeOptions.yAxis;
    const data = points
        .map(point => ({ x: Date.parse(`${point.date}T00:00:00Z`), y: point.cop }))
        .filter(point => Number.isFinite(point.x) && Number.isFinite(point.y))
        .sort((first, second) => first.x - second.x);
    const options: ChartOptions = {
        ...themeOptions,
        chart: { ...themeOptions.chart, type: "line", height: 360, animation: false },
        time: { timezone: "UTC" },
        title: { text: t("mAndVBaseline.charts.cop_daily_trend") },
        credits: { enabled: false },
        legend: { enabled: false },
        xAxis: {
            ...xAxis,
            type: "datetime",
            title: { text: undefined },
            labels: { ...xAxis?.labels, format: "{value:%Y-%m-%d}" },
            minTickInterval: 24 * 60 * 60 * 1000,
            gridLineWidth: 1,
        },
        yAxis: { ...yAxis, title: { ...yAxis?.title, text: "COP" } },
        tooltip: {
            ...themeOptions.tooltip,
            headerFormat: "{point.x:%Y-%m-%d}<br/>",
            pointFormat: "COP: <b>{point.y:.2f}</b>",
        },
        plotOptions: {
            line: { lineWidth: 2, marker: { enabled: true, radius: 4, symbol: "circle" } },
        },
    };

    return (
        <Box sx={{ width: "100%", minWidth: 0 }}>
            {data.length ? (
                <Chart options={options} containerProps={{ style: { width: "100%" } }}>
                    <LineSeries name="COP" color={theme.palette.chart.perfectFitLine} data={data} />
                </Chart>
            ) : (
                <Box sx={{ height: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <Typography variant="subtitle2">
                        {t("mAndVBaseline.charts.cop_daily_trend")}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                        {t("common.no_data")}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default CopDailyTrend;