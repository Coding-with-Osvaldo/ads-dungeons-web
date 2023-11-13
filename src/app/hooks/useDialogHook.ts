import { useState } from "react";

export function useDialogHooks() : 
[open :boolean, handleClickOpen:Function, handleClose: Function]
{
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return [open, handleClickOpen, handleClose]
}