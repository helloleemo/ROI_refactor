import { Box, styled } from "@mui/material";

const SectionLayout = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 0,
    padding: 24,
    marginBottom: 0,
}));

export default SectionLayout;