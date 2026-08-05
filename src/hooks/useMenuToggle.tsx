import { useState, type MouseEvent } from "react";


const useMenuToggle = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<Record<string, boolean>>({

    });


    const handleClick = (e: MouseEvent<HTMLElement>, key: string) => {
        setAnchorEl(e.currentTarget);
        setOpen(prev => ({ ...prev, [key]: true }));
    }
    const handleClose = (key: string) => {
        setAnchorEl(null);
        setOpen(prev => ({ ...prev, [key]: false }));
    };

    return {
        anchorEl,
        setAnchorEl,
        open,
        handleClick,
        handleClose,
    }
}
export default useMenuToggle