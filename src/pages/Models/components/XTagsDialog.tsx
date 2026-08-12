import { Box, Button, Dialog, Divider, List, ListItem, Typography } from "@mui/material";

type XTagsDialogProps = {
    open: boolean;
    onClose: () => void;
    algorithmName: string;
    xTags: string[];
};

const XTagsDialog = ({ open, onClose, algorithmName, xTags }: XTagsDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Box sx={{ px: 2, py: 1.5, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: "text.primary" }}>
                    X Tags 全部內容
                </Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.25 }}>
                    演算法：{algorithmName}
                </Typography>
            </Box>
            <Box sx={{ px: 2, py: 1.5, maxHeight: 360, overflow: "auto" }}>
                {xTags.length === 0 ? (
                    <Typography sx={{ color: "text.secondary", fontSize: 13 }}>無 X tags</Typography>
                ) : (
                    <List dense disablePadding>
                        {xTags.map((tag, index) => (
                            <ListItem key={`${tag}-${index}`} disableGutters>
                                <Typography sx={{ fontSize: 13, color: "text.primary" }}>{tag}</Typography>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
            <Divider />
            <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="text" onClick={onClose}>關閉</Button>
            </Box>
        </Dialog>
    );
};

export default XTagsDialog;
