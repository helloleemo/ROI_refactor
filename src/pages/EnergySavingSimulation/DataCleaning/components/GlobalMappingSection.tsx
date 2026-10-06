
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { type GlobalMappingType } from "@/api/types/tagMapping";
import { useTranslation } from "react-i18next";

interface GlobalMappingSectionProps {
    globalMapping?: GlobalMappingType;
    tags?: string[];
    onMappingChange: (key: keyof GlobalMappingType, tag: string) => void;
}


const GlobalMappingSection = ({
    globalMapping,
    tags = [],
    onMappingChange,
}: GlobalMappingSectionProps) => {

    const { t } = useTranslation();

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", columnGap: 2, rowGap: 1.75 }}>
            {globalMapping && Object.entries(globalMapping).map(([key, value]) => (
                <Box key={key} sx={{ display: "flex", flexDirection: "column", gap: 0.75, minWidth: 0 }}>
                    <Box component="span" sx={{ fontSize: 12, fontWeight: 600, color: "text.secondary", lineHeight: 1.4 }}>
                        {t(`dataCleaning.environment_and_load_parameters.${key}`)}
                    </Box>
                    <FormControl fullWidth size="small">
                        <Select
                            value={tags.includes(value) ? value : ""}
                            onChange={(event) => onMappingChange(key as keyof GlobalMappingType, event.target.value)}
                            displayEmpty
                            sx={{
                                backgroundColor: "background.paper",
                                "& .MuiSelect-select": {
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                            }}
                        >
                            <MenuItem value="" disabled sx={{ color: "grey.500" }}>Select a tag</MenuItem>
                            {tags.map((tag) => <MenuItem key={tag} value={tag}>{tag}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
            ))}
        </Box>
    );
}

export default GlobalMappingSection;