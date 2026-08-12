import { Box, Typography } from "@mui/material"

interface TitleTextProps {
    title: string;
}

const TitleText = ({ title }: TitleTextProps) => {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
        }}>
            <Box sx={{
                height: 16,
                width: 5,
                marginRight: 1,
                backgroundColor: "semantic.brandAdaptive",
            }} />
            <Typography
                variant="h5"
                component="h1"
                sx={{
                    fontWeight: 600,
                    color: "semantic.brandAdaptive",
                    fontSize: "20px",
                }}
            >
                {title}
            </Typography>
        </Box>
    )
}

export default TitleText