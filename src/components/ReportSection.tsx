import { useId, useState, type ReactNode } from "react";
import { Box, Button, Collapse, Divider, IconButton, Paper, Typography, type SxProps, type Theme } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ReportSectionProps {
    title: string;
    children: ReactNode;
    action?: ReactNode;
    sx?: SxProps<Theme>;
}

const ReportSection = ({ title, children, action, sx = [] }: ReportSectionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentId = useId();
    const toggle = () => setIsOpen((previous) => !previous);

    return (
        <Paper
            variant="outlined"
            sx={[
                {
                    borderRadius: 1.5,
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    minWidth: 0,
                    flex: isOpen ? "1 1 0%" : "0 0 auto",
                    transition: "flex 225ms cubic-bezier(0.4, 0, 0.2, 1)",
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <Button
                    onClick={toggle}
                    color="inherit"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    sx={{ px: 1, py: 1, minHeight: 40, minWidth: 0, flex: 1, justifyContent: "flex-start", textTransform: "none", borderRadius: 0, alignSelf: "stretch" }}
                >
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: "text.primary", lineHeight: 1.4, textAlign: "left", overflowWrap: "anywhere" }}>
                        {title}
                    </Typography>
                </Button>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0, pr: 0.5 }}>
                    {action}
                    <IconButton size="small" onClick={toggle} aria-label={title} aria-expanded={isOpen} aria-controls={contentId}>
                        {isOpen ? <ExpandLessIcon sx={{ fontSize: 20 }} /> : <ExpandMoreIcon sx={{ fontSize: 20 }} />}
                    </IconButton>
                </Box>
            </Box>
            <Collapse
                id={contentId}
                in={isOpen}
                timeout="auto"
                unmountOnExit
                sx={{
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    "& .MuiCollapse-wrapper": { minHeight: 0 },
                    "& .MuiCollapse-wrapperInner": { minHeight: 0, display: "flex", flexDirection: "column" },
                }}
            >
                <Divider />
                <Box sx={{ p: 1.5, flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", overscrollBehavior: "contain" }}>
                    {children}
                </Box>
            </Collapse>
        </Paper>
    );
};

export default ReportSection;