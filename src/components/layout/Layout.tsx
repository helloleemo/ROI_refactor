import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";



function Layout() {
    return (
        <Box sx={{ height: "100vh", overflow: "hidden", bgcolor: "background.default" }}>
            <Header />
            <Box sx={{ height: 68 }} />
            <Box sx={{ display: "flex", height: "calc(100vh - 68px)", overflow: "hidden" }}>
                {/* <Sidebar /> */}
                <Sidebar2 />
                <Box sx={{
                    flex: 1,
                    width: "100%",
                    minWidth: 0,
                    height: "100%",
                    overflow: "hidden",
                }}>
                    <Container
                        maxWidth={false}
                        disableGutters
                        sx={{
                            m: 0,
                            p: 2,
                            height: "100%",
                        }}
                    >
                        <Box sx={{
                            height: "100%",
                            borderRadius: 2,
                            overflow: "hidden",
                        }}>
                            <Outlet />
                        </Box>
                    </Container>
                </Box>
            </Box >
        </Box >
    );
}

export default Layout;

