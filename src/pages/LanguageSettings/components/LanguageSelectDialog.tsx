import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { languages } from "@/settings/languages";

type LanguageSelectDialogProps = {
    open: boolean;
    selectedLocales: string[];
    onClose: () => void;
    onConfirm: (locales: string[]) => void;
};

const LanguageSelectDialog = ({
    open,
    selectedLocales,
    onClose,
    onConfirm,
}: LanguageSelectDialogProps) => {
    const [draftLocales, setDraftLocales] = useState(selectedLocales);

    useEffect(() => {
        if (open) setDraftLocales(selectedLocales);
    }, [open, selectedLocales]);

    const handleToggle = (locale: string) => {
        if (draftLocales.includes(locale)) {
            if (draftLocales.length === 1) return;
            setDraftLocales(draftLocales.filter((selectedLocale) => selectedLocale !== locale));
            return;
        }

        setDraftLocales([...draftLocales, locale]);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>選取顯示語言</DialogTitle>
            <DialogContent>
                <FormGroup>
                    {languages.map((language) => (
                        <FormControlLabel
                            key={language.value}
                            control={(
                                <Checkbox
                                    checked={draftLocales.includes(language.value)}
                                    onChange={() => handleToggle(language.value)}
                                />
                            )}
                            label={language.label}
                        />
                    ))}
                </FormGroup>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit">取消</Button>
                <Button onClick={() => { onConfirm(draftLocales); onClose(); }} variant="contained">
                    確認
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LanguageSelectDialog;
