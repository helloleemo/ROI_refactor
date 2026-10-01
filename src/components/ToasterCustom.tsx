import toast, { Toaster } from "react-hot-toast";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export type ToastType = "success" | "error" | "info" | "warning";

const toastIcons: Record<ToastType, React.ReactElement> = {
    success: <CheckCircleOutlinedIcon fontSize="small" sx={{ color: "success.main" }} />,
    error: <ErrorOutlineOutlinedIcon fontSize="small" sx={{ color: "error.main" }} />,
    warning: <WarningAmberOutlinedIcon fontSize="small" sx={{ color: "warning.main" }} />,
    info: <InfoOutlinedIcon fontSize="small" sx={{ color: "info.main" }} />,
};

export const showToast = (message: string, type: ToastType = "info") => {
    return toast.custom(
        (t) => (
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    pl: 2,
                    pr: 1,
                    py: 1.25,
                    minWidth: 320,
                    maxWidth: 500,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderLeft: 4,
                    borderLeftColor: `${type}.main`,
                    bgcolor: "background.paper",

                    opacity: t.visible ? 1 : 0,
                    transform: t.visible ? "translateY(0)" : "translateY(-12px)",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                }}
            >
                {toastIcons[type]}
                <Typography variant="body2" sx={{ flex: 1, color: "text.primary" }}>
                    {message}
                </Typography>
                <IconButton
                    size="small"
                    aria-label="close"
                    onClick={() => toast.dismiss(t.id)}
                    sx={{ color: "text.secondary" }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Paper>
        ),
        { duration: type === "error" ? 5000 : 3000 },
    );
};


const ToasterCustom = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{ removeDelay: 1000 }}
        />
    );
};

export default ToasterCustom;