import { Button } from "@mui/material"
import { RankingPlayers } from "./components/Ranking"
import Link from "next/link"
export default async function Ranking() {
    const response = await fetch("https://ads-dungeons-api.onrender.com/usuarios",{
        cache: "no-cache"
    })
    const data = await response.json()
    const mock:{name: string, score: number}[] = [...data.map((user:any) => ({name: user.nome, score: user.score}))]

    return <>
        <Link href={"/"}>
            <Button className="px-16 py-4 rounded-full text-lg bg-gradient-to-tr from-green-500 to-green-800 m-5" variant="contained">Voltar</Button>
        </Link>
        <h1 className="text-center pb-10 text-xl" >Ranking dos melhores jogadores</h1>
        <div className="flex justify-center" >
            <RankingPlayers rows={mock}/>
        </div>
    </>
}