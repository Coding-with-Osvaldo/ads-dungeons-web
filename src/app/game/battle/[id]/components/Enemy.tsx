import { LinearProgress } from "@mui/material";
import Image from "next/image";

export default function Enemy(
        {type, life, maxLife, handleClick}
        : 
        {type: "Skeleton" | "Zombie" | "Orc" | "Slime", life: number, maxLife: number,handleClick: Function}
    ){

    return <div className="w-72" onClick={() => {handleClick()}}>
        <Image alt="Enemy" src={"/"+type+".png"} width={390} height={390} priority className={life > 0 ? "" : "dead attacked"}/>
        <LinearProgress variant="determinate" color="success" value={Math.floor(life/maxLife * 100)} className="mx-3 mt-3"/>
    </div>
    
}