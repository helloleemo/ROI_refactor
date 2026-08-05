
import { useMemo, useState } from "react";
import {
    Box,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const FIRST_COLLAPSED_WIDTH = 64;
const FIRST_EXPANDED_WIDTH = 220;
const SECOND_COLLAPSED_WIDTH = 56;
const SECOND_EXPANDED_WIDTH = 240;

const firstLevelItems = [
    { key: "home", label: "Home", icon: <HomeOutlinedIcon /> },
    { key: "site", label: "Site Management", icon: <TuneOutlinedIcon /> },
];

const Sidebar = () => {
    const [isFirstHovered, setIsFirstHovered] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(true);
    const [isSiteMenuOpen, setIsSiteMenuOpen] = useState(true);

    const firstWidth = isFirstHovered ? FIRST_EXPANDED_WIDTH : FIRST_COLLAPSED_WIDTH;
    const secondWidth = isSecondOpen ? SECOND_EXPANDED_WIDTH : SECOND_COLLAPSED_WIDTH;

    const secondDrawerHeader = useMemo(
        () => (isSecondOpen ? "Site Management" : ""),
        [isSecondOpen],
    );

    return (
        <Box sx={{ display: "flex", height: "100%" }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: firstWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: firstWidth,
                        position: "relative",
                        height: "100%",
                        overflowX: "hidden",
                        borderRight: "1px solid",
                        borderColor: "divider",
                        transition: "width 220ms ease",
                        bgcolor: "background.paper",
                    },
                }}
            >
                <Box
                    onMouseEnter={() => setIsFirstHovered(true)}
                    onMouseLeave={() => setIsFirstHovered(false)}
                    sx={{ height: "100%" }}
                >
                    <List sx={{ py: 1 }}>
                        {firstLevelItems.map((item) => (
                            <ListItemButton
                                key={item.key}
                                selected={item.key === "site"}
                                sx={{
                                    minHeight: 46,
                                    px: isFirstHovered ? 1.5 : 1,
                                    mx: 1,
                                    borderRadius: 1,
                                    justifyContent: isFirstHovered ? "flex-start" : "center",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: isFirstHovered ? 1.4 : 0,
                                        justifyContent: "center",
                                        color: "inherit",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                {isFirstHovered ? <ListItemText primary={item.label} /> : null}
                            </ListItemButton>
                        ))}
                    </List>

                    <Box sx={{ mt: "auto", p: 1.5 }}>
                        <Typography
                            sx={{
                                fontSize: 12,
                                color: "text.disabled",
                                textAlign: isFirstHovered ? "left" : "center",
                            }}
                        >
                            {isFirstHovered ? "Version: V. 1.11.0" : "V1"}
                        </Typography>
                    </Box>
                </Box>
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    width: secondWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: secondWidth,
                        position: "relative",
                        height: "100%",
                        overflowX: "hidden",
                        borderRight: "1px solid",
                        borderColor: "divider",
                        transition: "width 220ms ease",
                        bgcolor: "grey.50",
                    },
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
                    {isSecondOpen ? (
                        <Typography sx={{ fontSize: 14, color: "text.secondary", pl: 1 }}>
                            {secondDrawerHeader}
                        </Typography>
                    ) : null}
                    <IconButton
                        size="small"
                        onClick={() => setIsSecondOpen((prev) => !prev)}
                        sx={{ ml: "auto" }}
                    >
                        {isSecondOpen ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
                    </IconButton>
                </Stack>

                {isSecondOpen ? (
                    <>
                        <Divider />
                        <List sx={{ pt: 1 }}>
                            <ListItemButton
                                onClick={() => setIsSiteMenuOpen((prev) => !prev)}
                                sx={{ mx: 1, borderRadius: 1 }}
                            >
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                    <FmdGoodOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Site Management" />
                                {isSiteMenuOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                            </ListItemButton>

                            <Collapse in={isSiteMenuOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{ px: 1 }}>
                                    <ListItemButton sx={{ pl: 5, borderRadius: 1 }} selected>
                                        <ListItemText primary="Company Info." />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 5, borderRadius: 1 }}>
                                        <ListItemText primary="Site List" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </>
                ) : null}
            </Drawer>
        </Box>
    );
};

export default Sidebar;