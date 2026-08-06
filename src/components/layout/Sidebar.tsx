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
    Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { firstLevelItems, secondLevelMenuMap } from "@/mock/sidebar";
import {
    FIRST_COLLAPSED_WIDTH,
    FIRST_EXPANDED_WIDTH,
    SECOND_COLLAPSED_WIDTH,
    SECOND_EXPANDED_WIDTH,
} from "@/settings";

const Sidebar = () => {
    const [isFirstHovered, setIsFirstHovered] = useState(false);
    const [lockFirstHoverUntilLeave, setLockFirstHoverUntilLeave] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(true);
    const [openSecondGroups, setOpenSecondGroups] = useState<Record<string, boolean>>({
        "overview-reporting": true,
        "model-management-list": true,
        "optimization-strategies": true,
    });
    const [activeFirstLevelKey, setActiveFirstLevelKey] = useState("modelManagement");

    const secondWidth = isSecondOpen ? SECOND_EXPANDED_WIDTH : SECOND_COLLAPSED_WIDTH;
    const firstWidth = isFirstHovered
        ? Math.max(FIRST_EXPANDED_WIDTH, FIRST_COLLAPSED_WIDTH + secondWidth)
        : FIRST_COLLAPSED_WIDTH;

    const secondDrawerHeader = useMemo(
        () => firstLevelItems.find((item) => item.key === activeFirstLevelKey)?.label ?? "",
        [activeFirstLevelKey],
    );

    const secondMenus = useMemo(
        () => secondLevelMenuMap[activeFirstLevelKey] ?? [],
        [activeFirstLevelKey],
    );

    const handleFirstLevelClick = (key: string) => {
        setActiveFirstLevelKey(key);
        setIsSecondOpen(true);
        setIsFirstHovered(false);
        setLockFirstHoverUntilLeave(true);
    };

    const handleSecondGroupToggle = (key: string) => {
        setOpenSecondGroups((prev) => ({
            ...prev,
            [key]: !(prev[key] ?? false),
        }));
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "100%",
                position: "relative",
                width: FIRST_COLLAPSED_WIDTH + secondWidth,
                minWidth: FIRST_COLLAPSED_WIDTH + secondWidth,
                flexShrink: 0,
                transition: "width 180ms cubic-bezier(0.5, 1, 0.54, 1)",
            }}
        >
            <Drawer
                variant="permanent"
                sx={{
                    width: FIRST_COLLAPSED_WIDTH,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: firstWidth,
                        minWidth: firstWidth,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        overflowX: "hidden",
                        borderRight: "1px solid",
                        borderColor: "divider",
                        transition: "width 260ms",
                        bgcolor: "background.paper",
                        zIndex: (theme) => theme.zIndex.drawer + 2,
                    },
                }}
            >
                <Box
                    onMouseEnter={() => {
                        if (!lockFirstHoverUntilLeave) {
                            setIsFirstHovered(true);
                        }
                    }}
                    onMouseLeave={() => {
                        setIsFirstHovered(false);
                        setLockFirstHoverUntilLeave(false);
                    }}
                    sx={{
                        height: "100%",
                        flexDirection: "column",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <List
                        sx={{
                            py: 1,
                            display: "flex",
                            p: 1,
                            flexDirection: "column",
                            gap: 0.5,
                        }}
                    >
                        {firstLevelItems.map((item) => (
                            <ListItemButton
                                key={item.key}
                                selected={item.key === activeFirstLevelKey}
                                onClick={() => handleFirstLevelClick(item.key)}
                                sx={{
                                    minHeight: 46,
                                    px: isFirstHovered ? 1.5 : 1,
                                    mx: 0,
                                    justifyContent: isFirstHovered ? "flex-start" : "center",
                                    borderRadius: 1,
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
                                    <Box component="span" sx={{ display: "flex", color: "text.primary" }}>
                                        {item.icon}
                                    </Box>
                                </ListItemIcon>
                                <Box
                                    sx={{
                                        overflow: "hidden",
                                        maxWidth: isFirstHovered ? 180 : 0,
                                        opacity: isFirstHovered ? 1 : 0,
                                        transform: isFirstHovered ? "translateX(0)" : "translateX(-8px)",
                                        transition: "max-width 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease, transform 260ms ease",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <ListItemText primary={item.label} />
                                </Box>
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
                        minWidth: secondWidth,
                        position: "relative",
                        height: "100%",
                        overflowX: isSecondOpen ? "hidden" : "visible",
                        borderRight: "1px solid",
                        borderColor: isSecondOpen ? "divider" : "transparent",
                        transition: "width 100ms cubic-bezier(0.5, 1, 0.54, 1), border-color 100ms ease, background-color 180ms ease",
                        bgcolor: isSecondOpen ? "semantic.surfaceSubtle" : "transparent",
                    },
                }}
            >
                <Box
                    sx={{
                        p: 1,
                        display: "flex",
                        alignItems: "center",
                        minHeight: 48,
                        opacity: isSecondOpen ? 1 : 0,
                        transform: isSecondOpen ? "translateX(0)" : "translateX(-10px)",
                        transition: "opacity 220ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
                        pointerEvents: isSecondOpen ? "auto" : "none",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: "text.secondary",
                            pl: 1,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {secondDrawerHeader}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        opacity: isSecondOpen ? 1 : 0,
                        transform: isSecondOpen ? "translateX(0)" : "translateX(-12px)",
                        transition: "opacity 220ms ease, transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
                        pointerEvents: isSecondOpen ? "auto" : "none",
                    }}
                >
                    <Divider />
                    <List
                        sx={{
                            py: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                        }}
                    >
                        {secondMenus.map((menu) => {
                            const hasChildren = Boolean(menu.children?.length);
                            const isGroupOpen = openSecondGroups[menu.key] ?? false;

                            if (!hasChildren) {
                                return (
                                    <ListItemButton
                                        key={menu.key}
                                        sx={{
                                            px: 1.5,
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 32 }}>{menu.icon}</ListItemIcon>
                                        <ListItemText primary={menu.label} />
                                    </ListItemButton>
                                );
                            }

                            return (
                                <Box key={menu.key}>
                                    <ListItemButton
                                        onClick={() => handleSecondGroupToggle(menu.key)}
                                        sx={{
                                            px: 1.5,
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 32 }}>{menu.icon}</ListItemIcon>
                                        <ListItemText primary={menu.label} />
                                        {isGroupOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                    </ListItemButton>

                                    <Collapse in={isGroupOpen && isSecondOpen} timeout="auto" unmountOnExit>
                                        <List
                                            component="div"
                                            disablePadding
                                            sx={{
                                                py: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 0.5,
                                            }}
                                        >
                                            {menu.children?.map((item) => (
                                                <ListItemButton
                                                    key={item.key}
                                                    sx={{
                                                        pl: 4,
                                                    }}
                                                >
                                                    {item.icon ? (
                                                        <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
                                                    ) : null}
                                                    <ListItemText primary={item.label} />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                </Box>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>

            <IconButton
                size="small"
                onClick={() => setIsSecondOpen((prev) => !prev)}
                sx={{
                    position: "absolute",
                    bottom: 20,
                    left: FIRST_COLLAPSED_WIDTH + secondWidth - 20,
                    zIndex: (theme) => theme.zIndex.drawer + 3,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                {isSecondOpen ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
            </IconButton>
        </Box>
    );
};

export default Sidebar;
