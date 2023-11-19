import { useState } from "react";
import { timeout } from "../utils";

export function useDialogHooks() : 
[open :boolean, handleClickOpen:Function, handleClose: Function, dialogText: string, setDialogText: Function, writeWithDelay: Function]
{
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (func:Function | undefined) => {
        func ? func() : null
        setOpen(false);
    };

    let [dialogText, setDialogText] = useState("")

    async function writeWithDelay(text: string, delay: number){
        dialogText = ""
        setDialogText(dialogText)
        for (let letter of text.split("")){
        dialogText += letter
        setDialogText(dialogText)
        await timeout(delay)
        }
    }

    return [open, handleClickOpen, handleClose, dialogText, setDialogText, writeWithDelay]
}