import CssBaseline from "@mui/material/CssBaseline"
import type { PaletteMode } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ThemeProvider } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from './routes/routes'
import { darkTheme, lightTheme } from './settings/theme'
import { ThemeModeProvider } from "./settings/themeMode"
import "./settings/main.css"

const THEME_MODE_STORAGE_KEY = "theme-mode"

function AppRoot() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const [mode, setMode] = useState<PaletteMode>("light")

  useEffect(() => {
    const storedMode = window.localStorage.getItem(THEME_MODE_STORAGE_KEY)

    if (storedMode === "light" || storedMode === "dark") {
      setMode(storedMode)
      return
    }

    setMode(prefersDarkMode ? "dark" : "light")
  }, [prefersDarkMode])

  useEffect(() => {
    window.localStorage.setItem(THEME_MODE_STORAGE_KEY, mode)
  }, [mode])

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

  const theme = mode === "dark" ? darkTheme : lightTheme

  return (
    <ThemeModeProvider mode={mode} setMode={setMode} toggleTheme={toggleTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ThemeModeProvider>
  )
}

createRoot(document.getElementById('root')!)
  .render(
    <AppRoot />
  )
