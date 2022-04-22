import { Grid, TextField, Button, Box, useTheme } from "@mui/material";
import {
    Delete as DeleteIcon,
    Save as SaveIcon,
    MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";
import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StockProps from "../../models/StockProps";

const Stock: FC = () => {
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const [stock, setStock] = useState<StockProps>({
        id: undefined,
        sku: "",
        model: "",
        name: "",
        price: "",
        status: "ACTIVE",
        createdAt: "",
        updatedAt: "",
    });

    const createStock = async () => {
        try {
            const stocksResult = await fetch(process.env.REACT_APP_API_URL + "/stocks", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stock)
            });
            const _stock = await stocksResult.json();

            navigate("/stock/" + _stock.id, {
                replace: true
            });
        } catch (error) {
            console.error(error);
        }
    }

    const deleteStock = async () => {
        try {
            await fetch(process.env.REACT_APP_API_URL + "/stocks" + id, {
                method: "DELETE",
            });

            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    }

    const getStock = async () => {
        if (id) {
            try {
                const stocksResult = await fetch(process.env.REACT_APP_API_URL + "/stocks/" + id);
                const stock = await stocksResult.json();

                setStock(stock);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const updateStock = async () => {
        try {
            await fetch(process.env.REACT_APP_API_URL + "/stocks/" + id, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stock)
            });
        } catch (error) {
            console.error(error);
        }
    }

    const sellStock = async () => {
        try {
            await fetch(process.env.REACT_APP_API_URL + "/stocks/" + id, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...stock,
                    status: "SOLD",
                })
            });

            getStock();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getStock();
    }, [])

    return (
        <Grid
            sx={{
                width: "60%",
                mx: "auto",
            }}
        >
            <TextField
                label="SKU"
                variant="outlined"
                value={stock?.sku}
                fullWidth
                sx={{
                    mb: 2,
                }}
                onChange={(event) => {
                    setStock((prevState) => ({
                        ...prevState,
                        sku: event.target.value,
                    }))
                }} />
            <TextField
                label="Model"
                variant="outlined"
                value={stock?.model}
                fullWidth
                sx={{
                    mb: 2,
                }}
                onChange={(event) => {
                    setStock((prevState) => ({
                        ...prevState,
                        model: event.target.value,
                    }))
                }} />
            <TextField
                label="Name"
                variant="outlined"
                value={stock?.name}
                fullWidth
                sx={{
                    mb: 2,
                }}
                onChange={(event) => {
                    setStock((prevState) => ({
                        ...prevState,
                        name: event.target.value,
                    }))
                }} />
            <TextField
                label="Price"
                variant="outlined"
                value={stock?.price}
                type="number"
                fullWidth
                sx={{
                    mb: 2,
                }}
                onChange={(event) => {
                    setStock((prevState) => ({
                        ...prevState,
                        price: event.target.value,
                    }))
                }} />

            <Box
                sx={{
                    textAlign: "right"
                }}
            >
                {id && !stock.soldAt && (
                    <>
                        <Button
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            sx={{
                                mr: 2,
                                backgroundColor: theme.palette.error.main,
                            }}
                            onClick={() => {
                                deleteStock();
                            }}>
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<MonetizationOnIcon />}
                            sx={{
                                mr: 2,
                                backgroundColor: theme.palette.success.main,
                            }}
                            onClick={() => {
                                sellStock();
                            }}>
                            Sold
                        </Button>
                    </>
                )}
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={() => {
                        if (id) {
                            updateStock();
                        } else {
                            createStock();
                        }
                    }}>
                    {id ? "Save" : "Create"}
                </Button>
            </Box>
        </Grid>
    )
}

export default Stock;
