import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";


interface TemplateDialogProps {
    open: boolean;
    onClose: () => void;
}

const TemplateDialog = ({ open, onClose }: TemplateDialogProps) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography component="span" sx={{ fontSize: 18, fontWeight: 700 }}>
                    {t("projectCsv.template_title")}
                </Typography>
                <IconButton onClick={onClose} aria-label={t("common.close")} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box
                    component="img"
                    src="/template.png"
                    alt={t("projectCsv.template_image_alt")}
                    sx={{
                        display: "block",
                        width: "100%",
                        maxHeight: 360,
                        objectFit: "contain",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                    }}
                />
                <List disablePadding sx={{ mt: 1.5 }}>
                    {[1, 2, 3].map((point) => (
                        <ListItem key={point} disableGutters sx={{ py: 0.5, alignItems: "flex-start" }}>
                            <ListItemText
                                sx={{
                                    m: 0,
                                    p: 0,
                                    color: "text.secondary"
                                }}
                                primary={`${point}. ${t(`projectCsv.template_point_${point}`)}`}
                                slotProps={{
                                    primary: {
                                        variant: "body2",
                                        color: "text.secondary",
                                    },
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default TemplateDialog;