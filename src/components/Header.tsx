import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMemo, useState } from "react";
import useMenuToggle from "@/hooks/useMenuToggle";
import SharedIconButton from "./IconButton";
import { Language, Reason, User, Notification, Currency } from "./icons";
import DateNow from "./DateNow";
import HierarchyOptions from "./HierarchyOptions";
import SearchSite from "./SearchSite";
import { hierarchyData } from "./hierarchyData";

const getDefaultSite = () => {
    const firstCompany = hierarchyData[0];
    if (!firstCompany) return "";

    const firstGroupSites = Object.values(firstCompany.groups)[0];
    return firstGroupSites?.[0] ?? "";
};

function ResponsiveAppBar() {
    const { handleClick } = useMenuToggle();
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
        <AppBar
            position="fixed"
            elevation={0}
            sx={{ 
                bgcolor: "background.paper",
                "& .MuiToolbar-root":{
                    height: 58,
                }
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
                            backgroundColor: "grey.200"
                        }} />
                        <Typography
                            sx={{
                                color: "primary.main",
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
                            sx={{ width: { xs: 220, md: 420 } }}
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
                            color: "grey.500",
                            display: { xs: "none", md: "block" }
                        }}>
                            <DateNow />
                        </Typography>
                        <SharedIconButton
                            onClick={(e) => handleClick(e, "currency")}
                            icon={<Currency width={40} height={40} />}
                            ariaLabel="Open currency menu"
                            sx={{
                                p: 0.5,
                            }}
                        />

                        <SharedIconButton
                            onClick={(e) => handleClick(e, "languages")}
                            icon={<Language width={30} height={30} />}
                            ariaLabel="Open language menu"
                        />
                        <SharedIconButton
                            onClick={(e) => handleClick(e, "notifications")}
                            icon={<Notification width={40} height={40} />}
                            ariaLabel="Open notifications menu"
                            sx={{
                                p: 0.5,
                            }}
                        />
                        <SharedIconButton
                            onClick={(e) => handleClick(e, "reason")}
                            icon={<Reason width={40} height={40} />}
                            ariaLabel="Open reason menu"
                            sx={{
                                p: 0.5,
                            }}
                        />


                        <SharedIconButton
                            onClick={(e) => handleClick(e, "user")}
                            icon={<User width={30} height={30} />}
                            ariaLabel="Open user menu"
                        />
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
    );
}
export default ResponsiveAppBar;