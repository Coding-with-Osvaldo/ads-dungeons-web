"use client"

import { Button } from "@mui/material"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div className="h-screen flex flex-col justify-evenly ">
      <header className="flex content-center items-center" >
        <h1 className="text-center w-full text-6xl p-8" >ADS-Dungeons</h1>
      </header>
      <main className="w-full flex place-content-center flex-col gap-5">
        <Button className="mx-auto px-16 py-4 rounded-full text-lg bg-gradient-to-tr from-green-500 to-green-800" variant="contained" onClick={() => { router.replace("/game") }}>Jogar</Button>
        <Button className="mx-auto px-16 py-4 rounded-full text-lg bg-gradient-to-tr from-green-500 to-green-800" variant="contained" onClick={() => { router.replace("/ranking") }}>Ranking</Button>
      </main>
    </div>
  )
}
