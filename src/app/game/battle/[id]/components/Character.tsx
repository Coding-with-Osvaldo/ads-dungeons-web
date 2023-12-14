import { CircularProgressWithLabel } from "@/app/components/CircularProgress";


export function Character({ name, life, mana, maxLife, maxMana }: { name: string, life: number, mana: number, maxLife: number, maxMana: number }) {
    if (maxMana == 0) maxMana = 1
    return <div className="showCharactersGame inline-flex flex-col bg-gray-500 px-5 pt-4">
        <div className="showCharactersGame text-center">
            <h2>{name}</h2>
        </div>
        <div className="showCharactersGame flex gap-10">
            <div>
                <h3 style={{ textAlign: "center" }}>Vida</h3>
                <CircularProgressWithLabel style={{ margin: "0 auto" }} sx={{ label: { color: 'white' } }} value={Math.floor((life / maxLife) * 100)} type="success" />
            </div>
            <div>
                <h3 style={{ textAlign: "center" }}>Mana</h3>
                <CircularProgressWithLabel style={{ margin: "0 auto" }} value={Math.floor((mana / maxMana) * 100)} type="primary" />
            </div>
        </div>
    </div>
}