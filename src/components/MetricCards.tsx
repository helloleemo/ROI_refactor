import type { ReactNode } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export interface MetricItem {
    key: string;
    label: ReactNode;
    value: number | null | undefined;
    unit?: string;
}

interface MetricCardsProps {
    items: MetricItem[];
    locale?: string;
    startIndex?: number;
}

const MetricCards = ({ items, locale, startIndex = 0 }: MetricCardsProps) => {
    const formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 2 }}>
            {items.map((item, index) => (
                <Card
                    key={item.key}
                    variant="outlined"
                    sx={{
                        height: "100%",
                        minWidth: 0,
                        borderRadius: 2,
                        boxShadow: "none",
                        animation: "metricReveal 300ms ease-out both",
                        animationDelay: `${(startIndex + index) * 60}ms`,
                        "@keyframes metricReveal": {
                            from: { opacity: 0, transform: "translateY(12px)" },
                            to: { opacity: 1, transform: "translateY(0)" },
                        },
                        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                    }}
                >
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, overflowWrap: "anywhere" }}>
                            {item.label}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, overflowWrap: "anywhere" }}>
                                {item.value == null || !Number.isFinite(item.value) ? "-" : formatter.format(item.value)}
                            </Typography>
                            {item.unit && <Typography variant="body2" color="text.secondary">{item.unit}</Typography>}
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default MetricCards;