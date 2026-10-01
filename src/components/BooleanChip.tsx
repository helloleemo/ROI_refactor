import { Chip } from "@mui/material";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
import { alpha, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

interface BooleanChipProps {
    value: boolean;
    trueLabel?: string;
    falseLabel?: string;
    size?: "small" | "medium";
}

const BooleanChip = ({ value, trueLabel, falseLabel, size = "small" }: BooleanChipProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const base = value ? theme.palette.success.main : theme.palette.grey[500];
    const label = value ? (trueLabel ?? t("common.yes")) : (falseLabel ?? t("common.no"));

    return (
        <Chip
            size={size}
            // icon={value ? <CheckIcon /> : <CloseIcon />}
            label={label}
            sx={{
                backgroundColor: alpha(base, 0.15),
                color: base,
                fontWeight: 600,
                "& .MuiChip-icon": { color: base, fontSize: 16 },
            }}
        />
    );
};

export default BooleanChip;
