import "@mui/material/styles"

declare module "@mui/material/styles" {
    interface Palette {
        semantic: {
            borderSubtle: string
            surfaceSubtle: string
            textMuted: string
        }
    }

    interface PaletteOptions {
        semantic?: {
            borderSubtle?: string
            surfaceSubtle?: string
            textMuted?: string
        }
    }
}

export { }
