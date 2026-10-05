import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const DataGridNoRowsOverlay = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
            }}
        >
            <Box
                component="img"
                src="/noResultFound.svg"
                alt=""
                sx={{ width: 152, height: 152 }}
            />
            <Typography variant="body2" color="text.secondary">
                {t("common.no_data")}
            </Typography>
        </Box>
    );
};

export default DataGridNoRowsOverlay;
