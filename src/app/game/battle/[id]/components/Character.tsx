import { CircularProgressWithLabel } from "@/app/components/CircularProgress";

export function Character({name, life, mana, maxLife, maxMana}: {name: string, life: number, mana: number, maxLife: number, maxMana: number}){
    if(maxMana == 0) maxMana = 1
    return <div className="inline-flex flex-col bg-gray-500 px-5">
        <div className="text-center">
            <h2>{name}</h2>
        </div>
        <div className="flex gap-10">
            <div>
                <h3>Vida</h3>
                <CircularProgressWithLabel value={Math.floor((life/maxLife)*100)} type="success"/>
            </div>
            <div>
                <h3>Mana</h3>
                <CircularProgressWithLabel value={Math.floor((mana/maxMana)*100)} type="primary"/>
            </div>
        </div>
    </div>
}