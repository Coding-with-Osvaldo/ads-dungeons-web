import { TextField } from "@mui/material"
import BasicSelect from "./BasicSelect"

export default function CaracterSelect() {
    return (
        <div className="w-full">
            <div className="w-full pt-4 bg-gray-500">
                <img className="mx-auto bg-no-repeat bg-center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBFJOotYfAbQg4R_qLiV87s4lPotfwbrtfLg&usqp=CAU" />
            </div>
            <TextField className="w-full pt-4 rounded-l-lg" id="filled-basic" label="Nome do personagem" variant="filled" />
            <div className="pt-4">
                <BasicSelect />
            </div>
        </div>
    )
}