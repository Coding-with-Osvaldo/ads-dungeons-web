import { Button } from "@mui/material"
import { RankingPlayers } from "./components/Ranking"
import Link from "next/link"
import '../ranking/components/style.css'
export default async function Ranking() {
    const response = await fetch("http://localhost:8080/usuarios", {
        cache: "no-cache"
    })
    const data = await response.json()
    const mock: { name: string, score: number }[] = [...data.map((user: any) => ({ name: user.nome, score: user.score }))]

    return <>
        <body className="body">

            <Link href={"/"}>
                <Button className="px-16 py-4 rounded-full text-lg bg-gradient-to-tr from-green-500 to-green-800 m-5" variant="contained">Voltar</Button>
            </Link>
            <h1 className='titleRanking pb-10 text-xl' >Ranking dos melhores jogadores</h1>
            <div className="flex justify-center" >
                <RankingPlayers rows={mock} />
            </div>
        </body>
    </>
}