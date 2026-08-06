import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useMemo, useState } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import useInputbar from "@/hooks/useInputbar";

type SearchSiteProps = {
    value?: string;
    placeholder?: string;
    sx?: SxProps<Theme>;
    suggestions?: string[];
    onChange?: (value: string) => void;
    onSelectSuggestion?: (value: string) => void;
};

const SearchSite = ({
    value = "",
    placeholder = "Search the Site",
    sx,
    suggestions = [],
    onChange,
    onSelectSuggestion,
}: SearchSiteProps) => {
    const { inputValue, setInputValue, handleClearInput, handleInputChange } = useInputbar();
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (value !== inputValue) {
            setInputValue(value);
        }
    }, [value, inputValue, setInputValue]);

    const searchResults = useMemo(() => {
        const keyword = inputValue.trim().toLowerCase();
        if (!keyword) return [];

        return suggestions
            .filter((site) => site.toLowerCase().includes(keyword))
            .slice(0, 5);
    }, [inputValue, suggestions]);

    const shouldShowSuggestions = isFocused && searchResults.length > 0;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(event);
        if (onChange) {
            onChange(event.target.value);
        }
    };

    const handleClear = () => {
        handleClearInput();
        if (onChange) {
            onChange("");
        }
    };

    const handleSuggestionSelect = (site: string) => {
        setInputValue("");
        if (onChange) {
            onChange("");
        }
        if (onSelectSuggestion) {
            onSelectSuggestion(site);
        }
        setIsFocused(false);
    };

    return (
        <Box sx={{
            ...sx,
            position: "relative",
        }}>
            <TextField
                size="small"
                fullWidth
                value={inputValue}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                            </InputAdornment>
                        ),
                        endAdornment: inputValue && (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    onClick={handleClear}
                                    sx={{ p: 0.5 }}
                                    disableRipple
                                >
                                    <ClearIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        bgcolor: "transparent",
                        borderRadius: 1,
                    },
                }}
            />

            {shouldShowSuggestions ? (
                <Paper
                    elevation={6}
                    sx={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        right: 0,
                        borderRadius: 1,
                        overflow: "hidden",
                        zIndex: (theme) => theme.zIndex.modal + 1,
                    }}
                >
                    <Stack spacing={0}>
                        {searchResults.map((site) => (
                            <Box
                                key={site}
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => handleSuggestionSelect(site)}
                                sx={{
                                    px: 1.75,
                                    py: 1.1,
                                    cursor: "pointer",
                                    "&:hover": {
                                        bgcolor: "semantic.surfaceSubtle",
                                    },
                                }}
                            >
                                <Typography sx={{ fontSize: 14 }}>{site}</Typography>
                            </Box>
                        ))}
                    </Stack>
                </Paper>
            ) : null}
        </Box>
    );
};

export default SearchSite;