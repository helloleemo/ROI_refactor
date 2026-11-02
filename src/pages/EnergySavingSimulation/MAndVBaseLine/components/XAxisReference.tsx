import Typography from "@mui/material/Typography";

const XAxisReference = ({ info }: { info: string }) => {
    return (
        <Typography variant="subtitle2" sx={{
            fontSize: 12,
            color: "text.secondary",
            position: "relative",
            top: -15,
        }}>
            {info}
        </Typography>
    );
};

export default XAxisReference;