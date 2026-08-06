import { useState } from "react"

const DEFAULT_DIALOG_STATE = {
    dialog: false,
};

const useOpenDialog = (initialState: Record<string, boolean> = DEFAULT_DIALOG_STATE) => {
    const [open, setOpen] = useState<Record<string, boolean>>(initialState);

    const openDialog = (key = "dialog") => {
        setOpen(prev => ({ ...prev, [key]: true }));
    };

    const closeDialog = (key = "dialog") => {
        setOpen(prev => ({ ...prev, [key]: false }));
    };

    const handleOpen = () => {
        openDialog();
    };

    const handleClose = () => {
        closeDialog();
    };


    return {
        open,
        setOpen,
        openDialog,
        closeDialog,
        handleOpen,
        handleClose,
    }

}

export default useOpenDialog


