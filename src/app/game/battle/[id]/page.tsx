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
import { SoundControl, changeSound } from "./components/SoundDesign";
import Chat from "@/app/chat/Chat";

let [gameManager, updateAction, mock, actualEntity, actualAction, actions] = gameController()
let result: any = { status: false }

export default function Battle({ params }: { params: { id: string } }) {

  const [open, handleClickOpen, handleClose, dialogText, setDialogText, writeWithDelay] = useDialogHooks()
  const [resultStatus, handleOpenResult, handleCloseResult] = useResultHook()
  const [lastAction, setLastAction] = useState("")
  const [lastTarget, setLastTarget] = useState(-1)
  const [started, setStart] = useState(false)

  const [chatOpen, setChatOpen] = useState(false);

  const handleClickOpenChat = () => {
      setChatOpen(true);
  };

  const handleCloseChat = () => {
      setChatOpen(false);
  };

  useEffect(() => {
    gameManager(params.id, writeWithDelay, setDialogText, handleClickOpen, lastTarget, handleOpenResult, result, changeSound, lastAction)
  })

  return (
    <main className="flex flex-col h-screen">
      <Chat username={params.id} open= {chatOpen} handleClickOpen={handleClickOpenChat} handleClose={handleCloseChat}/>
      <SoundControl />
      <StartDialog
        open={!started}
        handleAccept={() => { updateAction("start"); setStart(true) }}
        handleCancel={() => { setStart(true) }}
      />
      <div
        className=" flex items-center justify-center gap-5"
        style={{ flex: 4 }}>
        {mock.enemies.length != 0 && mock.enemies
          .map(item => <Enemy
            handleClick={() => { if (item.vida > 0 && actualAction() == actions["chooseTarget"]) { updateAction('waitChooseEnemy'); setLastTarget(item.id); setDialogText("...") } }}
            key={item.id}
            type={item.nome}
            life={item.vida}
            maxLife={item.maxLife}
          />
          )}
      </div>
      <ResultBox
        open={resultStatus}
        handleClose={handleCloseResult}
        status={result.status}
        handleVictory={() => { updateAction("wait"); changeSound("backgroundOff"); setStart(false) }}
        handleDefeat={() => { changeSound("backgroundOff"); setStart(false); mock.players = []; mock.enemies = []; mock.score = 0; }}
      />
      <BattleDialog
        setAction={setLastAction}
        handleClose={() => { updateAction("chooseTarget"); handleClose() }}
        open={open && !chatOpen}
        getCharacter={actualEntity}
      />
      {started && <DialogBox text={dialogText} />}
      <div
        className="flex flex-row gap-1 w-screen justify-center items-end"
        style={{ flex: 1 }}>
        {mock.players.length != 0 && mock.players
          .map(item => <Character
            key={item.id}
            name={item.nome}
            mana={item.mana}
            life={item.vida}
            maxLife={item.maxLife}
            maxMana={item.maxMana} />
          )}
      </div>
    </main>
  );
}
