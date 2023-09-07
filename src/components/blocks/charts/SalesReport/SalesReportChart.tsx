import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const SalesReportChart = () => {
    const data = [
        {
            name: 'Banners',
            data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        },
        {
            name: 'Promoted spot',
            data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
        },
        {
            name: 'Total',
            data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
        },
    ]

    return (
        <>
            <h3>Sales Report</h3>
            <Chart
                options={{
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false,
                        },
                    },
                    colors: [...COLORS],
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        width: [3, 3, 5],
                        curve: 'straight',
                    },
                    legend: {
                        tooltipHoverFormatter: function (val, opts) {
                            return (
                                val +
                                ' - ' +
                                opts.w.globals.series[opts.seriesIndex][
                                    opts.dataPointIndex
                                ] +
                                ''
                            )
                        },
                    },
                    markers: {
                        size: 0,
                        hover: {
                            sizeOffset: 6,
                        },
                    },
                    xaxis: {
                        categories: [
                            '01 Jan',
                            '02 Jan',
                            '03 Jan',
                            '04 Jan',
                            '05 Jan',
                            '06 Jan',
                            '07 Jan',
                            '08 Jan',
                            '09 Jan',
                            '10 Jan',
                            '11 Jan',
                            '12 Jan',
                        ],
                    },
                    tooltip: {
                        y: [
                            {
                                title: {
                                    formatter: function (val) {
                                        return val
                                    },
                                },
                            },
                            {
                                title: {
                                    formatter: function (val) {
                                        return val
                                    },
                                },
                            },
                            {
                                title: {
                                    formatter: function (val) {
                                        return val
                                    },
                                },
                            },
                        ],
                    },
                    grid: {
                        borderColor: '#f1f1f1',
                    },
                }}
                series={data}
                height={300}
            />
        </>
    )
}

export default SalesReportChart
