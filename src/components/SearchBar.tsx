import { TextField, type SxProps, type Theme } from "@mui/material";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    sx?: SxProps<Theme>;
};

const SearchBar = ({
    value,
    onChange,
    placeholder = "搜尋",
    sx,
}: SearchBarProps) => {
    return (
        <TextField
            size="small"
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            sx={sx}
        />
    );
};

export default SearchBar;