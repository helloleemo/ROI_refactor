import { Box, styled, Typography } from "@mui/material";
import type { ReactNode } from "react";

const Items = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.semantic.surfaceSubtle,
    border: `1px solid ${theme.palette.semantic.borderSubtle}`,
    borderRadius: "10px",
    padding: theme.spacing(2),
    boxSizing: "border-box",
    minHeight: 0,
    overflow: "hidden",
}))

type GridItemLayout = {
    id: string;
    title?: string;
    x: number;
    y: number;
    w: number;
    h: number;
    content?: ReactNode;
};

type GridLayoutProps = {
    items?: GridItemLayout[];
    columns?: 3;
    rows?: 2;
    rowHeight?: number;
    gap?: number;
};

const DEFAULT_COLUMNS = 3;
const DEFAULT_ROWS = 2;

const defaultItems: GridItemLayout[] = [
    { id: "kpi", title: "KPI", x: 0, y: 0, w: 2, h: 1, content: "KPI 區塊" },
    { id: "trend", title: "Trend", x: 2, y: 0, w: 1, h: 1, content: "Trend 區塊" },
    { id: "equipment", title: "Equipment", x: 0, y: 1, w: 1, h: 1, content: "設備列表" },
    { id: "opt", title: "Optimization", x: 1, y: 1, w: 2, h: 1, content: "最佳化結果" },
];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

const normalizeItem = (item: GridItemLayout, columns: number, rows: number): GridItemLayout => {
    const x = clamp(item.x, 0, columns - 1);
    const y = clamp(item.y, 0, rows - 1);
    const maxW = columns - x;
    const maxH = rows - y;

    return {
        ...item,
        x,
        y,
        w: clamp(item.w, 1, maxW),
        h: clamp(item.h, 1, maxH),
    };
};

const GridLayout = ({
    items = defaultItems,
    columns = DEFAULT_COLUMNS,
    rows = DEFAULT_ROWS,
    rowHeight = 220,
    gap = 12,
}: GridLayoutProps) => {
    const safeItems = items.map((item) => normalizeItem(item, columns, rows));

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`,
                gap: `${gap}px`,
            }}
        >
            {safeItems.map((item) => (
                <Items
                    key={item.id}
                    sx={{
                        gridColumn: `${item.x + 1} / span ${item.w}`,
                        gridRow: `${item.y + 1} / span ${item.h}`,
                    }}
                >
                    {item.title ? (
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            {item.title}
                        </Typography>
                    ) : null}
                    <Box>{item.content ?? item.id}</Box>
                </Items>
            ))}
        </Box>
    );
}

export default GridLayout;