import { Box, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CustomAppBar from "../../components/skeleton/CustomAppBar";
import CustomDrawer from "../../components/skeleton/CustomDrawer";
import Dashboard from "./dashboard";
import Inventory from "./inventory";
import Stock from "./stock";
import _ from "lodash";

const Index: FC = () => {
    const theme = useTheme();
    const { pathname } = useLocation();
    const [drawerState, setDrawerState] = useState<boolean>(false);

    return (
        <Box
            sx={{
                display: "flex",
            }}>
            <CustomAppBar
                onMenuClick={() => {
                    setDrawerState(true);
                }} />
            <CustomDrawer
                drawerState={drawerState}
                onMenuClose={() => {
                    setDrawerState(false);
                }}
            />
            <Box
                component="main"
                sx={{
                    minHeight: "100vh",
                    p: 3,
                    flexGrow: 1,
                    backgroundColor: theme.palette.secondary.main
                }}
            >
                <Typography variant="h6"
                    sx={{
                        mb: 3,
                    }}
                >
                    {_.startCase(pathname.substring(1)) || "Dashboard"}
                </Typography>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/stock" element={<Stock />} />
                    <Route path="/stock/:id" element={<Stock />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Index;
