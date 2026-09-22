import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProject } from "@/contexts/ProjectContext";

const ProjectNotFound = () => {
    const navigate = useNavigate();
    const { invalidProjectId, projects, setCurrentProject } = useProject();

    const handleGoHome = () => {
        const firstProject = projects[0];

        if (!firstProject) {
            navigate("/", { replace: true });
            return;
        }

        setCurrentProject(firstProject);
        navigate(`/${firstProject.id}`, { replace: true });
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                p: 3,
                textAlign: "center",
            }}
        >
            <Typography variant="h4">找不到專案</Typography>
            <Typography color="text.secondary">
                Project ID「{invalidProjectId}」不存在或無法使用。
            </Typography>
            <Button variant="contained" onClick={handleGoHome}>
                回到首頁
            </Button>
        </Box>
    );
};

export default ProjectNotFound;