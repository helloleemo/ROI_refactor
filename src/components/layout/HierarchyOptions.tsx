import Box from "@mui/material/Box";
import { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useMenuToggle from "@/hooks/useMenuToggle";
import { hierarchyData } from "./hierarchyData";
import { useThemeMode } from "@/hooks/useThemeMode";

type OptionItem = {
    value: string;
    label: string;
};

const toOptions = (values: string[]): OptionItem[] =>
    values.map((value) => ({ value, label: value }));

type DemoHierarchyNode = {
    id: string;
    label: string;
    groups: Record<string, string[]>;
};

const uiHierarchy: DemoHierarchyNode[] = hierarchyData;

const companyOptions: OptionItem[] = uiHierarchy.map((item) => ({
    value: item.id,
    label: item.label,
}));

const getDefaultSelection = () => {
    const defaultCompany = uiHierarchy[0];
    const defaultGroup = defaultCompany ? Object.keys(defaultCompany.groups)[0] : "";
    const defaultSite = defaultCompany && defaultGroup
        ? defaultCompany.groups[defaultGroup]?.[0] ?? ""
        : "";

    return {
        companyId: defaultCompany?.id ?? "",
        group: defaultGroup,
        site: defaultSite,
    };
};

const resolveSelectionBySite = (site: string) => {
    for (const company of uiHierarchy) {
        for (const [groupName, sites] of Object.entries(company.groups)) {
            if (sites.includes(site)) {
                return {
                    companyId: company.id,
                    group: groupName,
                    site,
                };
            }
        }
    }

    return null;
};

type HierarchyOptionsProps = {
    selectedSite?: string;
    onSiteChange?: (site: string) => void;
};

type OptionsRenderProps = {
    title: string;
    options: OptionItem[];
    value: string;
    onChange: (value: string) => void;
    showArrow?: boolean;
};

const OptionsRender = ({ title, options, value, onChange, showArrow = true }: OptionsRenderProps) => {
    return (
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ mb: 2, color: "text.disabled", fontSize: 14, fontWeight: 500 }}>
                {title}
            </Typography>
            <Stack spacing={1.5}>
                {options.map((item) => {
                    const selected = item.value === value;

                    return (
                        <Box
                            key={item.value}
                            onClick={() => onChange(item.value)}
                            sx={(theme) => ({
                                px: 2,
                                py: 1.25,
                                borderRadius: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                cursor: "pointer",
                                color: selected
                                    ? theme.palette.mode === "dark"
                                        ? theme.palette.primary.light
                                        : theme.palette.primary.main
                                    : theme.palette.mode === "dark"
                                        ? theme.palette.semantic.brandAdaptive
                                        : theme.palette.text.primary,
                                bgcolor: selected
                                    ? theme.palette.primary.main + "1A"
                                    : "transparent",
                                transition: "background-color 0.15s ease, color 0.15s ease",
                                "&:hover": {
                                    bgcolor: !selected ? theme.palette.semantic.surfaceSubtle : undefined,
                                },
                            })}
                        >
                            <Typography sx={{ fontSize: 14, lineHeight: 1.35, color: "inherit", fontWeight: selected ? 700 : 300, }}>
                                {item.label}
                            </Typography>
                            {showArrow && selected ? <KeyboardArrowRightIcon fontSize="small" sx={{ color: 'inherit' }} /> : null}
                        </Box>
                    );
                })}
            </Stack >
        </Box >
    );
};

const HierarchyOptions = ({ selectedSite, onSiteChange }: HierarchyOptionsProps) => {
    const { mode } = useThemeMode();
    const isDark = mode === "dark";
    const { anchorEl, open, handleClick, handleClose } = useMenuToggle();
    const initialSelection = getDefaultSelection();
    const [companyId, setCompanyId] = useState(initialSelection.companyId);
    const company = useMemo(
        () => uiHierarchy.find((item) => item.id === companyId) ?? uiHierarchy[0],
        [companyId],
    );

    const companyGroups = company?.groups ?? {};
    const groupOptions = toOptions(Object.keys(companyGroups));
    const [group, setGroup] = useState(initialSelection.group);

    const groupSites = companyGroups[group] ?? [];
    const siteOptions = toOptions(groupSites);
    const [site, setSite] = useState(initialSelection.site);

    useEffect(() => {
        if (!selectedSite) return;

        const selection = resolveSelectionBySite(selectedSite);
        if (!selection) return;

        if (selection.companyId !== companyId) {
            setCompanyId(selection.companyId);
        }
        if (selection.group !== group) {
            setGroup(selection.group);
        }
        if (selection.site !== site) {
            setSite(selection.site);
        }
    }, [selectedSite]);

    const handleCompanyChange = (value: string) => {
        setCompanyId(value);
        const nextCompany = uiHierarchy.find((item) => item.id === value) ?? uiHierarchy[0];
        const nextGroups = Object.keys(nextCompany.groups);
        const nextGroup = nextGroups[0];
        setGroup(nextGroup);
    };

    const handleGroupChange = (value: string) => {
        setGroup(value);
    };

    const handleSiteChange = (value: string) => {
        setSite(value);
        if (onSiteChange) {
            onSiteChange(value);
        }
        handleClose("hierarchy");
    };

    const handleMenuClose = () => {
        handleClose("hierarchy");
    };

    const isOpen = Boolean(open.hierarchy);

    return (
        <>
            <Button
                onClick={(event) => (isOpen ? handleMenuClose() : handleClick(event, "hierarchy"))}
                variant="text"
                disableRipple
                endIcon={isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                sx={{
                    minWidth: 300,
                    justifyContent: "space-between",
                    px: 2,
                    py: 1.1,
                    borderRadius: 1,
                    "&:hover": {
                        bgcolor: "semantic.surfaceSubtle",
                    },
                    color: "text.primary",
                    fontSize: "1rem",
                    fontWeight: 400,
                    textTransform: "none",
                }}
            >
                {site}
            </Button>

            <Popover
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                hideBackdrop
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            width: 850,
                            borderRadius: 2,
                            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.14)",
                        },
                    },
                }}
            >
                <ClickAwayListener onClickAway={handleMenuClose}>
                    <Box sx={{
                        px: 3,
                        py: 2.25,
                        bgcolor: "background.paper",
                    }}>
                        <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
                            <OptionsRender
                                title="Company"
                                options={companyOptions}
                                value={companyId}
                                onChange={handleCompanyChange}
                            />

                            <OptionsRender
                                title="Group"
                                options={groupOptions}
                                value={group}
                                onChange={handleGroupChange}
                            />

                            <OptionsRender
                                title="Site"
                                options={siteOptions}
                                value={site}
                                onChange={handleSiteChange}
                                showArrow={false}
                            />
                        </Box>
                    </Box>
                </ClickAwayListener>
            </Popover>
        </>
    );
};

export default HierarchyOptions;