import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function NoSidebarLayout() {
    return (
        <Box sx={{ height: "100vh", overflow: "hidden", bgcolor: "background.default" }}>
            <Header />
            <Box sx={{ height: 68 }} />
            <Box sx={{ height: "calc(100vh - 68px)", overflow: "hidden" }}>
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        m: 0,
                        p: 2,
                        height: "100%",
                    }}
                >
                    <Box sx={{ height: "100%", borderRadius: 2, overflow: "hidden" }}>
                        <Outlet />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default NoSidebarLayout;