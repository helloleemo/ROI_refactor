import type { SxProps, Theme } from "@mui/material";
import { FIRST_COLLAPSED_WIDTH } from "@/settings";

export const sidebarRootSx = (secondWidth: number): SxProps<Theme> => ({
    display: "flex",
    height: "100%",
    position: "relative",
    width: FIRST_COLLAPSED_WIDTH + secondWidth,
    minWidth: FIRST_COLLAPSED_WIDTH + secondWidth,
    flexShrink: 0,
    transition: "width 180ms cubic-bezier(0.5, 1, 0.54, 1)",
});

export const firstDrawerSx = (firstWidth: number): SxProps<Theme> => ({
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
        bgcolor: "semantic.surfaceSubtle",
        zIndex: (theme: Theme) => theme.zIndex.drawer + 2,
    },
});

export const firstDrawerContentSx: SxProps<Theme> = {
    height: "100%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between",
};

export const firstLevelListSx: SxProps<Theme> = {
    py: 1,
    display: "flex",
    p: 1,
    flexDirection: "column",
    gap: 0.5,
};

export const firstLevelItemButtonSx = (isFirstHovered: boolean): SxProps<Theme> => ({
    minHeight: 46,
    px: isFirstHovered ? 1.5 : 1,
    mx: 0,
    justifyContent: isFirstHovered ? "flex-start" : "center",
    borderRadius: 1,
});

export const firstLevelItemIconSx = (isFirstHovered: boolean): SxProps<Theme> => ({
    minWidth: 0,
    mr: isFirstHovered ? 1.4 : 0,
    justifyContent: "center",
    color: "inherit",
});

export const firstLevelIconSpanSx: SxProps<Theme> = {
    display: "flex",
    color: "text.primary",
};

export const firstLevelLabelWrapSx = (isFirstHovered: boolean): SxProps<Theme> => ({
    overflow: "hidden",
    maxWidth: isFirstHovered ? 180 : 0,
    opacity: isFirstHovered ? 1 : 0,
    transform: isFirstHovered ? "translateX(0)" : "translateX(-8px)",
    transition: "max-width 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease, transform 260ms ease",
    whiteSpace: "nowrap",
});

export const versionWrapSx: SxProps<Theme> = {
    mt: "auto",
    p: 1.5,
};

export const versionTextSx = (isFirstHovered: boolean): SxProps<Theme> => ({
    fontSize: 12,
    color: "text.disabled",
    textAlign: isFirstHovered ? "left" : "center",
});

export const secondDrawerSx = (secondWidth: number, isSecondOpen: boolean): SxProps<Theme> => ({
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
});

export const secondDrawerHeaderWrapSx = (isSecondOpen: boolean): SxProps<Theme> => ({
    p: 1,
    display: "flex",
    alignItems: "center",
    minHeight: 48,
    opacity: isSecondOpen ? 1 : 0,
    transform: isSecondOpen ? "translateX(0)" : "translateX(-10px)",
    transition: "opacity 220ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
    pointerEvents: isSecondOpen ? "auto" : "none",
});

export const secondDrawerHeaderTextSx: SxProps<Theme> = {
    fontSize: 14,
    color: "text.secondary",
    pl: 1,
    whiteSpace: "nowrap",
    cursor: "pointer",

};

export const secondDrawerContentSx = (isSecondOpen: boolean): SxProps<Theme> => ({
    opacity: isSecondOpen ? 1 : 0,
    transform: isSecondOpen ? "translateX(0)" : "translateX(-12px)",
    transition: "opacity 220ms ease, transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
    pointerEvents: isSecondOpen ? "auto" : "none",
});

export const secondLevelListSx: SxProps<Theme> = {
    py: 1,
    display: "flex",
    flexDirection: "column",
    gap: 0.5,
};

export const secondLevelItemButtonSx: SxProps<Theme> = {
    px: 1.5,
    cursor: "pointer",
};

export const secondLevelItemIconSx: SxProps<Theme> = {
    minWidth: 32,
    cursor: "pointer",

};

export const secondChildListSx: SxProps<Theme> = {
    py: 1,
    display: "flex",
    flexDirection: "column",
    gap: 0.5,
};

export const secondChildItemButtonSx: SxProps<Theme> = {
    pl: 4,
};

export const toggleSecondDrawerButtonSx = (secondWidth: number): SxProps<Theme> => ({
    position: "absolute",
    bottom: 20,
    left: FIRST_COLLAPSED_WIDTH + secondWidth - 20,
    zIndex: (theme: Theme) => theme.zIndex.drawer + 3,
    bgcolor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
});
