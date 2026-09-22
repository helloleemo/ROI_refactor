import Box from "@mui/material/Box";
import { useMemo } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import useMenuToggle from "@/hooks/useMenuToggle";
import { useProject } from "@/contexts/ProjectContext";
import ProjectDialog from "./ProjectDialog";
import ProjectEditDialog from "./ProjectEditDialog";

type OptionItem = {
    value: string;
    label: string;
};

type OptionsRenderProps = {
    title: string;
    options: OptionItem[];
    value: string;
    onChange: (value: string) => void;
    showArrow?: boolean;
};

const OptionsRender = ({ title, options, value, onChange, showArrow = true, onAdd, onEdit }: OptionsRenderProps & { onAdd?: () => void; onEdit?: (projectId: string) => void }) => {
    return (
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ mb: 2, color: "text.disabled", fontSize: 14, fontWeight: 500 }}>
                    {title}
                </Typography>
                <Button onClick={onAdd}>
                    新增
                </Button>
            </Box>
            <Stack spacing={1.5}>
                {options.map((item) => {
                    const selected = item.value === value;

                    return (
                        <Box
                            key={item.value}
                            onClick={() => onChange(item.value)}
                            sx={(theme) => ({
                                px: 2,
                                py: 1.25,
                                borderRadius: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                cursor: "pointer",
                                color: selected
                                    ? theme.palette.mode === "dark"
                                        ? theme.palette.primary.light
                                        : theme.palette.primary.main
                                    : theme.palette.mode === "dark"
                                        ? theme.palette.semantic.brandAdaptive
                                        : theme.palette.text.primary,
                                bgcolor: selected
                                    ? theme.palette.primary.main + "1A"
                                    : "transparent",
                                transition: "background-color 0.15s ease, color 0.15s ease",
                                "&:hover": {
                                    bgcolor: !selected ? theme.palette.semantic.surfaceSubtle : undefined,
                                },
                            })}
                        >
                            <Typography sx={{ fontSize: 14, lineHeight: 1.35, color: "inherit", fontWeight: selected ? 700 : 300, }}>
                                {item.label}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <Button
                                    size="small"
                                    variant="text"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onEdit?.(item.value);
                                    }}
                                    sx={{
                                        minWidth: 0,
                                        color: "inherit",
                                        px: 1,
                                        py: 0.5,
                                        fontSize: 12,
                                        lineHeight: 1.2,
                                        textTransform: "none",
                                    }}
                                    startIcon={<EditOutlinedIcon fontSize="small" />}
                                >
                                </Button>
                                {/* {showArrow && selected ? <KeyboardArrowRightIcon fontSize="small" sx={{ color: 'inherit' }} /> : null} */}
                            </Box>
                        </Box>
                    );
                })}
            </Stack >
        </Box >
    );
};

const HierarchyOptions = () => {
    const navigate = useNavigate();
    const { anchorEl, open, handleClick, handleClose } = useMenuToggle();
    const { projects, currentProject, setCurrentProject } = useProject();
    const [isProjectDialogOpen, setProjectDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const projectOptions = useMemo(
        () => projects.map((project) => ({ value: String(project.id), label: project.name })),
        [projects],
    );

    const handleProjectChange = (value: string) => {
        const project = projects.find((item) => String(item.id) === value);
        if (project) {
            setCurrentProject(project);
            navigate(`/${project.id}`, { replace: true });
        }
        handleClose("hierarchy");
    };

    const handleMenuClose = () => {
        handleClose("hierarchy");
    };

    const isOpen = Boolean(open.hierarchy);
    const anchorPosition = anchorEl
        ? {
            top: Math.round(anchorEl.getBoundingClientRect().bottom + window.scrollY),
            left: 0,
        }
        : undefined;

    return (
        <>
            <Button
                onClick={(event) => (isOpen ? handleMenuClose() : handleClick(event, "hierarchy"))}
                variant="text"
                disableRipple
                endIcon={isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                sx={{
                    minWidth: 300,
                    justifyContent: "space-between",
                    px: 2,
                    py: 1.1,
                    borderRadius: 1,
                    "&:hover": {
                        bgcolor: "semantic.surfaceSubtle",
                    },
                    color: "text.primary",
                    fontSize: "1rem",
                    fontWeight: 400,
                    textTransform: "none",
                }}
            >
                {currentProject?.name ?? "選擇專案"}
            </Button>
            <Popover
                open={isOpen}
                anchorReference="anchorPosition"
                anchorPosition={anchorPosition}
                marginThreshold={0}
                onClose={handleMenuClose}
                hideBackdrop
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            width: 850,
                            borderRadius: 1,
                            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.14)",
                        },
                    },
                }}
            >
                <ClickAwayListener onClickAway={handleMenuClose}>
                    <Box sx={{
                        px: 3,
                        py: 2.25,
                        bgcolor: "background.paper",
                    }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                            <OptionsRender
                                title="Project"
                                options={projectOptions}
                                value={currentProject ? String(currentProject.id) : ""}
                                onChange={handleProjectChange}
                                onAdd={() => setProjectDialogOpen(true)}
                                onEdit={(projectId) => {
                                    const project = projects.find((item) => String(item.id) === projectId) ?? null;
                                    setEditingProject(project);
                                }}
                            />
                        </Box>
                    </Box>
                </ClickAwayListener>
            </Popover>

            <ProjectDialog
                open={isProjectDialogOpen}
                onClose={() => setProjectDialogOpen(false)}
            />

            <ProjectEditDialog
                open={Boolean(editingProject)}
                project={editingProject}
                onClose={() => setEditingProject(null)}
            />
        </>
    );
};

export default HierarchyOptions;