
import { Box, Button, Card, Chip, Collapse, IconButton, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

interface RenderedCardsProps {
    optimizationList: Array<{
        id?: string | number;
        optimization_name?: string;
        remarks?: string;
    }>;
}

const safeString = (value: unknown, fallback = ""): string => {
    if (typeof value === "string") return value || fallback;
    if (value === null || value === undefined) return fallback;
    return String(value);
};

const RenderedCards = ({ optimizationList }: RenderedCardsProps) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

    const getBadgeStyle = (tone: string) => {
        const palette = {
            warning: {
                bg: alpha(theme.palette.warning.main, isDark ? 0.18 : 0.12),
                color: theme.palette.warning.main,
            },
            info: {
                bg: alpha(theme.palette.info.main, isDark ? 0.16 : 0.1),
                color: theme.palette.info.main,
            },
            success: {
                bg: alpha(theme.palette.success.main, isDark ? 0.18 : 0.12),
                color: theme.palette.success.main,
            },
        };

        return palette[tone as keyof typeof palette] ?? {
            bg: alpha(theme.palette.primary.main, isDark ? 0.18 : 0.1),
            color: theme.palette.primary.main,
        };
    };

    const toggleCard = (cardKey: string) => {
        setExpandedCards((prev) => ({
            ...prev,
            [cardKey]: !prev[cardKey],
        }));
    };

    return (
        <Stack spacing={2.5} sx={{ width: "100%" }}>
            {optimizationList.map((card, index) => {
                const title = safeString(card.optimization_name, "未命名最佳化");
                const cardKey = String(card.id ?? `${title}-${index}`);
                const summary = safeString(card.remarks, "暫無最佳化描述");
                const detailLabel = safeString(card.id, "未提供 ID");
                const badges = [
                    { label: "最佳化開機", tone: "warning" },
                    { label: "最佳化模版", tone: "info" },
                    { label: "已啟用", tone: "success" },
                ];
                const metrics = [
                    { label: "即時總能耗", value: "0.0", unit: "kW" },
                    { label: "最佳化總能耗", value: "0.0", unit: "kW" },
                    { label: "節省能耗", value: "0.0", unit: "kW (0.0%)" },
                    { label: "節能總節數", value: "0.0", unit: "kW (0.0%)" },
                ];
                const detail = [
                    { label: "最佳化 ID", value: detailLabel },
                    { label: "最佳化方法", value: "未提供" },
                    { label: "備註", value: summary },
                ];
                const delta = "0.0 / 0.0 kW 0.0%";
                const status = "即時 / 最佳化 節省";
                const isExpanded = !!expandedCards[cardKey];

                return (
                    <Card
                        key={cardKey}
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 3,
                            boxShadow: "none",
                            backgroundColor: theme.palette.background.paper,
                            overflow: "hidden",
                        }}
                    >
                        <Box sx={{ px: 2.25, py: 1.75 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: isExpanded ? 2 : 0,
                                    gap: 1,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                    <Typography
                                        component="h3"
                                        sx={{
                                            fontSize: "1.05rem",
                                            fontWeight: 700,
                                            color: theme.palette.text.primary,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                    {badges.map((badge) => {
                                        const badgeStyle = getBadgeStyle(badge.tone);
                                        return (
                                            <Chip
                                                key={badge.label}
                                                label={badge.label}
                                                size="small"
                                                sx={{
                                                    backgroundColor: badgeStyle.bg,
                                                    color: badgeStyle.color,
                                                    fontWeight: 600,
                                                    borderRadius: 1.5,
                                                    height: 26,
                                                    ".MuiChip-label": {
                                                        px: 1,
                                                    },
                                                }}
                                            />
                                        );
                                    })}
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography
                                        sx={{
                                            fontSize: "0.76rem",
                                            color: theme.palette.text.secondary,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {status}
                                    </Typography>
                                    <IconButton
                                        onClick={() => toggleCard(cardKey)}
                                        size="small"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            p: 0.5,
                                        }}
                                    >
                                        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    py: 0.5,
                                    mb: isExpanded ? 1.5 : 0,
                                    borderBottom: isExpanded ? `1px solid ${theme.palette.divider}` : "none",
                                }}
                            >
                                <Typography sx={{ fontSize: "0.72rem", color: theme.palette.text.secondary }}>
                                    即時 / 最佳化 節省
                                </Typography>
                                <Typography sx={{ fontSize: "0.82rem", color: theme.palette.success.main, fontWeight: 600 }}>
                                    {delta}
                                </Typography>
                            </Box>

                            <Collapse in={isExpanded} timeout={300} unmountOnExit>
                                <Box sx={{ pt: 0.25 }}>
                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                                            border: `1px solid ${theme.palette.divider}`,
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            backgroundColor: isDark ? alpha(theme.palette.grey[200], 1) : theme.palette.grey[50],
                                        }}
                                    >
                                        {metrics.map((metric) => (
                                            <Box
                                                key={metric.label}
                                                sx={{
                                                    px: 2,
                                                    py: 1.4,
                                                    borderRight: `1px solid ${theme.palette.divider}`,
                                                    "&:last-of-type": { borderRight: 0 },
                                                }}
                                            >
                                                <Typography sx={{ fontSize: "0.72rem", color: theme.palette.text.secondary, mb: 0.5 }}>
                                                    {metric.label}
                                                </Typography>
                                                <Typography sx={{ fontSize: "1.2rem", fontWeight: 600, color: theme.palette.text.primary }}>
                                                    {metric.value}
                                                    <Box component="span" sx={{ fontSize: "0.76rem", color: theme.palette.text.secondary, ml: 0.25 }}>
                                                        {metric.unit}
                                                    </Box>
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontSize: "0.95rem",
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.8,
                                            mt: 2,
                                            mb: 0,
                                        }}
                                    >
                                        {summary}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                                            gap: 1.5,
                                            mt: 2.25,
                                        }}
                                    >
                                        {detail.map((item) => (
                                            <Box
                                                key={item.label}
                                                sx={{
                                                    backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.08 : 0.04),
                                                    border: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.2 : 0.12)}`,
                                                    borderRadius: 2,
                                                    minHeight: 80,
                                                    p: 1.5,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography sx={{ fontSize: "0.78rem", color: theme.palette.text.secondary, mb: 0.5 }}>{item.label}</Typography>
                                                <Typography sx={{ fontSize: "0.92rem", fontWeight: 600, color: theme.palette.text.primary }}>{item.value}</Typography>
                                            </Box>
                                        ))}
                                    </Box>

                                    <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1.75 }}>
                                        <Button variant="outlined">
                                            查看最佳化結果 →
                                        </Button>
                                    </Box>
                                </Box>
                            </Collapse>
                        </Box>
                    </Card>
                );
            })}
        </Stack>
    );
};

export default RenderedCards;