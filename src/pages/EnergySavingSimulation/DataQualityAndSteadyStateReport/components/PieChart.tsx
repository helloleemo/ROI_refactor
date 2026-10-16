import { Chart, Title, Tooltip } from '@highcharts/react';
import { PieSeries } from '@highcharts/react/series/Pie';
import { Exporting } from '@highcharts/react/modules/Exporting';
import { Accessibility } from '@highcharts/react/modules/Accessibility';
import { useTheme } from '@mui/material';

interface PieChartProps {
    title: string;
    data: Array<[string, number]>;
}

export const PieChart = ({ title, data }: PieChartProps) => {

    const theme = useTheme();

    return (
        <Chart options={{
            chart: { height: 360, backgroundColor: theme.palette.background.paper, style: { fontFamily: theme.typography.fontFamily } },
            colors: theme.palette.chart.seriesColors,
            title: { style: { color: theme.palette.text.primary, fontSize: '20px' } },
            legend: { itemStyle: { color: theme.palette.text.primary } },
            tooltip: { backgroundColor: theme.palette.background.paper, style: { color: theme.palette.text.primary } },
            credits: { enabled: false },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false,
                    },
                },
            },
        }}>
            <Title>{title}</Title>
            <Tooltip pointFormat="<b>{point.y:,.2f} kWh</b><br/>{point.percentage:.1f}%" />
            <PieSeries
                name={title}
                data={data}
                options={{
                    showInLegend: true,
                    dataLabels: {
                        format: '{point.percentage:.1f}%',
                        distance: -30,
                        style: { fontSize: '14px', textOutline: 'none', color: theme.palette.getContrastText(theme.palette.chart.seriesColors[0]) }
                    },


                }



                }
            />
            <Exporting />
            <Accessibility />
        </Chart>
    )
}