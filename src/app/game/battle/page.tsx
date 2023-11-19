"use client"
import { useEffect, useState } from "react";
import BattleDialog from "./components/BattleDialog";
import { Character } from "./components/Character";
import Enemy from "./components/Enemy";
import { useDialogHooks } from "@/app/hooks/useDialogHook";
import { DialogBox } from "./components/DialogBox";
import { generateRandom, timeout } from "@/app/utils";
import { mock } from "@/data/mock";
import { gameController } from "@/app/utils/gameController";


/* Funcionamento da variavel actualAction
  actualAction == 0 -> Introduz o jogo por meio de mensagens no dialogbox
  actualAction == 1 -> Impede o useEffect de executar outra ação enquanto atualiza as mensagens
  actualAction == 2 -> Realiza um teste para saber quem vai jogar agora, se é personagem ou inimigo
  actualAction == 3 ...
  actualAction == 4
  actualAction == 5
  actualAction == 6
 
*/


let [actualAction, actualEntity, updateTurn] = gameController()

export default function Battle() {

  const [open, handleClickOpen, handleClose, dialogText, setDialogText, writeWithDelay] = useDialogHooks()

  const [lastAction, setLastAction] = useState("")
  const [lastTarget, setLastTarget] = useState(-1)

  useEffect(() => { // eslint-disable-line
    if(actualAction == 0){

      (async () => {

        actualAction = 1

        await writeWithDelay("A batalha esta começando", 0.05)
        await timeout(3)
        await writeWithDelay("3 2 1", 1)
        await timeout(2)

        actualAction = 2

        setDialogText(".")

      })()
    }
    else if(actualAction == 2){

      //Testar game over

      actualEntity = updateTurn() //Altera a entidate selecionada

      if(actualEntity.side == "P"){
        actualAction = 3
        handleClickOpen()
      }

      else {
        actualAction = 6
        setDialogText("Turno do inimigo")
      }

    }
    else if(actualAction == 4){
      setDialogText("Escolha um inimigo")
    }

    else if(actualAction == 5){
      mock.enemies.forEach((item,index) => {
        if(item.id == lastTarget){
          mock.enemies[index].vida -= 20
        }
      })

      actualAction = 2

      setDialogText("..")

    }

    else if(actualAction == 6){

      (async () => {

        actualAction = 7
        const alivePlayers: any[] = []
        mock.players.forEach((player) => {
          if(player.vida > 0){
            alivePlayers.push(player)
          }
        })

        await writeWithDelay("Um inimigo esta atacando",0.07)
        await timeout(2)

        const playerAttacked = alivePlayers[generateRandom(0, alivePlayers.length-1)]
        mock.players.forEach((item,index) => {
          if(item.id == playerAttacked.id){
            mock.players[index].vida -= 20
          }
        })

        await writeWithDelay("Um player foi atacado",0.05)
        await timeout(2)

        actualAction = 2

        setDialogText("Seu turno agora")
      })()
    }
  })

  return (
    <main className="flex flex-col h-screen">

      <div
        className=" flex items-center justify-center gap-5"
        style={{ flex: 4 }}>

        {mock.enemies
        .map(item => <Enemy 
          handleClick={() => { actualAction = 5; setLastTarget(item.id); setDialogText("...")}} 
          key={item.id} 
          type={item.type} 
          life={item.vida} />
        )}

      </div>

      <BattleDialog 
        setAction={setLastAction} 
        handleClose={() => {actualAction=4; handleClose();}} 
        open={open} 
        attack={100} 
        defense={50} 
      />

      <DialogBox text={dialogText} />

      <div
        className="flex flex-row gap-1 w-screen justify-center items-end"
        style={{ flex: 1 }}>
        {mock.players
          .map(item => <Character 
            key={item.id} 
            name={item.name} 
            mana={item.mana} 
            life={item.vida} />
        )}
      </div>

    </main>
  );
}
