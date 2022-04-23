import { FC, useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SxProps,
    Typography,
    useTheme
} from "@mui/material";
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import StockProps, { StatusProps } from "../../models/StockProps";
import { useSnackbar } from "notistack";
import _ from "lodash";
import PageInfoProps from "../../models/PageProps";

const Inventory: FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [stocks, setStocks] = useState<StockProps[]>([]);
    const [status, setStatus] = useState<StatusProps | "">("ACTIVE");
    const [pageInfo, setPageInfo] = useState<PageInfoProps>({
        pageNumber: 1,
        pageSize: 2,
        totalPages: 0,
    });
    const rowGridSxProps: SxProps = {
        p: 2,
        my: 1,
        color: "white",
        backgroundColor: theme.palette.primary.main,
        borderRadius: 1,
    }

    const getStocks = async () => {
        try {
            const result = await fetch(process.env.REACT_APP_API_URL + "/stocks?" +
                "_pageNumber=" + pageInfo.pageNumber + "&" +
                "_pageSize=" + pageInfo.pageSize + "&" +
                (status === "" ? "" : "status=" + status));
            const stocks = await result.json();

            setPageInfo(stocks.pageInfo);
            setStocks(stocks.data);
        } catch (error: any) {
            enqueueSnackbar(error?.data?.message || error?.message || error || "Please make sure the network is correct", {
                variant: "error",
            });
        }
    }

    const deleteStock = async (id: number) => {
        try {
            const result = await fetch(process.env.REACT_APP_API_URL + "/stocks/" + id, {
                method: "DELETE",
            });

            const _stocks = stocks.filter((stock) => {
                return stock.id !== id;
            })

            setStocks(_stocks);
        } catch (error: any) {
            enqueueSnackbar(error?.data?.message || error?.message || error || "Please make sure the network is correct", {
                variant: "error",
            });
        }
    }

    const sellStock = async (id: number) => {
        try {
            await fetch(process.env.REACT_APP_API_URL + "/stocks/" + id, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: "SOLD",
                })
            });

            getStocks();
        } catch (error: any) {
            enqueueSnackbar(error?.data?.message || error?.message || error || "Please make sure the network is correct", {
                variant: "error",
            });
        }
    }

    useEffect(() => {
        getStocks();
    }, [status, pageInfo.pageNumber]);

    const renderStockRow = (stock: any, stockKey: number) => {
        let statusColor = undefined;
        switch (stock.status) {
            case "ACTIVE":
                statusColor = theme.palette.success.main;
                break;
            case "INACTIVE":
                statusColor = theme.palette.error.main;
                break;
        }
        return (
            <Grid
                key={stockKey}
                container
                alignItems="center"
                sx={rowGridSxProps}
            >
                <Grid item xs={3}>
                    {stock.sku}
                    <Typography
                        sx={{
                            color: statusColor,
                        }}
                    >
                        {_.startCase(stock.status.toLowerCase())}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    {stock.model}
                </Grid>
                <Grid item xs={3}>
                    {stock.name}
                </Grid>
                <Grid item xs={1}>
                    {parseFloat(stock.price).toLocaleString()}
                </Grid>
                <Grid item xs={12} md={2}
                    sx={{
                        textAlign: "right",
                        [theme.breakpoints.down("md")]: {
                            mt: 2,
                        }
                    }}
                >
                    <IconButton aria-label="sell"
                        sx={{
                            color: "white"
                        }}
                        onClick={() => {
                            sellStock(stock.id)
                        }}
                    >
                        <MonetizationOnIcon />
                    </IconButton>
                    <IconButton aria-label="edit"
                        sx={{
                            color: "white"
                        }}
                        onClick={() => {
                            navigate("/stock/" + stock.id)
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete"
                        sx={{
                            color: "white"
                        }}
                        onClick={() => {
                            deleteStock(stock.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        )
    }

    const renderPagination = () => {
        return (
            pageInfo?.totalPages &&
            <Pagination
                count={pageInfo.totalPages}
                color="primary"
                sx={{
                    my: 3,
                }}
                page={pageInfo.pageNumber}
                onChange={(event, pageNumber) => {
                    setPageInfo((prevState) => ({
                        ...prevState,
                        pageNumber: pageNumber,
                    }));
                }}
            />
        )
    }

    return (
        <Box>
            {renderPagination()}
            <InputLabel id="status"
                sx={{
                    mb: 1,
                }}>
                Status
            </InputLabel>
            <Select
                labelId="status"
                value={status}
                onChange={(event) => {
                    setStatus(event.target.value as StatusProps);
                }}
                fullWidth
                color="primary"
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="SOLD">Sold</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
            <Grid
                container
                alignItems="center"
                sx={rowGridSxProps}
            >
                <Grid item xs={3}>SKU</Grid>
                <Grid item xs={3}>Car Model</Grid>
                <Grid item xs={3}>Car Name</Grid>
                <Grid item xs={3}>Price (RM)</Grid>
            </Grid>
            {
                stocks.map((stock, stockKey) => {
                    return renderStockRow(stock, stockKey);
                })
            }
            <Box
                sx={{
                    textAlign: "right"
                }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    size="large"
                    onClick={() => {
                        navigate("/stock");
                    }}
                >
                    Add Inventory
                </Button>
            </Box>
            {renderPagination()}
        </Box>
    )
}

export default Inventory;
