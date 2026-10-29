
import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';



const InstructionInfo = ({ title, size, padding }: { title: string, size?: number, padding?: number }) => {
    return (
        <Tooltip title={title}>
            <IconButton sx={{ padding: padding ?? 1 }}>
                <InfoOutlinedIcon sx={{ color: "grey.300", fontSize: size ?? 20 }} />
            </IconButton>
        </Tooltip>
    );
}

export default InstructionInfo;