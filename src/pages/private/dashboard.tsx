import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { StockSummaryProps } from "../../models/StockProps";
import Analytics from "./analytics";
import _ from "lodash";

const Dashboard: FC = () => {
    const theme = useTheme();
    const [stockSummaries, setStockSummaries] = useState<StockSummaryProps[]>([]);
    const stockSummaryLabels = {
        "ACTIVE": "Total Pending",
        "SOLD": "Total Sales",
        "INACTIVE": "Total Void"
    }
    const EMPTY_STOCK_SUMMARIES = [
        { status: "ACTIVE", totalPrice: "0", totalCount: 0 },
        { status: "SOLD", totalPrice: "0", totalCount: 0 },
        { status: "INACTIVE", totalPrice: "0", totalCount: 0 }
    ]

    const getStockSummary = async () => {
        const stockSummaryResult = await fetch(process.env.REACT_APP_API_URL + "/stocks/summary");
        const stockSummaries: StockSummaryProps[] = await stockSummaryResult.json();
        setStockSummaries(_.uniqBy([
            ...stockSummaries,
            ...EMPTY_STOCK_SUMMARIES,
        ], (stockSummary) => {
            return stockSummary.status;
        }));
    }

    useEffect(() => {
        getStockSummary();
    }, [])

    return (
        <Grid container spacing={2}>
            {
                stockSummaries && (
                    stockSummaries.map((stockSummary, stockSummaryKey) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={stockSummaryKey}>
                                <Card
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: "white",
                                        p: 1,
                                    }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            RM {parseFloat(stockSummary.totalPrice).toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2">
                                            {stockSummaryLabels[stockSummary.status as keyof typeof stockSummaryLabels]}: {stockSummary.totalCount + " item(s)"}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>)
                    })
                )
            }
            <Grid item xs={12}>
                <Analytics />
            </Grid>
        </Grid>
    )
}

export default Dashboard;
