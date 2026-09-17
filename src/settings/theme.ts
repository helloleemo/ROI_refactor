import { createTheme, type ThemeOptions } from "@mui/material/styles"
import type { } from "@mui/x-data-grid/themeAugmentation"

const grayScale = {
    light: {
        50: "#F9F9F9",
        100: "#EFEEEE",
        200: "#CCCCCC",
        300: "#979797",
        400: "#A0A0A0",
        500: "#666666",
        600: "#515151",
        700: "#262626",
        800: "#1F1F1F",
        900: "#000000",
    },
    dark: {
        50: "#262626",
        100: "#3A3A3A",
        200: "#4A4A4A",
        300: "#5E5E5E",
        400: "#7A7A7A",
        500: "#8F8F8F",
        600: "#A9A9A9",
        700: "#CFCFCF",
        800: "#E8E8E8",
        900: "#FFFFFF",
    },
} as const

const stateTokens = {
    light: {
        hover: "rgba(220, 220, 220, 0.5)",
        selected: "#F0FAFE",
        selectedText: "#0087DC",
        disabledText: grayScale.light[200],
        disabledBg: grayScale.light[100],
        border: grayScale.light[100],
        gridBackground: "#FFFFFF",
        dialogPaper: "#FFFFFF",
        dialogBackdrop: "rgba(249, 249, 249, 0.5)",
    },
    dark: {
        hover: "rgba(102, 102, 102, 0.5)",
        selected: "#0087DC",
        selectedText: "#FFFFFF",
        disabledText: grayScale.dark[400],
        disabledBg: grayScale.dark[200],
        border: grayScale.dark[200],
        gridBackground: grayScale.dark[50],
        dialogPaper: grayScale.dark[50],
        dialogBackdrop: "rgba(51, 51, 51, 0.5)",

    },
} as const

const semanticPaletteTokens = {
    light: {
        borderSubtle: grayScale.light[100],
        surfaceSubtle: grayScale.light[50],
        headerSubtle: "#F5F5F5",
        textMuted: grayScale.light[200],
        brandAdaptive: "#0087DC",
        errorAdaptive: "#EA6259",
    },
    dark: {
        borderSubtle: grayScale.dark[200],
        surfaceSubtle: grayScale.dark[100],
        headerSubtle: grayScale.dark[100],
        textMuted: grayScale.dark[300],
        brandAdaptive: "#FFFFFF",
        errorAdaptive: "#FF8A80",
    },
} as const

const getComponentOverrides = (mode: "light" | "dark"): ThemeOptions["components"] => {
    const token = stateTokens[mode]
    const semanticToken = semanticPaletteTokens[mode]

    return {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: token.gridBackground,
                    "--DataGrid-rowBorderColor": token.border,
                    "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller": {
                        backgroundColor: `${semanticToken.headerSubtle} !important`,
                        borderBottomColor: token.border,
                    },
                    "& .MuiDataGrid-main, & .MuiDataGrid-mainContent, & .MuiDataGrid-virtualScroller, & .MuiDataGrid-virtualScrollerContent, & .MuiDataGrid-virtualScrollerRenderZone, & .MuiDataGrid-row, & .MuiDataGrid-contentFiller, & .MuiDataGrid-filler, & .MuiDataGrid-filler--pinnedLeft, & .MuiDataGrid-filler--pinnedRight, & .MuiDataGrid-overlayWrapper, & .MuiDataGrid-overlayWrapperInner, & .MuiDataGrid-noRowsOverlay, & .MuiDataGrid-footerContainer": {
                        backgroundColor: token.gridBackground,
                    },
                    "& .MuiDataGrid-cell": {
                        backgroundColor: token.gridBackground,
                        borderBottomColor: token.border,
                        fontSize: 14,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-cell--withLeftBorder, & .MuiDataGrid-columnHeader--withLeftBorder": {
                        borderLeftColor: token.border,
                    },
                    "& .MuiDataGrid-cell--withRightBorder, & .MuiDataGrid-columnHeader--withRightBorder": {
                        borderRightColor: token.border,
                    },
                    "& .MuiDataGrid-row:hover": {
                        backgroundColor: token.hover,
                    },
                    "& .MuiDataGrid-row.Mui-selected:hover": {
                        filter: "brightness(0.96)",
                    },
                    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                        outline: "none",
                    },
                    "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
                        outline: "none",
                    },
                    "& .MuiDataGrid-cell .MuiIconButton-root.Mui-disabled": {
                        color: token.disabledText,
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: token.dialogPaper,
                    border: `1px solid ${token.border}`,
                    "& .MuiIconButton-root:hover": {
                        backgroundColor: token.hover,
                    },
                    "& .MuiIconButton-root.Mui-disabled": {
                        color: token.disabledText,
                    },
                    "& .MuiTab-root:hover": {
                        backgroundColor: token.hover,
                    },
                    "& .MuiTab-root.Mui-selected": {
                        color: token.selectedText,
                    },
                    "& .MuiTab-root.Mui-disabled": {
                        color: token.disabledText,
                    },
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    // backgroundColor: token.dialogBackdrop,
                },
            },
        },
    }
}

const commonTheme: ThemeOptions = {
    typography: {
        fontFamily: '"Noto Sans SC", "Noto Sans TC", "Inter", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: "2rem",
            fontWeight: 700,
        },
        h2: {
            cursor: "default",
        },
        h4: {
            fontSize: "1.5rem",
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
}

const lightTheme = createTheme({
    ...commonTheme,
    components: getComponentOverrides("light"),
    palette: {
        mode: "light",
        semantic: semanticPaletteTokens.light,
        primary: {
            main: "#0087DC",
            light: "#53BDFF",
            dark: "#005995",
        },
        secondary: {
            main: "#64D7D7",
            light: "#A5E2FA",
            dark: "#4C96C7",
        },
        success: {
            main: "#0D964D",
        },
        warning: {
            main: "#F0C020",
        },
        error: {
            main: "#EA6259",
        },
        info: {
            main: "#00BEA5",
        },
        background: {
            default: "#EEF2F6",
            paper: "#FFFFFF",
        },
        DataGrid: {
            bg: "#FFFFFF",
            headerBg: semanticPaletteTokens.light.headerSubtle,
            pinnedBg: "#FFFFFF",
        },
        chart: {
            seriesColors: ["#0087DC", "#64D7D7", "#0D964D", "#F0C020", "#EA6259", "#00BEA5"],
            actualLine: "#0087DC",
            predictLine: "#64D7D7",
            scatterDot: "rgba(0, 135, 220, 0.45)",
            perfectFitLine: "#EA6259",
            testBandFill: "rgba(100, 215, 215, 0.12)",
            testBandLabel: "#4C96C7",
        },
        text: {
            primary: grayScale.light[700],
            secondary: grayScale.light[300],
        },
        divider: grayScale.light[100],
        action: {
            active: grayScale.light[700],
            hover: "rgba(220, 220, 220, 0.5)",
            selected: "#F0FAFE",
            disabled: grayScale.light[200],
            disabledBackground: grayScale.light[100],
        },
        grey: {
            50: grayScale.light[50],
            100: grayScale.light[100],
            200: grayScale.light[200],
            300: grayScale.light[300],
            400: grayScale.light[400],
            500: grayScale.light[500],
            600: grayScale.light[600],
            700: grayScale.light[700],
            800: grayScale.light[800],
            900: grayScale.light[900],
        },
    },
})

const darkTheme = createTheme({
    ...commonTheme,
    components: getComponentOverrides("dark"),
    palette: {
        mode: "dark",
        semantic: semanticPaletteTokens.dark,
        primary: {
            main: "#0087DC",
            light: "#53BDFF",
            dark: "#005995",
        },
        secondary: {
            main: "#64D7D7",
            light: "#A5E2FA",
            dark: "#4C96C7",
        },
        success: {
            main: "#0D964D",
        },
        warning: {
            main: "#F0C020",
        },
        error: {
            main: "#EA6259",
        },
        info: {
            main: "#00BEA5",
        },
        background: {
            default: "#000000",
            paper: "#262626",
        },
        DataGrid: {
            bg: "#262626",
            headerBg: semanticPaletteTokens.dark.headerSubtle,
            pinnedBg: "#262626",
        },
        chart: {
            seriesColors: ["#4DD0E1", "#FFD54F", "#53BDFF", "#A5E2FA", "#4CAF50", "#FF8A80"],
            actualLine: "#53BDFF",
            predictLine: "#A5E2FA",
            scatterDot: "rgba(83, 189, 255, 0.45)",
            perfectFitLine: "#FF8A80",
            testBandFill: "rgba(165, 226, 250, 0.12)",
            testBandLabel: "#A5E2FA",
        },
        text: {
            primary: grayScale.dark[900],
            secondary: grayScale.dark[500],
        },
        divider: grayScale.dark[200],
        action: {
            active: grayScale.dark[900],
            hover: "rgba(102, 102, 102, 0.5)",
            selected: "#0087DC",
            disabled: grayScale.dark[400],
            disabledBackground: grayScale.dark[200],
        },
        grey: {
            50: grayScale.dark[50],
            100: grayScale.dark[100],
            200: grayScale.dark[200],
            300: grayScale.dark[300],
            400: grayScale.dark[400],
            500: grayScale.dark[500],
            600: grayScale.dark[600],
            700: grayScale.dark[700],
            800: grayScale.dark[800],
            900: grayScale.dark[900],
        },
    },
})

export { lightTheme, darkTheme }
