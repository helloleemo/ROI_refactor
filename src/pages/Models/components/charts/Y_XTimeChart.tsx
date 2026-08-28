
import { Box, FormControlLabel, Switch } from "@mui/material";
import { useMemo, useState, useEffect, useRef } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import { Chart, type ChartOptions } from "@highcharts/react";
import { LineSeries } from "@highcharts/react/series/Line";
import { createTickPositioner } from "./helpers/tickPositioner";
import { getHighchartsThemeOptions } from "./helpers/highchartsTheme";


interface Y_XTimeChartProps {
    times: string[];
    actual: number[];
    predict: number[];
    y_tag: string;
    dataset: any | null
}

const Y_XTimeChart = ({ times, actual, predict, y_tag, dataset }: Y_XTimeChartProps) => {
    // console.log("Y_XTimeChart dataset:", dataset);

    const [showTrainBand, setShowTrainBand] = useState(false);
    const [bandOpacity, setBandOpacity] = useState(0);
    const animRef = useRef<number | null>(null);

    useEffect(() => {
        const target = showTrainBand ? 1 : 0;
        const duration = 350;
        const startTime = performance.now();
        const startOpacity = bandOpacity;

        const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            setBandOpacity(startOpacity + (target - startOpacity) * eased);
            if (progress < 1) {
                animRef.current = requestAnimationFrame(animate);
            }
        };
        if (animRef.current) cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(animate);
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    }, [showTrainBand]);
    const theme = useTheme();
    const themeOptions = getHighchartsThemeOptions(theme);
    const xAxisOptions = Array.isArray(themeOptions.xAxis) ? themeOptions.xAxis[0] : themeOptions.xAxis;
    const yAxisOptions = Array.isArray(themeOptions.yAxis) ? themeOptions.yAxis[0] : themeOptions.yAxis;
    const preparedSeries = useMemo(
        () => ({ times, actual, predict }),
        [times, actual, predict],
    );

    const options = useMemo<ChartOptions>(
        () => ({
            ...themeOptions,
            chart: {
                ...themeOptions.chart,
                type: "line",
                animation: false,
            },
            title: {
                text: undefined,
            },
            credits: {
                enabled: false,
            },
            xAxis: {
                ...xAxisOptions,
                categories: preparedSeries.times,
                title: {
                    ...xAxisOptions?.title,
                    text: "Time",
                },
                tickPositioner: function () {
                    return createTickPositioner(preparedSeries.times.length, 5);
                },
                labels: {
                    ...xAxisOptions?.labels,
                    allowOverlap: true,
                    formatter: function () {
                        const position = Number(this.pos ?? this.value ?? 0);
                        if (position === preparedSeries.times.length - 1) {
                            return "";
                        }
                        return this.value as string;
                    },
                },
                plotBands: bandOpacity > 0 && dataset
                    ? (() => {
                        const testStart = dataset.test_start_time as string;
                        const fromIdx = preparedSeries.times.findIndex(t => t >= testStart);
                        if (fromIdx === -1) return [];
                        return [{
                            from: fromIdx,
                            to: preparedSeries.times.length - 1,
                            color: alpha(theme.palette.chart.testBandLabel, 0.12 * bandOpacity),
                            label: {
                                text: "測試集",
                                align: "center",
                                verticalAlign: "top",
                                style: {
                                    color: theme.palette.chart.testBandLabel,
                                    fontSize: "11px",
                                    opacity: bandOpacity,
                                },
                            },
                        }];
                    })()
                    : [],
            },
            yAxis: {
                ...yAxisOptions,
                title: {
                    ...yAxisOptions?.title,
                    text: y_tag,
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
                shared: true,
            },
            plotOptions: {
                series: {
                    lineWidth: 0.5,
                    marker: {
                        enabled: false,
                    },
                },
            },
        }),
        [themeOptions, xAxisOptions, yAxisOptions, preparedSeries.times, bandOpacity, dataset, y_tag],
    );

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                bgcolor: theme.palette.background.paper,
            }}
        >
            {dataset && (
                <FormControlLabel
                    control={
                        <Switch
                            size="small"
                            checked={showTrainBand}
                            onChange={(e) => setShowTrainBand(e.target.checked)}
                        />
                    }
                    label="顯示測試集範圍"
                    sx={{
                        alignSelf: "flex-end",
                        mb: 0.5
                    }}
                />
            )}
            <Box sx={{
                flex: 1,
                minHeight: 0,
                // overflow: "auto",
                "& > div": {
                    width: "100%",
                    minHeight: "100%",
                }
            }}>
                <Chart
                    options={options}
                    containerProps={{
                        style: { width: "100%", minHeight: "100%" },
                    }}
                >
                    <LineSeries name="Actual" data={preparedSeries.actual} />
                    <LineSeries name="Predict" data={preparedSeries.predict} />
                </Chart>
            </Box>
        </Box>
    );
};

export default Y_XTimeChart;