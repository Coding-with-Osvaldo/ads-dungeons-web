import { randomUUID } from "crypto"
import { generateRandom, generateTurns, timeout } from "."
import { handleUpdateParty, handleUpdateScore } from "../hooks/useSubmitCharacter"
import { v4 as uuid } from 'uuid';

export function gameController() : [Function, Function, {players: any[], enemies: any[], score: number}, any, any, any]{

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

        const playersJson = await fetch(`http://localhost:8080/usuario/`+ id, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "get",
            cache: "no-cache"
        }, )
        const playersResult = await playersJson.json()

        mock.players = playersResult.personagens.map((item:any) => {return item.mana != undefined ? {...item, side: "P", maxLife: item.vida, maxMana: item.mana}: {...item, side: "P", maxLife: item.vida, maxMana: 0, mana: 0}})
        mock.score = playersResult.score

        const enemiesJson = await fetch('http://localhost:8080/batalha-random', {
            headers: {
              "Content-Type": "application/json"
            },
            method: "get",
            cache: "no-cache"
        })
        const enemiesResult = await enemiesJson.json()

        mock.enemies = enemiesResult.inimigos.map((item:any) => {return {...item, id: uuid(),side: "E", maxLife: item.vida}})

        const playerIds = [...mock.players.map(item => item.id)]
        const enemyIds = [...mock.enemies.map(item => item.id)]

        const [generatedTurn, generatePlayable] = generateTurns(playerIds,enemyIds)
        turns = generatedTurn;
        isPlayable = generatePlayable
    }

    async function resetBattle(id: string){
      const enemiesJson = await fetch('http://localhost:8080/batalha-random', {
          headers: {
            "Content-Type": "application/json"
          },
          method: "get",
          cache: "no-cache"
      })
      const enemiesResult = await enemiesJson.json()

      mock.enemies = enemiesResult.inimigos.map((item:any) => {return {...item, id: uuid(),side: "E", maxLife: item.vida}})

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
              await handleUpdateScore(id)
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
          }
          else if(lastAction == "P"){
            actualAction = actions.turnConstruction
            setDialogText("............")
            return
          }
          else if (lastAction == "X"){
            if(actualEntity.type == "G") {
              mock.enemies.forEach((item,index) => {
                if(item.vida > 0){
                  mock.enemies[index].vida -= 20
                }
              })
              actualAction = actions.turnConstruction
              setDialogText("..")
              return
            }
            if(actualEntity.type == "S") {
              if(actualEntity.mana < 20) {
                (async () => {
                  actualAction = actions.wait
                  await writeWithDelay("Falha ao curar, você não tem mana o suficiente", 0.02)
                  actualAction = actions.turnConstruction
                  setDialogText("...")
                })()
              }
              actualEntity.mana -= 20
              mock.enemies.forEach((item,index) => {
                if(item.vida > 0){
                  mock.players[index].vida += 10
                }
              })
              actualAction = actions.turnConstruction
              setDialogText("....")
            }

            if(actualEntity.type == "A") {
              actualAction = actions.chooseTarget
              setDialogText("Escolha um inimigo")
              return
            }
            if(actualEntity.type == "M") {
              if(actualEntity.mana < 20) {
                (async () => {
                  actualAction = actions.wait
                  await writeWithDelay("Falha ao atacar, você não tem mana o suficiente", 0.02)
                  actualAction = actions.turnConstruction
                  setDialogText("....")
                })()
              }
              actualEntity.mana -= 20
              mock.enemies.forEach((item,index) => {
                if(item.vida > 0){
                  mock.enemies[index].vida -= 40
                }
              })
              actualAction = actions.turnConstruction
              setDialogText(".....")
            }
            else {
              actualAction = actions.turnConstruction
              setDialogText(".......")
            }
          }

        }
        else if(actualAction == actions.waitChooseEnemy){
          if(lastAction == "X" && actualEntity.type == "A"){
            if(actualEntity.municao < 10) {
              (async () => {
                actualAction = actions.wait
                await writeWithDelay("Falha ao atirar, você não tem municão o suficiente", 0.02)
                actualAction = actions.turnConstruction
                setDialogText("......")
              })()
            }
            actualEntity.municao -= 10
            mock.enemies.forEach((item,index) => {
              if(item.id == lastTarget){
                mock.enemies[index].vida -= 80
              }
            })
            actualAction = actions.turnConstruction
            setDialogText("......")
            return
          }
          mock.enemies.forEach((item,index) => {
            if(item.id == lastTarget){
              mock.enemies[index].vida -= 50
            }
          })
          actualAction = actions.turnConstruction
          setDialogText("........")
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
            
            const ability = actualEntity.habilidades[generateRandom(0, actualEntity.habilidades.length-1)].split(",")

          if(ability[0] == "ataca" && ability[1] == "um"){
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
          }
          else if(ability[0] == "ataca" && ability[1] == "todos"){
            await writeWithDelay("Um inimigo esta atacando",0.07)
            await timeout(2)
            mock.players.forEach((item,index) => {
              mock.players[index].vida -= 20
            })
            await writeWithDelay("Todos foram atacados",0.05)
            await timeout(2)
            actualAction = actions.turnConstruction
            setDialogText("Seu turno agora")
          }
          else if(ability[0] == "cura" && ability[1] == "todos"){
            await writeWithDelay("Um inimigo esta preparando algo",0.07)
            await timeout(2)
            mock.enemies.forEach((item,index) => {
              mock.enemies[index].vida += 10
            })
            await writeWithDelay("Todos os inimigos se curaram",0.05)
            await timeout(2)
            actualAction = actions.turnConstruction
            setDialogText("Seu turno agora")
          }
          })()
        }
    }

    function updateAction(value: "start" | "wait" | "turnConstruction" | "waitInteraction" | "chooseTarget" | "waitChooseEnemy" | "enemyTurn"){
        actualAction = actions[value]
    }

    function getActualEntity(){
        return actualEntity
    }

    return [gameManager, updateAction, mock, getActualEntity, getAction, actions] 
}