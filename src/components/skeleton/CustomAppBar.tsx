import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";

export interface CustomAppBarProps {
    onMenuClick: MouseEventHandler<HTMLButtonElement>;
}

const CustomAppBar: FC<CustomAppBarProps> = ({ onMenuClick }) => {
    const { pathname } = useLocation();

    return (
        <AppBar
            position="fixed"
            sx={{
                display: {
                    md: "none",
                }
            }}>
            <Toolbar>
                <IconButton
                    size="large"
                    aria-label="menu"
                    sx={{
                        mr: 2,
                        color: "white",
                    }}
                    onClick={onMenuClick}
                >
                    <MenuIcon
                        sx={{
                            color: "white",
                        }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    {_.startCase(pathname.substring(1)) || "Dashboard"}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar;
