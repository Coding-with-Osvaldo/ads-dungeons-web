import CaracterSelect from "../components/caracterSelect"
import { Button } from "@mui/material"
export default function Game() {
    return (
        <>
            <div className="flex flex-row gap-4 m-8">
                <CaracterSelect />
                <CaracterSelect />
                <CaracterSelect />
            </div>
            <div className="flex justify-end m-8">
                <Button className="px-16 py-4 rounded-full text-lg bg-gradient-to-tr from-green-500 to-green-800" variant="contained">Jogar</Button>
            </div>


        </>
    )
}