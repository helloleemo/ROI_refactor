import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import TitleText from "@/components/TitleText";
import type { EquipmentCategory, EquipementResponse } from "@/api/types/equipment";

interface EquipmentViewDialogProps {
    open: boolean;
    equipment: EquipementResponse | null;
    category?: EquipmentCategory;
    onClose: () => void;
}

const getDisplayValue = (value: unknown) => {
    if (value === null || value === undefined || value === "") return "-";
    if (typeof value === "boolean") return value ? "是" : "否";
    return String(value);
};

const Row = ({ label, value }: { label: string; value?: string | number | null }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.75, gap: 2 }}>
        <Typography variant="body2" color="text.primary" sx={{ minWidth: 110 }}>
            {label}
        </Typography>
        <Typography
            variant="body2"
            sx={{ textAlign: "right", wordBreak: "break-all", whiteSpace: "pre-wrap" }}
        >
            {value ?? "-"}
        </Typography>
    </Box>
);

const EquipmentViewDialog = ({
    open,
    equipment,
    category,
    onClose,
}: EquipmentViewDialogProps) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TitleText title="設備詳情" />
                <IconButton onClick={onClose} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 1 }}>
                <Row label="ID" value={equipment?.id} />
                <Divider />
                <Row
                    label={t(`equipment-list.fields${category?.equipment_type}.equipment_name`, {
                        defaultValue: "設備名稱",
                    })}
                    value={equipment?.equipment_name}
                />
                <Divider />
                <Row label="設備類型" value={equipment?.equipment_type_name} />
                <Divider />
                {category?.fields.map((field) => (
                    <Box key={field.key}>
                        <Row
                            label={t(`equipment-list.fields${category.equipment_type}.${field.key}`, {
                                defaultValue: field.label,
                            })}
                            value={getDisplayValue(equipment?.specs[field.key])}
                        />
                        <Divider />
                    </Box>
                ))}
                <Row label={t("equipment-list.add-dialog.remarks")} value={equipment?.remarks} />
                <Divider />
                <Row label="狀態" value={equipment?.status} />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>關閉</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EquipmentViewDialog;
