import "@mui/material/styles"

declare module "@mui/material/styles" {
    interface Palette {
        semantic: {
            borderSubtle: string
            surfaceSubtle: string
            headerSubtle: string
            textMuted: string
            brandAdaptive: string
            errorAdaptive: string
        }
        chart: {
            seriesColors: string[]
            actualLine: string
            predictLine: string
            scatterDot: string
            perfectFitLine: string
            testBandFill: string
            testBandLabel: string
        }
    }

    interface PaletteOptions {
        semantic?: {
            borderSubtle?: string
            surfaceSubtle?: string
            headerSubtle?: string
            textMuted?: string
            brandAdaptive?: string
            errorAdaptive?: string
        }
        chart?: {
            seriesColors?: string[]
            actualLine?: string
            predictLine?: string
            scatterDot?: string
            perfectFitLine?: string
            testBandFill?: string
            testBandLabel?: string
        }
    }
}

export { }
