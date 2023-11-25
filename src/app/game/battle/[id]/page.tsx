"use client"
import { useEffect, useState } from "react";
import BattleDialog from "./components/BattleDialog";
import { Character } from "./components/Character";
import Enemy from "./components/Enemy";
import { useDialogHooks } from "@/app/hooks/useDialogHook";
import { DialogBox } from "./components/DialogBox";
import { gameController } from "@/app/utils/gameController";
import { ResultBox } from "./components/ResultBox";
import { useResultHook } from "@/app/hooks/useResultHook";

//@ts-ignore
import {useSound} from "use-sound"
import { StartDialog } from "./components/StartDialog";



let [gameManager, updateAction, mock, actualEntity] = gameController()

export default function Battle({params}: {params: {id: string}}) {

  const [playMusic] = useSound("/rude_buster.mp3");

  const [open, handleClickOpen, handleClose, dialogText, setDialogText, writeWithDelay] = useDialogHooks()
  const [resultStatus, handleOpenResult, handleCloseResult] = useResultHook()
  const [lastAction, setLastAction] = useState("")
  const [lastTarget, setLastTarget] = useState(-1)
  const [start, setStart] = useState(true)

  useEffect(() => {
    gameManager(params.id, writeWithDelay, setDialogText, handleClickOpen, lastTarget)
  })
  
  return (
    <main className="flex flex-col h-screen">
      <StartDialog open={start} handleAccept={() => {playMusic();setStart(false)}} handleCancel={() => {setStart(false)}}/>
      <div
        className=" flex items-center justify-center gap-5"
        style={{ flex: 4 }}>
        {mock.enemies.length != 0 && mock.enemies
        .map(item => <Enemy 
          handleClick={() => {updateAction('waitChooseEnemy'); setLastTarget(item.id); setDialogText("...")}} 
          key={item.id} 
          type={item.nome} 
          life={item.vida} 
          maxLife={item.maxLife}
          />
        )}
      </div>
      <ResultBox open = {resultStatus} handleClickOpen={handleOpenResult} handleClose={handleCloseResult} status={false} />  
      <BattleDialog 
        setAction={setLastAction} 
        handleClose={() => { updateAction("chooseTarget"); handleClose()}} 
        open={open} 
        attack={100} 
        defense={50} 
      />
      <DialogBox text={dialogText} />
      <div
        className="flex flex-row gap-1 w-screen justify-center items-end"
        style={{ flex: 1 }}>
        {mock.players.length != 0 &&mock.players
          .map(item => <Character 
            key={item.id} 
            name={item.nome} 
            mana={item.mana} 
            life={item.vida} 
            maxLife = {item.maxLife}
            maxMana = {item.maxMana}/>
        )}
      </div>
    </main>
  );
}
