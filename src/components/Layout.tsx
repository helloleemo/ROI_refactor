import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";



function Layout() {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
            <Header />
            <Box sx={{ height: 69 }} />

            <Box sx={{ display: "flex", height: "calc(100vh - 69px)" }}>
                <Sidebar />
                <Box sx={{ flex: 1, minWidth: 0, overflow: "auto" }}>
                    <Container
                        maxWidth={false}
                        sx={{
                            py: 2,
                        }}
                    >
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;
