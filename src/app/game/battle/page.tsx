"use client"
import { useEffect, useState } from "react";
import BattleDialog from "./components/BattleDialog";
import { Character } from "./components/Character";
import Enemy from "./components/Enemy";
import { useDialogHooks } from "@/app/hooks/useDialogHook";
import { DialogBox } from "./components/DialogBox";
import { timeout } from "@/app/utils";

//Criar useEffect para verificar quem pode agir, e permitir escolher ação caso seja um player

//@ts-ignore
const mock: { players: { id: number, name: string, mana: number, vida: number, isPlayable: boolean, side: "P" }[], enemies: { id: number, type: "Skeleton" | "Zombie" | "Orc" | "Slime", vida: number, isPlayable: boolean, side: "E" }[] } = {
  players: [
    {
      id: 1,
      name: "Jose",
      mana: 100,
      vida: 100,
      isPlayable: true,
      side: "P"
    },
    {
      id: 2,
      name: "Jv",
      mana: 0,
      vida: 100,
      isPlayable: false,
      side: "P"
    },
    {
      id: 3,
      name: "Gabriel",
      vida: 100,
      mana: 100,
      isPlayable: false,
      side: "P"
    }
  ],
  enemies: [
    {
      id: 1,
      type: "Skeleton",
      vida: 100,
      isPlayable: false,
      side: "E"
    },
    {
      id: 2,
      type: "Zombie",
      vida: 100,
      isPlayable: false,
      side: "E"
    },
    {
      id: 3,
      type: "Orc",
      vida: 100,
      isPlayable: false,
      side: "E"
    }
  ]
}

let type = 0

export default function Battle() {

  function enemyPlay(){
    //Inimigo joga
  }

  function playerPlay(){
    //Player joga
  }

  function updateTurn(){
    setTurn(turn+1)
  }

  const [turn, setTurn] = useState(0)


  const [open, handleClickOpen, handleClose] = useDialogHooks()

  const [lastAction, setLastAction] = useState("")

  let [dialogText, setDialogText] = useState("")

  async function writeWithDelay(text: string, delay: number){
    dialogText = ""
    setDialogText(dialogText)
    for (let letter of text.split("")){
      dialogText += letter
      setDialogText(dialogText)
      await timeout(delay)
    }
  }

  useEffect(() => {
    if(type == 0){
      (async () => {
        type = 1
        //Aqui vai ficar embelezamento das animações
        await writeWithDelay("A batalha esta começando", 0.05)
        await timeout(3)
        //Mostrar inimigos
        await writeWithDelay("3 2 1", 1)
        await timeout(1)
        setDialogText("Escolha a sua próxima ação")
        await timeout(3)
        handleClickOpen()
      })()
    }
    else if(type == 2){
      setDialogText("Agora escolha um inimigo para atacar")
    }
  })

  return (
    <main className="flex flex-col h-screen">
      <div
        className=" flex items-center justify-center gap-5"
        style={{ flex: 4 }}
      >
        {mock.enemies.map(item => <Enemy key={item.id} type={item.type} life={item.vida} />)}
      </div>
      <BattleDialog setAction={setLastAction} handleClose={() => {type=2; handleClose();}} open={open} attack={100} defense={50} />
      <DialogBox text={dialogText} />
      <div
        className="flex flex-row gap-1 w-screen justify-center items-end"
        style={{ flex: 1 }}
      >
        {mock.players.map(item => <Character key={item.id} name={item.name} mana={item.mana} life={item.vida} />)}
      </div>
    </main>
  );
}
