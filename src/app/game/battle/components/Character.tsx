import { CircularProgressWithLabel } from "@/app/components/CircularProgress";

export function Character({name="José", life=100, mana=100}: {name: string, life: number, mana: number}){
    return <div className="inline-flex flex-col bg-gray-500 px-5">
        <div className="text-center">
            <h2>{name}</h2>
        </div>
        <div className="flex gap-10">
            <div>
                <h3>Vida</h3>
                <CircularProgressWithLabel value={life} type="success"/>
            </div>
            <div>
                <h3>Mana</h3>
                <CircularProgressWithLabel value={mana} type="primary"/>
            </div>
        </div>
    </div>
}