import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMemo, useState } from "react";
import useMenuToggle from "@/hooks/useMenuToggle";
import SharedIconButton from "../IconButton";
import {
    N36x36Language as Language,
    Help as Reason,
    N36x36Account as User,
    N36x36Notification as Notification,
    N36x36Currency as Currency,
} from "@/components/icons";
import DateNow from "./DateNow";
import HierarchyOptions from "./HierarchyOptions";
import SearchSite from "./SearchSite";
import { hierarchyData } from "./hierarchyData";
import InformationDialog from "../InformationDialog";
import { Menu, MenuItem } from "@mui/material";
import { currency } from "@/settings/currency";
import { languages } from "@/settings/languages";
import { profile } from "@/settings/profile";
import { notifications } from "@/mock/notifications";
import { useThemeMode } from "@/settings/themeMode";

const getDefaultSite = () => {
    const firstCompany = hierarchyData[0];
    if (!firstCompany) return "";

    const firstGroupSites = Object.values(firstCompany.groups)[0];
    return firstGroupSites?.[0] ?? "";
};

function ResponsiveAppBar() {
    const { anchorEl,
        open,
        handleClick,
        handleClose,
        handleOpen, } = useMenuToggle();
    const { toggleTheme } = useThemeMode();
    const [searchValue, setSearchValue] = useState("");
    const [selectedSite, setSelectedSite] = useState(getDefaultSite);


    const siteSuggestions = useMemo(
        () =>
            Array.from(
                new Set(
                    hierarchyData.flatMap((company) =>
                        Object.values(company.groups).flatMap((sites) => sites),
                    ),
                ),
            ),
        [],
    );

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const handleHierarchySiteChange = (value: string) => {
        setSelectedSite(value);
    };

    const handleSearchSuggestionSelect = (value: string) => {
        setSelectedSite(value);
        setSearchValue("");
    };


    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: "background.paper",
                    "& .MuiToolbar-root": {
                        height: 58,
                    },
                    zIndex: (theme) => theme.zIndex.drawer + 3,
                }}
            >
                <Container
                    maxWidth={false}
                    disableGutters
                >
                    <Toolbar
                        sx={{
                            width: "100%",
                            px: 2,
                        }}
                    >
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5
                        }}>
                            <img src="/DeltaLogo.svg" alt="Logo" style={{
                                width: "100px",
                                height: "40px"
                            }} />
                            <Box sx={{
                                width: "1px",
                                height: "30px",
                                mx: 1,
                                backgroundColor: "semantic.borderSubtle"
                            }} />
                            <Typography
                                sx={{
                                    color: "semantic.brandAdaptive",
                                    fontSize: "1.2rem",
                                    fontWeight: 600,
                                    display: { xs: "none", md: "block" }
                                }}
                            >
                                ROI TOOL
                            </Typography>
                            <HierarchyOptions
                                selectedSite={selectedSite}
                                onSiteChange={handleHierarchySiteChange}
                            />
                            <SearchSite
                                value={searchValue}
                                sx={{
                                    width: { xs: 200, md: 320 },
                                    display: {
                                        xs: "none",
                                        sm: "none",
                                        md: "none",
                                        lg: "none",
                                        xl: "block",
                                    },
                                }}
                                suggestions={siteSuggestions}
                                onChange={handleSearchChange}
                                onSelectSuggestion={handleSearchSuggestionSelect}
                            />
                            <Typography
                                variant="h5"
                                noWrap
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                LOGO
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            gap: 1,
                            ml: "auto",
                            alignItems: "center",
                        }}>
                            <Typography sx={{
                                color: "text.secondary",
                                display: {
                                    xs: "none",
                                    sm: "none",
                                    md: "none",
                                    lg: "block",
                                    xl: "block",
                                }
                            }}>
                                <DateNow />
                            </Typography>

                            {/* Currency */}
                            <SharedIconButton
                                id={"currencyButton"}
                                onClick={(e) => handleClick(e, "currency")}
                                icon={<Currency width={40} height={40} />}
                                ariaLabel="Open currency menu"
                                sx={{
                                    p: 0.5,
                                }}
                            />
                            <Menu
                                id={"currencyMenu"}
                                anchorEl={anchorEl}
                                open={open["currency"]}
                                onClose={() => {
                                    handleClose("currency")
                                }}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': "currencyButton",
                                    },
                                }}
                            >
                                {
                                    currency.map((currency) => (
                                        <MenuItem key={currency.label} onClick={() => handleClose("currency")}>
                                            {currency.currency}
                                        </MenuItem>
                                    ))
                                }
                            </Menu>

                            {/* Languages */}
                            <SharedIconButton
                                onClick={(e) => handleClick(e, "languages")}
                                icon={<Language width={36} height={36} />}
                                ariaLabel="Open language menu"
                            />
                            <Menu
                                id={"languages"}
                                anchorEl={anchorEl}
                                open={open["languages"]}
                                onClose={() => {
                                    handleClose("languages")
                                }}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': "languages",
                                    },
                                }}
                            >
                                {
                                    languages.map((language) => (
                                        <MenuItem key={language.label} onClick={() => handleClose("languages")}>
                                            {language.label}
                                        </MenuItem>
                                    ))
                                }
                            </Menu>

                            {/* Notifications */}
                            <SharedIconButton
                                onClick={(e) => handleClick(e, "notifications")}
                                icon={<Notification width={36} height={36} />}
                                ariaLabel="Open notifications menu"
                                sx={{
                                    p: 0.5,
                                }}
                            />
                            <Menu
                                id={"notifications"}
                                anchorEl={anchorEl}
                                open={open["notifications"]}
                                onClose={() => {
                                    handleClose("notifications")
                                }}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': "notifications",
                                    },
                                }}
                            >
                                {
                                    notifications.map((notification) => (
                                        <MenuItem
                                            key={notification.label} onClick={() => handleClose("notifications")}
                                        >

                                            <Box sx={{
                                                width: "320px",
                                                display: "flex",
                                                flexDirection: "column",
                                                minWidth: 0,
                                            }}>

                                                <Typography
                                                    sx={{
                                                        whiteSpace: "normal",
                                                        overflowWrap: "anywhere",
                                                        wordBreak: "break-word",
                                                    }}>
                                                    {notification.label}
                                                </Typography>
                                                <Typography variant="body2"
                                                    sx={{
                                                        whiteSpace: "normal",
                                                        overflowWrap: "anywhere",
                                                        wordBreak: "break-word",
                                                        color: "text.secondary",

                                                    }}
                                                >
                                                    {notification.value}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    ))
                                }
                            </Menu>

                            {/* Help & Support */}
                            <SharedIconButton
                                onClick={(e) => handleClick(e, "helpAndSupport")}
                                icon={<Reason width={38} height={38} />}
                                ariaLabel="Open help and support menu"
                                sx={{
                                    p: 0.5,
                                }}
                            />

                            {/* User */}
                            <SharedIconButton
                                onClick={(e) => handleClick(e, "user")}
                                icon={<User width={42} height={42} />}
                                ariaLabel="Open user menu"
                            />
                            <Menu
                                id={"user"}
                                anchorEl={anchorEl}
                                open={open["user"]}
                                onClose={() => {
                                    handleClose("user")
                                }}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': "user",
                                    },
                                }}
                            >
                                {
                                    profile.map((item) => {
                                        const ItemIcon = item.icon;
                                        if (item.value === "theme") {
                                            return (
                                                <MenuItem key={item.label} onClick={() => {
                                                    handleClose("user");
                                                    toggleTheme();
                                                }} sx={{ gap: 1 }}>
                                                    <ItemIcon width={20} height={20} />
                                                    {item.label}
                                                </MenuItem>
                                            );
                                        }

                                        if (item.value === "about") {
                                            return (
                                                <MenuItem key={item.label} onClick={() => {
                                                    handleClose("user");
                                                    handleOpen("aboutApplication");
                                                }} sx={{ gap: 1 }}>
                                                    <ItemIcon width={20} height={20} />
                                                    {item.label}
                                                </MenuItem>
                                            );
                                        } else {
                                            return (

                                                <MenuItem key={item.label} onClick={() => handleClose("user")} sx={{ gap: 1 }}>
                                                    <ItemIcon width={20} height={20} />
                                                    {item.label}
                                                </MenuItem>
                                            );
                                        }

                                    })
                                }
                            </Menu>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            gap: 1,
                            ml: 1
                        }}>

                        </Box>
                    </Toolbar>

                </Container>
                <Box
                    component="img"
                    src="/progressionBar.svg"
                    alt="Header Background"
                    sx={{
                        display: "block",
                        width: "100%",
                        height: "5px",
                        objectFit: "cover",
                    }}
                />

            </AppBar >

            {/* Dialogs */}

            {/* help and  support */}
            <InformationDialog
                open={open["helpAndSupport"]}
                onClose={() => handleClose("helpAndSupport")}
                title="Help & Support"
                contentText="Please visit .... to access user manual instructions. And provide your feedback or request assistance through the ....."
                buttonText="Close"
            />

            {/* About Application */}
            <InformationDialog
                open={open["aboutApplication"]}
                onClose={() => handleClose("aboutApplication")}
                title="About Application"
                contentText="This application is designed to ...."
                buttonText="Close"
            />
        </>
    );
}
export default ResponsiveAppBar;