import { Character } from "./components/Character";
import Enemy from "./components/Enemy";

export default function Battle(){
    return <main className="flex flex-col h-screen">
        <div className=" flex items-center justify-center gap-5" style={{ flex:4 }}>
            <Enemy type="Skeleton" life={30}/>
            <Enemy type="Zombie" life={50}/>
            <Enemy type="Orc" life={40}/>
        </div>
        <div className="flex flex-row gap-1 w-screen justify-center items-end" style={{ flex:1 }}>
            <Character name="Jose" life={100} mana={0}/>
            <Character name="JV" life={50} mana={100}/>
            <Character name="Gabriel" life={75} mana={0}/>
        </div>
    </main>
}