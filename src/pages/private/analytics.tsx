import { FC, useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
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
import StockProps from "../../models/StockProps";
import _ from "lodash";
import dayjs from "dayjs";
import { useTheme } from "@mui/system";

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
    const [stocks, setStocks] = useState<StockProps[]>();
    const [stockChart, setStockChart] = useState<{
        date: string,
        value: number
    }[]>([]);

    const getStocks = async () => {
        try {
            const result = await fetch(process.env.REACT_APP_API_URL + "/stocks?status=SOLD");
            const stocks = await result.json();

            setStocks(stocks);
        } catch (error) {
            console.error(error);
        }
    }

    const getStockChart = () => {
        const format = "YYYY-MM-DD";
        const stockCount = _.countBy(stocks, (stock) => {
            return dayjs(stock.soldAt).format(format);
        });
        const stockChart: any = _.map(_.range(-30, 1), (dayBefore) => {
            const date = dayjs().add(dayBefore, 'day').format(format);
            return {
                date: date,
                value: stockCount[date] ?? 0,
            }
        });
        setStockChart(stockChart);
    }

    useEffect(() => {
        getStockChart();
    }, [stocks])

    useEffect(() => {
        getStocks();
    }, [])

    return (
        <Grid>
            <div>Analytics</div>
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
        </Grid>
    )
}

export default Analytics;
