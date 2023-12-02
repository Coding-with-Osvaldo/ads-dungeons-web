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
import { StartDialog } from "./components/StartDialog";

//@ts-ignore
import Sound from "react-sound-dkadrios";

let [gameManager, updateAction, mock, actualEntity] = gameController()
//Da pra mudar isso pra dentro do gameController
//Lembrar de limpar inimigos ao ganhar partida, ou simplesmente ir apagando eles do array

let result: any = {status: false}

export default function Battle({params}: {params: {id: string}}) {

  const [open, handleClickOpen, handleClose, dialogText, setDialogText, writeWithDelay] = useDialogHooks()
  const [resultStatus, handleOpenResult, handleCloseResult] = useResultHook()
  const [lastAction, setLastAction] = useState("")
  const [lastTarget, setLastTarget] = useState(-1)
  const [started, setStart] = useState(false)

  useEffect(() => {
    gameManager(params.id, writeWithDelay, setDialogText, handleClickOpen, lastTarget, handleOpenResult, result)
  })
  
  return (
    <main className="flex flex-col h-screen">
      <Sound 
        loop={true} 
        autoLoad={true} 
        url="https://ia601908.us.archive.org/12/items/Bandcamp-277078843/277078843.mp3" 
        playStatus={!started ? "STOPPED" : "PLAYING"}
        volume={10}
      />
      <StartDialog 
        open={!started} 
        handleAccept={() => {updateAction("start");setStart(true)}} 
        handleCancel={() => {setStart(true)}}
      />
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
      <ResultBox 
        open = {resultStatus} 
        handleClose={handleCloseResult}
        status={result.status}
        handleVictory={() => {updateAction("wait"); setStart(false)}}
      />  
       <BattleDialog 
        setAction={setLastAction} 
        handleClose={() => { updateAction("chooseTarget"); handleClose()}} 
        open={open} 
        attack={100} 
        defense={50} 
      />
      {started && <DialogBox text={dialogText} />}
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
