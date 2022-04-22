import { Box, useTheme } from "@mui/material";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import CustomAppBar from "../../components/skeleton/CustomAppBar";
import CustomDrawer from "../../components/skeleton/CustomDrawer";
import Analytics from "./analytics";
import Dashboard from "./dashboard";
import Inventory from "./inventory";
import Stock from "./stock";

const Index: FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
            }}>
            <CustomAppBar />
            <CustomDrawer />
            <Box
                component="main"
                sx={{
                    minHeight: "100vh",
                    p: 3,
                    flexGrow: 1,
                    backgroundColor: theme.palette.secondary.main
                }}
            >
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/stock" element={<Stock />} />
                    <Route path="/stock/:id" element={<Stock />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Index;
