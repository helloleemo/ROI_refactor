import Typography from '@mui/material/Typography';

const TitleText = () => {
    return (
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
            EnergyAI
        </Typography>
    )
}

export default TitleText;