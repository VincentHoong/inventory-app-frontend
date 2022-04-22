import { FC } from "react";
import {
    Dashboard as DashboardIcon,
    Inventory as InventoryIcon,
    Analytics as AnalyticsIcon,
} from "@mui/icons-material";
import { Avatar, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const CustomDrawer: FC = () => {
    const theme = useTheme();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const routes = [
        { icon: DashboardIcon, text: "Dashboard", path: "/" },
        { icon: InventoryIcon, text: "Inventory", path: "/inventory" },
        { icon: AnalyticsIcon, text: "Analytics", path: "/analytics" },
    ];


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
            variant="permanent"
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
        </Drawer>
    )
}

export default CustomDrawer;