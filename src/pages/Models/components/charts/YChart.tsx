import { Box } from "@mui/material";
import { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { Chart, type ChartOptions } from "@highcharts/react";
import { ScatterSeries } from "@highcharts/react/series/Scatter";
import { LineSeries } from "@highcharts/react/series/Line";
import { getHighchartsThemeOptions } from "./helpers/highchartsTheme";

interface Y_XTimeChartProps {
    times: string[];
    actual: number[];
    predict: number[];
    y_tag: string;
    dataset: any | null;
}

const YChart = ({ actual, predict, y_tag }: Y_XTimeChartProps) => {
    const theme = useTheme();
    const themeOptions = getHighchartsThemeOptions(theme);
    const xAxisOptions = Array.isArray(themeOptions.xAxis) ? themeOptions.xAxis[0] : themeOptions.xAxis;
    const yAxisOptions = Array.isArray(themeOptions.yAxis) ? themeOptions.yAxis[0] : themeOptions.yAxis;

    const { scatterData, lineData } = useMemo(() => {
        if (!actual.length || !predict.length) {
            return { scatterData: [], lineData: [] };
        }
        const scatterData: [number, number][] = predict.map((p, i) => [p, actual[i]]);
        const allValues = [...predict, ...actual];
        const min = Math.min(...allValues);
        const max = Math.max(...allValues);
        return {
            scatterData,
            lineData: [[min, min], [max, max]] as [number, number][],
        };
    }, [actual, predict]);

    const options = useMemo<ChartOptions>(
        () => ({
            ...themeOptions,
            chart: {
                ...themeOptions.chart,
                type: "scatter",
                animation: false,
            },
            title: { text: undefined },
            credits: { enabled: false },
            xAxis: {
                ...xAxisOptions,
                title: {
                    ...xAxisOptions?.title,
                    text: "Predict",
                },
                gridLineWidth: 1,
            },
            yAxis: {
                ...yAxisOptions,
                title: {
                    ...yAxisOptions?.title,
                    text: `${y_tag} (Actual)`,
                },
            },
            legend: {
                ...themeOptions.legend,
                enabled: true,
                verticalAlign: "top",
                align: "center",
            },
            tooltip: {
                ...themeOptions.tooltip,
                formatter: function () {
                    return `<b>Predict:</b> ${this.x}<br/><b>Actual:</b> ${this.y}`;
                },
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 2,
                        symbol: "circle",
                    },
                },
                line: {
                    marker: { enabled: false },
                    lineWidth: 1,
                    enableMouseTracking: false,
                },
            },
        }),
        [themeOptions, xAxisOptions, yAxisOptions, y_tag],
    );

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            minHeight: 0,
            // overflow: "auto"
        }}>
            <Chart
                options={options}
                containerProps={{ style: { width: "100%", minHeight: "100%" } }}
            >
                <ScatterSeries
                    name="Actual vs Predict"
                    data={scatterData}
                    color={theme.palette.chart.scatterDot}
                />
                <LineSeries
                    name="Perfect Fit (y=x)"
                    data={lineData}
                    color={theme.palette.chart.perfectFitLine}
                    options={{ lineWidth: 2, enableMouseTracking: false }}
                />
            </Chart>
        </Box>
    );
};

export default YChart;

