import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { FC } from "react";

const CustomAppBar: FC = () => {
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
                    edge="start"
                    aria-label="menu"
                    sx={{
                        mr: 2,
                        color: "white",
                    }}
                >
                    <MenuIcon
                        sx={{
                            mr: 2,
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
