import { Chart, type ChartOptions } from "@highcharts/react";
import { ScatterSeries } from "@highcharts/react/series/Scatter";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { getHighchartsThemeOptions } from "@/pages/Models/components/charts/helpers/highchartsTheme";

interface ApproachVsHeatProps {
    points: { x: number; y: number }[];
    design_approach?: number;
}

export const ApproachVsHeat = ({ points, design_approach }: ApproachVsHeatProps) => {
    const referenceApproach = typeof design_approach === "number" && Number.isFinite(design_approach)
        ? design_approach
        : undefined;
    const theme = useTheme();
    const { t } = useTranslation();
    const title = t("mAndVBaseline.charts.approach_vs_heat");
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
        xAxis: { ...xAxis, title: { ...xAxis?.title, text: "Heat" }, gridLineWidth: 1 },
        yAxis: {
            ...yAxis,
            title: { ...yAxis?.title, text: "Approach (\u00b0C)" },
            softMin: referenceApproach,
            softMax: referenceApproach,
            plotLines: referenceApproach !== undefined
                ? [{
                    id: "design-approach",
                    value: referenceApproach,
                    color: theme.palette.error.main,
                    width: 2,
                    dashStyle: "Dash",
                    zIndex: 5,
                    label: {
                        text: `${t("mAndVBaseline.charts.design_approach")}: ${referenceApproach} \u00b0C`,
                        align: "right",
                        x: -6,
                        y: -6,
                        style: { color: theme.palette.error.main },
                    },
                }]
                : [],
        },
        tooltip: {
            ...themeOptions.tooltip,
            headerFormat: "",
            pointFormat: "Heat: <b>{point.x:,.1f}</b><br/>Approach: <b>{point.y:.2f} \u00b0C</b>",
        },
        plotOptions: { scatter: { marker: { radius: 4, symbol: "circle" } } },
    };

    return (
        <Box sx={{ width: "100%", minWidth: 0 }}>
            {data.length ? (
                <Chart options={options} containerProps={{ style: { width: "100%" } }}>
                    <ScatterSeries name="Approach" data={data} color={theme.palette.chart.scatterDot} />
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