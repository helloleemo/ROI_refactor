import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type LanguageSelectDialogProps = {
    open: boolean;
    selectedLocales: string[];
    onClose: () => void;
    onConfirm: (locales: string[]) => Promise<void> | void;
};

const LanguageSelectDialog = ({
    open,
    selectedLocales,
    onClose,
    onConfirm,
}: LanguageSelectDialogProps) => {
    const [draftLocales, setDraftLocales] = useState(selectedLocales);
    const [isSaving, setIsSaving] = useState(false);
    const { supportedLocales } = useLanguage();

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

    const handleConfirm = async () => {
        try {
            setIsSaving(true);
            await onConfirm(draftLocales);
            onClose();
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>選取顯示語言</DialogTitle>
            <DialogContent>
                <FormGroup>
                    {supportedLocales.map((language) => (
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
                <Button onClick={handleConfirm} variant="contained" disabled={isSaving}>
                    確認
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LanguageSelectDialog;
