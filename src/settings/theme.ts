import { createTheme, type ThemeOptions } from "@mui/material/styles"
import type { } from "@mui/x-data-grid/themeAugmentation"

const stateTokens = {
    light: {
        hover: "rgba(220, 220, 220, 0.5)",
        selected: "#F0FAFE",
        selectedText: "#0087DC",
        disabledText: "#CCCCCC",
        disabledBg: "#EFEEEE",
        border: "#EFEEEE",
        dialogPaper: "#FFFFFF",
        dialogBackdrop: "rgba(249, 249, 249, 0.5)",
        gridHeader: "#DCDCDC",
    },
    dark: {
        hover: "rgba(102, 102, 102, 0.5)",
        selected: "#0087DC",
        selectedText: "#FFFFFF",
        disabledText: "#666666",
        disabledBg: "#515151",
        border: "#515151",
        dialogPaper: "#262626",
        dialogBackdrop: "rgba(51, 51, 51, 0.5)",
        gridHeader: "#3C3C3C",
    },
} as const

const semanticPaletteTokens = {
    light: {
        borderSubtle: "#EFEEEE",
        surfaceSubtle: "#F9F9F9",
        textMuted: "#CCCCCC",
    },
    dark: {
        borderSubtle: "#515151",
        surfaceSubtle: "#333333",
        textMuted: "#515151",
    },
} as const

const getComponentOverrides = (mode: "light" | "dark"): ThemeOptions["components"] => {
    const token = stateTokens[mode]

    return {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    borderColor: token.border,
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: token.gridHeader,
                        borderBottomColor: token.border,
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottomColor: token.border,
                    },
                    "& .MuiDataGrid-row:hover": {
                        backgroundColor: token.hover,
                    },
                    "& .MuiDataGrid-row.Mui-selected:hover": {
                        filter: "brightness(0.96)",
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
                    backgroundColor: token.dialogBackdrop,
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
        text: {
            primary: "#262626",
            secondary: "#979797",
        },
        divider: "#EFEEEE",
        action: {
            active: "#262626",
            hover: "rgba(220, 220, 220, 0.5)",
            selected: "#F0FAFE",
            disabled: "#CCCCCC",
            disabledBackground: "#EFEEEE",
        },
        grey: {
            50: "#F9F9F9",
            100: "#EFEEEE",
            200: "#DCDCDC",
            300: "#CCCCCC",
            400: "#979797",
            500: "#666666",
            600: "#515151",
            700: "#3C3C3C",
            800: "#333333",
            900: "#262626",
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
        text: {
            primary: "#FFFFFF",
            secondary: "#979797",
        },
        divider: "#515151",
        action: {
            active: "#FFFFFF",
            hover: "rgba(102, 102, 102, 0.5)",
            selected: "#0087DC",
            disabled: "#666666",
            disabledBackground: "#515151",
        },
        grey: {
            50: "#F9F9F9",
            100: "#EFEEEE",
            200: "#DCDCDC",
            300: "#CCCCCC",
            400: "#979797",
            500: "#666666",
            600: "#515151",
            700: "#3C3C3C",
            800: "#333333",
            900: "#262626",
        },
    },
})

export { lightTheme, darkTheme }
