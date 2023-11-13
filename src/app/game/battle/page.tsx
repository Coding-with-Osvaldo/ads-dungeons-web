"use client"
import { useState } from "react";
import BattleDialog from "./components/BattleDialog";
import { Character } from "./components/Character";
import Enemy from "./components/Enemy";
import { useDialogHooks } from "@/app/hooks/useDialogHook";
import { DialogBox } from "./components/DialogBox";

//@ts-ignore
const mock: { players: { id: number, name: string, mana: number, vida: number, isPlayable: boolean }[], enemies: { id: number, type: "Skeleton" | "Zombie" | "Orc" | "Slime", vida: number, isPlayable: boolean }[] } = {
  players: [
    {
      id: 1,
      name: "Jose",
      mana: 100,
      vida: 100,
      isPlayable: true
    },
    {
      id: 2,
      name: "Jv",
      mana: 0,
      vida: 100,
      isPlayable: false
    },
    {
      id: 3,
      name: "Gabriel",
      vida: 100,
      mana: 100,
      isPlayable: false
    }
  ],
  enemies: [
    {
      id: 1,
      type: "Skeleton",
      vida: 100,
      isPlayable: false
    },
    {
      id: 2,
      type: "Zombie",
      vida: 100,
      isPlayable: false
    },
    {
      id: 3,
      type: "Orc",
      vida: 100,
      isPlayable: false
    }
  ]
}

export default function Battle() {

  const [open, handleClickOpen, handleClose] = useDialogHooks()

  const [lastAction, setLastAction] = useState("")

  return (
    <main className="flex flex-col h-screen">
      <div
        className=" flex items-center justify-center gap-5"
        style={{ flex: 4 }}
      >
        {mock.enemies.map(item => <Enemy key={item.id} type={item.type} life={item.vida} />)}
      </div>
      <BattleDialog setAction={setLastAction} handleClose={handleClose} open={open} attack={100} defense={50} />
      <DialogBox text="OLÁ Mundo" />
      <div
        className="flex flex-row gap-1 w-screen justify-center items-end"
        style={{ flex: 1 }}
      >
        {mock.players.map(item => <Character key={item.id} name={item.name} mana={item.mana} life={item.vida} />)}
      </div>
    </main>
  );
}
