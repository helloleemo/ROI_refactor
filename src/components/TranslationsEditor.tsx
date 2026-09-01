import { Box, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import type { TranslationResponse } from "@/api/types/shared";
import { languages } from "@/settings/languages";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { N30x30OptionsInformation } from "@/components/icons";

const EMPTY_ID = "00000000-0000-0000-0000-000000000000";

type TranslationsEditorProps = {
    value: TranslationResponse[];
    onChange: (next: TranslationResponse[]) => void;
    displayNameLabel?: string;
    descriptionLabel?: string;
    hintText?: string;
    disabled?: boolean;
    showDescription?: boolean;
};

const TranslationsEditor = ({
    value,
    onChange,
    displayNameLabel = "顯示名稱",
    descriptionLabel = "描述",
    hintText = "至少填寫英文名稱，其它語系可選填。",
    disabled = false,
    showDescription = true,
}: TranslationsEditorProps) => {
    const [activeLocale, setActiveLocale] = useState("en-US");

    const current = useMemo(() => {
        return value.find((item) => item.locale === activeLocale) ?? {
            id: EMPTY_ID,
            locale: activeLocale,
            displayName: "",
            description: "",
        };
    }, [activeLocale, value]);

    const updateField = (field: "displayName" | "description", fieldValue: string) => {
        const index = value.findIndex((item) => item.locale === activeLocale);

        if (index === -1) {
            onChange([
                ...value,
                {
                    id: EMPTY_ID,
                    locale: activeLocale,
                    displayName: field === "displayName" ? fieldValue : "",
                    description: field === "description" ? fieldValue : "",
                },
            ]);
            return;
        }

        onChange(value.map((item) => {
            if (item.locale !== activeLocale) return item;
            return { ...item, [field]: fieldValue };
        }));
    };

    return (
        <Box sx={{ display: "grid", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
                {languages.map((lang) => (
                    <Typography
                        key={lang.value}
                        variant="body2"
                        onClick={() => setActiveLocale(lang.value)}
                        sx={{
                            cursor: "pointer",
                            color: lang.value === activeLocale ? "primary.main" : "text.secondary",
                            fontWeight: lang.value === activeLocale ? 600 : 400,
                        }}
                    >
                        {lang.label}
                    </Typography>
                ))}
                <Tooltip title={hintText}>
                    <IconButton>
                        <N30x30OptionsInformation width={26} height={26} accentColor="text.secondary" />
                    </IconButton>
                </Tooltip>
            </Box>

            <TextField
                fullWidth
                required={activeLocale === "en-US"}
                disabled={disabled}
                label={displayNameLabel}
                value={current.displayName}
                onChange={(event) => updateField("displayName", event.target.value)}
                slotProps={{ htmlInput: { maxLength: 100 } }}
            />

            {showDescription ? (
                <TextField
                    fullWidth
                    disabled={disabled}
                    multiline
                    minRows={3}
                    label={descriptionLabel}
                    value={current.description ?? ""}
                    onChange={(event) => updateField("description", event.target.value)}
                    slotProps={{ htmlInput: { maxLength: 500 } }}
                />
            ) : null}
        </Box>
    );
};

export default TranslationsEditor;