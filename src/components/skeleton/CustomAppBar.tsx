import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { FC, MouseEventHandler } from "react";

export interface CustomAppBarProps {
    onMenuClick: MouseEventHandler<HTMLButtonElement>;
}

const CustomAppBar: FC<CustomAppBarProps> = ({ onMenuClick }) => {

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
                    News
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar;
