import type { PaletteMode } from "@mui/material";
import { createContext, useContext, type ReactNode } from "react";

interface ThemeModeContextValue {
    mode: PaletteMode;
    setMode: (mode: PaletteMode) => void;
    toggleTheme: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

interface ThemeModeProviderProps extends ThemeModeContextValue {
    children: ReactNode;
}

const ThemeModeProvider = ({ children, mode, setMode, toggleTheme }: ThemeModeProviderProps) => {
    return (
        <ThemeModeContext.Provider value={{ mode, setMode, toggleTheme }}>
            {children}
        </ThemeModeContext.Provider>
    );
};

const useThemeMode = () => {
    const context = useContext(ThemeModeContext);

    if (!context) {
        throw new Error("useThemeMode must be used within ThemeModeProvider");
    }

    return context;
};

export { ThemeModeProvider, useThemeMode };
