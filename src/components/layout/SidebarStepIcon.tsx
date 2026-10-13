import { Box } from "@mui/material";

export type StepStatus = "notStarted" | "completed"
//  | "error" | "processing"

export const stepStatusColors = {
    notStarted: { background: "grey.100", foreground: "text.secondary" },
    // processing: { background: "info.main", foreground: "info.contrastText" },
    completed: { background: "primary.main", foreground: "success.contrastText" },
    // error: { background: "error.main", foreground: "error.contrastText" },
} satisfies Record<StepStatus, { background: string; foreground: string }>;

export const SidebarStepIcon = ({
    step,
    status = "notStarted",
}: {
    step: number;
    status?: StepStatus;
}) => {
    const colors = stepStatusColors[status];

    return (
        <Box
            component="span"
            aria-hidden="true"
            sx={{
                width: 24,
                height: 24,
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                bgcolor: colors.background,
                color: colors.foreground,
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 1,
                ".Mui-selected &": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: 2,
                },
            }}
        >
            {step}
        </Box>
    );
};