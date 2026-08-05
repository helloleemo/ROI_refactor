import CssBaseline from "@mui/material/CssBaseline"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ThemeProvider } from "@mui/material/styles"
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from './routes/routes'
import { darkTheme, lightTheme } from './settings/theme'

function AppRoot() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const theme = prefersDarkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!)
  .render(
    <AppRoot />
  )
