"use client"

import { Button } from "@mui/material"
import { useRouter } from 'next/navigation'
import './globals.css'

export default function Home() {
  const router = useRouter()
  return (
    <body className="bodyMain">
      <div className="h-screen flex flex-col justify-evenly ">
        <header className="flex content-center items-center" >
          <h1 className="titleMain text-center w-full text-6xl p-8" >ADS-Dungeons</h1>
        </header>
        <main className="w-full flex place-content-center flex-col gap-5">
          <Button className="buttonConfig mx-auto px-16 py-4 rounded-full text-lg bg-gradient-to-tr " variant="contained" onClick={() => { router.replace("/game") }}>Jogar</Button>
          <Button className="buttonConfig mx-auto px-16 py-4 rounded-full text-lg bg-gradient-to-tr " variant="contained" onClick={() => { router.replace("/ranking") }}>Ranking</Button>
        </main>
      </div>
    </body>
  )
}
