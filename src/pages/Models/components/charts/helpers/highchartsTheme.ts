import type { Theme } from "@mui/material/styles";
import type { ChartOptions } from "@highcharts/react";

/**
 * Returns Highcharts base options that mirror the current MUI theme (light/dark).
 * Based on Highcharts DarkUnica theme structure + MUI palette mapping.
 * Merge this into every chart's options to keep colours in sync with the app theme.
 */
export const getHighchartsThemeOptions = (theme: Theme): Partial<ChartOptions> => {
    const isDark = theme.palette.mode === "dark";
    const textPrimary = theme.palette.text.primary;
    const textSecondary = theme.palette.text.secondary;
    const divider = theme.palette.divider;
    const bgPaper = theme.palette.background.paper;

    // Series colour palette from theme
    const seriesColors = theme.palette.chart.seriesColors;

    return {
        colors: seriesColors,
        chart: {
            backgroundColor: bgPaper,
            plotBorderColor: divider,
            style: {
                color: textPrimary,
                fontFamily: theme.typography.fontFamily,
            },
        },
        title: {
            style: { color: textPrimary },
        },
        subtitle: {
            style: { color: textSecondary },
        },
        xAxis: {
            lineColor: divider,
            tickColor: divider,
            gridLineColor: divider,
            labels: { style: { color: textSecondary, fontSize: "12px" } },
            title: { style: { color: textPrimary } },
        },
        yAxis: {
            gridLineColor: divider,
            lineColor: divider,
            tickColor: divider,
            labels: { style: { color: textSecondary, fontSize: "12px" } },
            title: { style: { color: textPrimary } },
        },
        legend: {
            backgroundColor: "transparent",
            itemStyle: { color: textPrimary, fontWeight: "normal", fontSize: "12px" },
            itemHoverStyle: { color: theme.palette.primary.main },
            itemHiddenStyle: { color: textSecondary },
        },
        tooltip: {
            backgroundColor: bgPaper,
            borderColor: divider,
            shadow: isDark ? false : true,
            style: { color: textPrimary, fontSize: "12px" },
        },
        plotOptions: {
            series: {
                dataLabels: {
                    style: { color: textPrimary, textOutline: "none" },
                },
            },
        },
    };
};

