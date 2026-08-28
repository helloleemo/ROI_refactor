import { useState } from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
    Box,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MenuItem, type MenuItemProps } from "@/mock/sidebar";

const FIRST_COLLAPSED_WIDTH = 72;
const FIRST_EXPANDED_WIDTH = 220;
const SECOND_WIDTH = 220;
const HEADER_HEIGHT = 70;

const Sidebar2 = () => {
    const navigate = useNavigate();
    const [activeFirstLevelKey, setActiveFirstLevelKey] = useState<string | null>(null);
    const [activeFirstLevelItem, setActiveFirstLevelItem] = useState<MenuItemProps | null>(null);
    const [activeSecondLevelKey, setActiveSecondLevelKey] = useState<string | null>(null);
    const [activeThirdLevelKey, setActiveThirdLevelKey] = useState<string | null>(null);
    const [openSecondGroups, setOpenSecondGroups] = useState<Record<string, boolean>>({});
    const [isFirstLevelHovered, setIsFirstLevelHovered] = useState(false);
    const [isSecondLevelCollapsed, setIsSecondLevelCollapsed] = useState(false);

    const secondMenus = activeFirstLevelItem?.children ?? [];
    const activeFirstLevelLabel = activeFirstLevelItem?.label ?? "";
    const hasSecondLevelMenu = Boolean(activeFirstLevelItem);
    const firstDrawerWidth = isFirstLevelHovered ? FIRST_EXPANDED_WIDTH : FIRST_COLLAPSED_WIDTH;
    const secondDrawerWidth = hasSecondLevelMenu && !isSecondLevelCollapsed ? SECOND_WIDTH : 0;
    const secondDrawerLeft = FIRST_COLLAPSED_WIDTH;
    const firstDrawerRightEdge = firstDrawerWidth;
    const secondDrawerRightEdge = secondDrawerLeft + secondDrawerWidth;
    const toggleButtonLeft = Math.max(firstDrawerRightEdge, secondDrawerRightEdge) - 20;
    const sidebarOccupiedWidth = FIRST_COLLAPSED_WIDTH + secondDrawerWidth;

    const handleFirstLevelClick = (activeItem: MenuItemProps) => {
        setActiveFirstLevelKey(activeItem.key);
        setActiveFirstLevelItem(activeItem);
        setActiveSecondLevelKey(null);
        setActiveThirdLevelKey(null);
        setIsSecondLevelCollapsed(false);
        setIsFirstLevelHovered(false);
    };

    const handleSecondGroupToggle = (key: string) => {
        setOpenSecondGroups((prev) => ({
            ...prev,
            [key]: !(prev[key] ?? false),
        }));
    };

    const handleSecondLevelClick = (menu: MenuItemProps) => {
        setActiveSecondLevelKey(menu.key);
        setActiveThirdLevelKey(null);
        if (menu.route) {
            navigate(menu.route);
        }
    };

    const handleSecondLevelCollapseToggle = () => {
        setIsSecondLevelCollapsed((prev) => !prev);
    };

    const handleThirdLevelClick = (menu: MenuItemProps, child: MenuItemProps) => {
        setActiveSecondLevelKey(menu.key);
        setActiveThirdLevelKey(child.key);
        if (child.route) {
            navigate(child.route);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                overflow: "hidden",
                width: sidebarOccupiedWidth,
                minWidth: sidebarOccupiedWidth,
                flexShrink: 0,
                position: "relative",
                transition: "width 180ms ease",
            }}
        >
            <Box
                onMouseEnter={() => setIsFirstLevelHovered(true)}
                onMouseLeave={() => setIsFirstLevelHovered(false)}
                sx={{
                    position: "relative",
                    width: firstDrawerWidth,
                    flexShrink: 0,
                    transition: "width 180ms ease",
                }}
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        width: firstDrawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: firstDrawerWidth,
                            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
                            boxSizing: "border-box",
                            borderRight: "1px solid",
                            borderColor: "divider",
                            bgcolor: "background.paper",
                            p: 1,
                            top: `${HEADER_HEIGHT}px`,
                            position: "fixed",
                            transition: "width 180ms ease",
                            overflow: "hidden",
                            zIndex: 2,
                        },
                    }}
                >
                    <List>
                        {MenuItem.map((item) => (
                            <ListItemButton
                                key={item.key}
                                selected={item.key === activeFirstLevelKey}
                                onClick={() => handleFirstLevelClick(item)}
                                sx={{
                                    borderRadius: 1,
                                    mb: 0.5,
                                    justifyContent: isFirstLevelHovered ? "flex-start" : "center",
                                    minHeight: 48,
                                    overflow: "hidden",
                                    transition: "justify-content 180ms ease",
                                }}
                            >
                                <ListItemIcon sx={{
                                    minWidth: isFirstLevelHovered ? 36 : 0,
                                    mr: isFirstLevelHovered ? 1 : 0,
                                    cursor: "pointer",
                                    transition: "all 180ms ease",
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    sx={{
                                        flex: 1,
                                        minWidth: 0,
                                        opacity: isFirstLevelHovered ? 1 : 0,
                                        width: isFirstLevelHovered ? "auto" : 0,
                                        maxWidth: isFirstLevelHovered ? 140 : 0,
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        cursor: "pointer",
                                        transition: "opacity 180ms ease, width 180ms ease, max-width 180ms ease",
                                    }}
                                    primary={
                                        <Typography sx={{
                                            fontSize: 14,
                                            cursor: "pointer",
                                            whiteSpace: "nowrap",
                                        }}>{item.label}</Typography>
                                    }
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Drawer>
            </Box>

            {/* Second Level Drawer */}
            {hasSecondLevelMenu ? (
                <>
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: secondDrawerWidth,
                            flexShrink: 0,
                            transition: "width 180ms ease",
                            "& .MuiDrawer-paper": {
                                width: secondDrawerWidth,
                                height: `calc(100vh - ${HEADER_HEIGHT}px)`,
                                boxSizing: "border-box",
                                borderRight: "1px solid",
                                borderColor: "divider",
                                bgcolor: "background.paper",
                                p: 0,
                                top: `${HEADER_HEIGHT}px`,
                                left: secondDrawerLeft,
                                position: "fixed",
                                transition: "width 180ms ease",
                                overflow: "hidden",
                                zIndex: 1,
                            },
                        }}
                    >
                        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
                            {!isSecondLevelCollapsed ? (
                                <Box sx={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>

                                    <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
                                        <Typography sx={{ fontSize: 15, fontWeight: 700 }}>{activeFirstLevelLabel}</Typography>
                                    </Box>

                                    <List sx={{ flex: 1, overflowY: "auto" }}>
                                        {secondMenus.map((menu) => {
                                            const hasChildren = Boolean(menu.children?.length);
                                            const isGroupOpen = openSecondGroups[menu.key] ?? false;

                                            if (!hasChildren) {
                                                return (
                                                    <ListItemButton
                                                        key={menu.key}
                                                        selected={menu.key === activeSecondLevelKey}
                                                        onClick={() => handleSecondLevelClick(menu)}
                                                        sx={{
                                                            // borderRadius: 1,
                                                            mb: 0.5,
                                                            // mx: 1,
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <ListItemIcon sx={{
                                                            minWidth: 32,
                                                            cursor: "pointer",

                                                        }}>{menu.icon}</ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Typography sx={{
                                                                    fontSize: 14,
                                                                    cursor: "pointer",

                                                                }}>{menu.label}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                );
                                            }

                                            return (
                                                <Box key={menu.key}>
                                                    <ListItemButton
                                                        selected={menu.key === activeSecondLevelKey || Boolean(activeThirdLevelKey && menu.children?.some((child) => child.key === activeThirdLevelKey))}
                                                        onClick={() => handleSecondGroupToggle(menu.key)}
                                                        sx={{ mb: 0.5, cursor: "pointer" }}
                                                    >


                                                        <ListItemIcon sx={{ minWidth: 32, cursor: "pointer" }}>{menu.icon}</ListItemIcon>
                                                        <ListItemText
                                                            primary={<Typography sx={{ fontSize: 14, cursor: "pointer" }}>{menu.label}</Typography>}
                                                        />
                                                        {isGroupOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                                                    </ListItemButton>

                                                    <Collapse in={isGroupOpen} timeout="auto" unmountOnExit>
                                                        <List disablePadding sx={{ pl: 0 }}>
                                                            {menu.children?.map((child) => (
                                                                <ListItemButton
                                                                    key={child.key}
                                                                    selected={child.key === activeThirdLevelKey}
                                                                    onClick={() => handleThirdLevelClick(menu, child)}
                                                                    sx={{ mb: 0.5, cursor: "pointer" }}
                                                                >
                                                                    <ListItemIcon sx={{ minWidth: 28, cursor: "pointer" }}>{child.icon}</ListItemIcon>
                                                                    <ListItemText
                                                                        primary={<Typography sx={{ fontSize: 13, cursor: "pointer" }}>{child.label}</Typography>}
                                                                    />
                                                                </ListItemButton>
                                                            ))}
                                                        </List>
                                                    </Collapse>
                                                </Box>
                                            );
                                        })}
                                    </List>
                                </Box>
                            ) : null}
                        </Box>
                    </Drawer>

                    <Box
                        sx={{
                            position: "fixed",
                            left: toggleButtonLeft,
                            bottom: 12,
                            zIndex: 10,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: "50%",
                            boxShadow: 1,
                            transition: "left 180ms ease",
                        }}
                    >
                        <IconButton
                            size="small"
                            onClick={handleSecondLevelCollapseToggle}
                        >
                            {isSecondLevelCollapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
                        </IconButton>
                    </Box>
                </>
            ) : null}
        </Box >
    );
};

export default Sidebar2;
