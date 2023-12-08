import { generateRandom, generateTurns, timeout } from "."
import { handleUpdateParty, handleUpdateScore } from "../hooks/useSubmitCharacter"

export function gameController() : [Function, Function, {players: any[], enemies: any[]}, any, any, any]{

    let actualAction = 0
    let actions = {
        musicPermission: 0,
        start: 1,
        wait: 2,
        turnConstruction: 3,
        waitInteraction: 4,
        chooseTarget: 5,
        waitChooseEnemy: 6,
        enemyTurn: 7
    }
    let actualEntity:any = null
    let lastIndex = -1
    let turns: any, isPlayable: any = []

    const mock: {players: any[], enemies: any[], score: number} = {players: [], enemies: [], score: 0}

    function getAction(){
        return actualAction
    }

    async function initBattle(id: string){

        const playersJson = await fetch(`https://ads-dungeons-api.onrender.com/usuario/`+ id, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "get",
        })
        const playersResult = await playersJson.json()

        mock.players = playersResult.personagens.map((item:any) => {return item.mana != undefined ? {...item, side: "P", maxLife: item.vida, maxMana: item.mana}: {...item, side: "P", maxLife: item.vida, maxMana: 0, mana: 0}})
        mock.score = playersResult.score

        const enemiesJson = await fetch('https://ads-dungeons-api.onrender.com/batalha-random', {
            headers: {
              "Content-Type": "application/json"
            },
            method: "get",
        })
        const enemiesResult = await enemiesJson.json()

        mock.enemies = enemiesResult.inimigos.map((item:any) => {return {...item, side: "E", maxLife: item.vida}})

        const playerIds = [...mock.players.map(item => item.id)]
        const enemyIds = [...mock.enemies.map(item => item.id)]

        const [generatedTurn, generatePlayable] = generateTurns(playerIds,enemyIds)
        turns = generatedTurn;
        isPlayable = generatePlayable
    }

    async function resetBattle(id: string){
      const enemiesJson = await fetch('https://ads-dungeons-api.onrender.com/batalha-random', {
          headers: {
            "Content-Type": "application/json"
          },
          method: "get",
      })
      const enemiesResult = await enemiesJson.json()

      mock.enemies = enemiesResult.inimigos.map((item:any) => {return {...item, side: "E", maxLife: item.vida}})

      const playerIds = [...mock.players.map(item => item.id)]
      const enemyIds = [...mock.enemies.map(item => item.id)]

      const [generatedTurn, generatePlayable] = generateTurns(playerIds,enemyIds)
      turns = generatedTurn;
      isPlayable = generatePlayable
  }


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

    function updateTurn(){
        lastIndex = -1
        turns.forEach((item:any,index:number) => {
            if(isPlayable[index]){
            lastIndex = index
            actualEntity = getEntitie(turns[index])
            }
        })
        if(actualEntity != null){
            if(lastIndex+1 == turns.length){
                isPlayable[0] = true

            }else {
                isPlayable[lastIndex+1] = true
            }
            isPlayable[lastIndex] = false
        }
        if(actualEntity.vida <= 0){
          updateTurn()
        }
        return actualEntity
    }

    function gameManager(id: string, writeWithDelay: Function, setDialogText: Function, handleClickOpen: Function, lastTarget: number, handleOpenResult: Function, result: {status: boolean}, changeSound: Function, lastAction: string){
        if(actualAction == actions.start){
            (async () => {
              actualAction = actions.wait
              if(mock.score == 0) await initBattle(id)
              else if (mock.score > 0) await resetBattle(id)
              changeSound("background")
              await writeWithDelay("A batalha esta começando", 0.05)
              await timeout(3)
              await writeWithDelay("3 2 1", 1)
              await timeout(2)
              actualAction = actions.turnConstruction
              setDialogText(".")
            })()
          }
        else if(actualAction == actions.turnConstruction){
          let isAPlayerAlive = false
          mock.players.forEach((item) => {
            if(item.vida > 0){
              isAPlayerAlive = true
            }
          })

          if(!isAPlayerAlive){
            result.status = false
            actualAction = actions.wait
            changeSound("defeat")
            handleOpenResult()
            return
          }

          let isAEnemyAlive = false
          mock.enemies.forEach((item) => {
            if(item.vida > 0){
              isAEnemyAlive = true
            }
          })

          if(!isAEnemyAlive){
            (async () => {
              actualAction = actions.wait
              result.status = true
              mock.score += 1
              changeSound("victory")
              await handleUpdateParty(mock)
              //await handleUpdateScore(id)
              handleOpenResult()
            })()
            return
          }


          actualEntity = updateTurn()
          console.log(actualEntity)
          if(actualEntity.side == "P"){
            actualAction = actions.waitInteraction
            handleClickOpen()
          }
          else {
            actualAction = actions.enemyTurn
            setDialogText("Turno do inimigo")
          }
        }
        else if(actualAction == actions.chooseTarget){
          console.log(lastAction)
          if(lastAction == "A"){
            setDialogText("Escolha um inimigo")
          }else {
            mock.enemies.forEach((item,index) => {
              if(item.vida > 0){
                mock.enemies[index].vida -= 200
              }
            })
            actualAction = actions.turnConstruction
            setDialogText("..")
          }
        }
        else if(actualAction == actions.waitChooseEnemy){
          mock.enemies.forEach((item,index) => {
            if(item.id == lastTarget){
              mock.enemies[index].vida -= 50
            }
          })
          actualAction = actions.turnConstruction
          setDialogText("..")
        }
        else if(actualAction == actions.enemyTurn){
          (async () => {
            actualAction = actions.wait
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
            actualAction = actions.turnConstruction
            setDialogText("Seu turno agora")
          })()
        }
    }

    function updateAction(value: "start" | "wait" | "turnConstruction" | "waitInteraction" | "chooseTarget" | "waitChooseEnemy" | "enemyTurn"){
        actualAction = actions[value]
    }

    return [gameManager, updateAction, mock, actualEntity, getAction, actions] 
}