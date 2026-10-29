
import { Box, CircularProgress } from "@mui/material";

const ChartSectionLoader = () => {
    return (
        <Box sx={{ position: "relative", left: "50%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "320px" }}>
            <CircularProgress size={32} color="primary" />
        </Box>
    );
}

export default ChartSectionLoader;