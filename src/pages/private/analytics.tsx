import { FC, useEffect, useState } from "react";
import { Card } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import StockProps, { StockChartProps } from "../../models/StockProps";
import _ from "lodash";
import dayjs from "dayjs";
import { useTheme } from "@mui/system";
import { useSnackbar } from "notistack";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Analytics: FC = () => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [stocks, setStocks] = useState<StockProps[]>();
    const [stockCharts, setStockCharts] = useState<StockChartProps[]>();
    const [stockChart, setStockChart] = useState<{
        date: string,
        value: number
    }[]>([]);

    const getStocks = async () => {
        try {
            const stockChartResult = await fetch(process.env.REACT_APP_API_URL + "/stocks/chart?status=SOLD");
            const stockCharts: StockChartProps[] = await stockChartResult.json();

            setStocks(stocks);
            setStockCharts(stockCharts);
        } catch (error: any) {
            enqueueSnackbar(error?.data?.message || error?.message || error || "Please make sure the network is correct", {
                variant: "error",
            });
        }
    }

    const getStockChart = () => {
        const format = "YYYY-MM-DD";
        const stockCount = _.keyBy(stockCharts, "date");
        const stockChart: any = _.map(_.range(-30, 1), (dayBefore) => {
            const date = dayjs().add(dayBefore, 'day').format(format);
            return {
                date: date,
                value: stockCount[date]?.totalPrice ?? 0,
            }
        });
        setStockChart(stockChart);
    }

    useEffect(() => {
        getStockChart();
    }, [stockCharts])

    useEffect(() => {
        getStocks();
    }, [])

    return (
        <Card
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                p: 8,
            }}
        >
            <Line
                options={{
                    scales: {
                        y: {
                            ticks: {
                                color: "white"
                            },
                            grid: {
                                color: 'transparent'
                            },
                            min: 0,
                        },
                        x: {
                            ticks: {
                                color: "white"
                            },
                            grid: {
                                color: 'transparent'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: "white"
                            }
                        },
                        title: {
                            display: true,
                            text: 'Last 30 Days Sales',
                            color: "white"
                        },
                    },
                }}
                data={{
                    labels: stockChart.map((day) => {
                        return day.date;
                    }),
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: stockChart.map((day) => {
                                return day.value;
                            }),
                            borderColor: 'white',
                            backgroundColor: 'white',
                        },
                    ],
                }} />
        </Card>
    )
}

export default Analytics;
