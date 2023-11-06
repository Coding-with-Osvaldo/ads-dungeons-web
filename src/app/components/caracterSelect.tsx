import { TextField } from "@mui/material"
import BasicSelect from "./basicSelect"

export default function CaracterSelect() {
    return (
        <div className="w-full">
            <div className="w-full bg-gray-500">
                <img className="mx-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBFJOotYfAbQg4R_qLiV87s4lPotfwbrtfLg&usqp=CAU" />
            </div>
            <TextField className="w-full" id="filled-basic" label="Nome" variant="filled" />
            <BasicSelect />
        </div>
    )
}