import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";



function Layout() {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "semantic.surfaceSubtle" }}>
            <Header />
            <Box sx={{ height: 69 }} />
            <Box sx={{ display: "flex", height: "calc(100vh - 69px)" }}>
                <Sidebar />
                <Box sx={{
                    flex: 1,
                    minWidth: 0,
                    overflow: "auto",
                    px: 0,
                    mx: 0
                }}>
                    <Container
                        maxWidth={false}
                        sx={{
                            m: 0,
                            height: "100%",
                            py: 2,
                            px: 0,
                        }}
                    >
                        <Box sx={{
                            border: "1px solid blue",
                            height: "100%"
                        }} />


                        <Outlet />
                    </Container>
                </Box>
            </Box >
        </Box >
    );
}

export default Layout;
