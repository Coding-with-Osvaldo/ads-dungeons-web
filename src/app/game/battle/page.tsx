import { Character } from "./components/Character";

export default function Battle(){
    return <main className="flex flex-col h-screen">
        <div className=" bg-gray-300 flex" style={{ flex:3 }}>
            
        </div>
        <div className="flex flex-row gap-1 w-screen justify-center items-end" style={{ flex:1 }}>
            <Character/>
            <Character/>
            <Character/>
        </div>
    </main>
}