import { FC, SetStateAction } from "react";
import {
    Dashboard as DashboardIcon,
    Inventory as InventoryIcon,
    Analytics as AnalyticsIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";
import { Avatar, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const drawerWidth = 240;

export interface CustomDrawerProps {
    drawerState: boolean;
    onMenuClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

const CustomDrawer: FC<CustomDrawerProps> = ({ drawerState, onMenuClose }) => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const routes = [
        { icon: DashboardIcon, text: "Dashboard", path: "/" },
        { icon: InventoryIcon, text: "Inventory", path: "/inventory" },
    ];

    const logout = async () => {
        try {
            await fetch(process.env.REACT_APP_API_URL + "/logout", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            enqueueSnackbar("Logged Out");
        } catch (error: any) {
            enqueueSnackbar(error?.data?.message || error?.message || error || "Please make sure the network is correct", {
                variant: "error",
            });
        }
    };

    return (
        <Drawer
            elevation={3}
            sx={{
                width: drawerWidth,
                my: 6,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                },
            }}
            open={drawerState}
            onClose={onMenuClose}
            variant={isMobileView ? "temporary" : "permanent"}
        >
            <Avatar
                sx={{
                    mx: "auto",
                    mt: 6,
                    mb: 3,
                    bgcolor: "#004544",
                    width: 50,
                    height: 50,
                }}
            >
                VH
            </Avatar>
            <List>
                {
                    routes.map((route, routeKey) => {
                        const Icon = route.icon;
                        return (
                            <ListItemButton
                                key={routeKey}
                                sx={{
                                    mx: 2,
                                    my: 0.5,
                                    borderRadius: 1,
                                    ...(pathname === route.path ? {
                                        color: theme.palette.primary.main,
                                        "& .MuiListItemIcon-root": {
                                            color: theme.palette.primary.main,
                                        },
                                        backgroundColor: "white",
                                    } : {
                                        color: "white",
                                        "& .MuiListItemIcon-root": {
                                            color: "white",
                                        },
                                    }),
                                    "&:hover": {
                                        color: theme.palette.primary.main,
                                        "& .MuiListItemIcon-root": {
                                            color: theme.palette.primary.main,
                                        },
                                        backgroundColor: "white",
                                        transition: "0.3s",
                                    },
                                }}
                                onClick={() => {
                                    navigate(route.path);
                                }}>
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText>
                                    {route.text}
                                </ListItemText>
                            </ListItemButton>
                        )
                    })
                }
            </List>
            <List
                sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                }}
            >
                <ListItemButton
                    sx={{
                        mx: 2,
                        my: 1,
                        borderRadius: 1,
                        color: "white",
                        "& .MuiListItemIcon-root": {
                            color: "white",
                        },
                        "&:hover": {
                            color: theme.palette.primary.main,
                            "& .MuiListItemIcon-root": {
                                color: theme.palette.primary.main,
                            },
                            backgroundColor: "white",
                            transition: "0.3s",
                        },
                    }}
                    onClick={() => {
                        logout();
                    }}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText>
                </ListItemButton>
            </List>
        </Drawer >
    )
}

export default CustomDrawer;