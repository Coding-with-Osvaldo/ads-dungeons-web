import { LinearProgress } from "@mui/material";
import Image from "next/image";

export default function Enemy({type, life}: {type: "Skeleton" | "Zombie" | "Orc" | "Slime", life: number}){
    return <div className="w-72">
        <Image alt="Enemy" src={"/"+type+".png"} width={390} height={390} />
        <LinearProgress variant="determinate" color="success" value={life} className="mx-3 mt-3"/>
    </div>
}