import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
import InformationDialog from "../InformationDialog";
import { Menu, MenuItem } from "@mui/material";
import { currency } from "@/settings/currency";
import { profile } from "@/settings/profile";
import { notifications } from "@/mock/notifications";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProject } from "@/contexts/ProjectContext";
import PATHS from "@/routes/paths";
import { headerTranslationKey } from "@/settings/languageTranslationKey";
import { getUiText } from "@/utils/getUiText";
// import { useUiTextsNested } from "@/hooks/useUiTextsNested";

function ResponsiveAppBar() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    // const { query: { data } } = useUiTextsNested("header")


    const { anchorEl,
        open,
        handleClick,
        handleClose,
        handleOpen, } = useMenuToggle();
    const { toggleTheme } = useThemeMode();
    const [searchValue, setSearchValue] = useState("");
    const { locale, changeLocale, supportedLocales, enabledLocales } = useLanguage();
    const { projects, setCurrentProject } = useProject();

    const siteSuggestions = useMemo(
        () => projects.map((project) => project.name),
        [projects],
    );

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const handleSearchSuggestionSelect = (value: string) => {
        const project = projects.find((item) => item.name === value);
        if (project) {
            setCurrentProject(project);
            navigate(`/${project.id}`, { replace: true });
        }
        setSearchValue("");
    };

    const handleLanguageChange = async (language: string) => {
        await changeLocale(language);
        handleClose("languages");
    };

    const handleProfileMenuItemClick = (value: string, route: string) => {
        handleClose(value);
        navigate(route)
    };

    // const getText = (key: string) => {
    //     const translation = getUiText(key, data ?? []);
    //     return translation;
    // }


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
                                onClick={() => navigate(PATHS.root)}
                                sx={{
                                    color: "semantic.brandAdaptive",
                                    cursor: "pointer",
                                    fontSize: "1.2rem",
                                    fontWeight: 600,
                                    display: { xs: "none", md: "block" }
                                }}
                            >
                                ROI TOOL
                            </Typography>
                            <Box
                                sx={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5
                                }}>
                                <HierarchyOptions /></Box>
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
                                icon={<Currency width={32} height={32} />}
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
                                icon={<Language width={32} height={32} />}
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
                                    supportedLocales
                                        .filter((language) => enabledLocales.includes(language.value))
                                        .map((language) => (
                                            <MenuItem
                                                key={language.value}
                                                selected={language.value === locale}
                                                onClick={() => handleLanguageChange(language.value)}
                                            >
                                                {language.label}
                                            </MenuItem>
                                        ))
                                }
                            </Menu>

                            {/* Notifications */}
                            <SharedIconButton
                                onClick={(e) => handleClick(e, "notifications")}
                                icon={<Notification width={32} height={32} />}
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
                                icon={<Reason width={32} height={32} />}
                                ariaLabel="Open help menu"
                                sx={{
                                    p: 0.5,
                                }}
                            />

                            {/* User */}
                            <SharedIconButton
                                onClick={(e) => handleClick(e, "user")}
                                icon={<User width={32} height={32} />}
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
                                        if (item.value === "header.profile.theme") {
                                            return (
                                                <MenuItem key={item.label} onClick={() => {
                                                    handleClose("user");
                                                    toggleTheme();
                                                }} sx={{ gap: 1 }}>
                                                    <ItemIcon width={20} height={20} />
                                                    {t("header.profile.theme")}
                                                </MenuItem>
                                            );
                                        }

                                        if (item.value === "header.profile.about") {
                                            return (
                                                <MenuItem key={item.label} onClick={() => {
                                                    handleClose("user");
                                                    handleOpen("aboutApplication");
                                                }} sx={{ gap: 1 }}>
                                                    <ItemIcon width={20} height={20} />
                                                    {t("header.profile.about")}
                                                </MenuItem>
                                            );
                                        } else {
                                            return (
                                                <MenuItem key={item.label} onClick={() => handleProfileMenuItemClick("user", item.route)}>
                                                    <ItemIcon width={20} height={20} />
                                                    {t(item.value)}
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
                contentText="If you need support, please contact the administrator."
                buttonText="Close"
            />

            {/* About Application */}
            <InformationDialog
                open={open["aboutApplication"]}
                onClose={() => handleClose("aboutApplication")}
                title="About Application"
                contentText="ROI TOOL"
                buttonText="Close"
            />
        </>
    );
}
export default ResponsiveAppBar;