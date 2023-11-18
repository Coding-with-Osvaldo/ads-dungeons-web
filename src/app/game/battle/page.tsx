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
const mock: { players: { id: number, name: string, mana: number, vida: number, side: "P" }[], enemies: { id: number, type: "Skeleton" | "Zombie" | "Orc" | "Slime", vida: number, side: "E" }[] } = {
  players: [
    {
      id: 1,
      name: "Jose",
      mana: 100,
      vida: 100,
      side: "P"
    },
    {
      id: 2,
      name: "Jv",
      mana: 0,
      vida: 100,
      side: "P"
    },
    {
      id: 3,
      name: "Gabriel",
      vida: 100,
      mana: 100,
      side: "P"
    }
  ],
  enemies: [
    {
      id: 4,
      type: "Skeleton",
      vida: 100,
      side: "E"
    },
    {
      id: 5,
      type: "Zombie",
      vida: 100,
      side: "E"
    },
    {
      id: 6,
      type: "Orc",
      vida: 100,
      side: "E"
    }
  ]
}

let type = 0

const turns = [1,4,2,5,3,6]
const isPlayable = [true, false, false, false, false, false]

let actualEntity:any = null
let lastIndex = -1


function getEntitie(index: number):{}{
  let result = {}
  mock.players.forEach(item => {
    if(item.id == index){
      result = item
    }
  })
  mock.enemies.forEach(item => {
    if(item.id == index){
      result = item
    }
  })
  return result
}

export default function Battle() {

  function enemyPlay(){
    //Inimigo joga
  }

  function playerPlay(){
    //Player joga
  }

  const [open, handleClickOpen, handleClose] = useDialogHooks()

  const [lastAction, setLastAction] = useState("")
  const [lastTarget, setLastTarget] = useState(-1)

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
        await timeout(2)
        type = 2
        setDialogText("")
      })()
    }
    else if(type == 2){
      lastIndex = -1
      turns.forEach((item,index) => {
        if(isPlayable[index]){
          lastIndex = index
          actualEntity = getEntitie(turns[index])
        }
      })
      if(actualEntity != null){
        if(lastIndex+1 == turns.length){
          isPlayable[lastIndex] = false
          isPlayable[0] = true
        }else {
          isPlayable[lastIndex] = false
          isPlayable[lastIndex+1] = true
        }
      }
      //@ts-ignore
      if(actualEntity.side == "P" | actualEntity.side=="E"){
        type = 3
        handleClickOpen()
      }
    }
    else if(type == 4){
      setDialogText("Escolha um inimigo")
    }
    else if(type == 5){
      mock.enemies.forEach((item,index) => {
        if(item.id == lastTarget){
          mock.enemies[index].vida -= 20
        }
      })
      type = 2
      setDialogText("Deu bom")
    }
  })

  return (
    <main className="flex flex-col h-screen">
      <div
        className=" flex items-center justify-center gap-5"
        style={{ flex: 4 }}
      >
        {mock.enemies.map(item => <Enemy handleClick={() => { type = 5; setLastTarget(item.id) }} key={item.id} type={item.type} life={item.vida} />)}
      </div>
      <BattleDialog setAction={setLastAction} handleClose={() => {type=4; handleClose();}} open={open} attack={100} defense={50} />
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
