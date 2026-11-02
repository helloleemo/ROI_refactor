import { Chart, type ChartOptions } from "@highcharts/react";
import { ScatterSeries } from "@highcharts/react/series/Scatter";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { getHighchartsThemeOptions } from "@/pages/Models/components/charts/helpers/highchartsTheme";
import XAxisReference from "./XAxisReference";

interface DtChartProps {
    points: { x: number; y: number }[];
    xTitle: string;
    yTitle: string;
    rated_dt?: number;
}

export const DtChart = ({ points, xTitle, yTitle, rated_dt }: DtChartProps) => {

    const referenceDt =
        typeof rated_dt === "number" && Number.isFinite(rated_dt)
            ? rated_dt
            : undefined;


    const theme = useTheme();
    const { t } = useTranslation();
    const title = t("mAndVBaseline.charts.dt_chart");
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
        xAxis: {
            ...xAxis,
            title: {
                ...xAxis?.title, text: xTitle
            },
            gridLineWidth: 1,
            softMin: referenceDt,
            softMax: referenceDt,
            plotLines: referenceDt !== undefined
                ? [{
                    id: "rated-dt",
                    value: referenceDt,
                    color: theme.palette.error.main,
                    width: 2,
                    dashStyle: "Dash",
                    zIndex: 5,
                    label: {
                        text: `${t("mAndVBaseline.charts.rated_dt")}: ${referenceDt} \u00b0C`,
                        rotation: 90,
                        align: "left",
                        x: -20,
                        y: 16,
                        style: {
                            color: theme.palette.error.main,
                            fontSize: "12px",
                            fontWeight: "bold",
                        },
                    },
                }]
                : [],

        },
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
                    <XAxisReference info={t("mAndVBaseline.charts.x_dt")} />
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