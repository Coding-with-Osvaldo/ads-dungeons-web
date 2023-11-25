import { create } from "domain"
import { generateRandom, generateTurns, timeout } from "."

export function gameController() : [Function, Function, {players: any[], enemies: any[]}, any]{

    let actualAction = 0

    let actions = {
        start: 0,
        wait: 1,
        turnConstruction: 2,
        waitInteraction: 3,
        chooseTarget: 4,
        waitChooseEnemy: 5,
        enemyTurn: 6
    }

    let actualEntity:any = null
    let lastIndex = -1

    let turns: any, isPlayable: any = []

    const mock: {players: any[], enemies: any[]} = {players: [], enemies: []}

    async function initBattle(id: string){

        const playersJson = await fetch(`http://localhost:8080/usuario/`+ id, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "get",
        })
        const playersResult = await playersJson.json()

        mock.players = playersResult.personagens.map((item:any) => {return item.mana != undefined ? {...item, side: "P", maxLife: item.vida, maxMana: item.mana}: {...item, side: "P", maxLife: item.vida, maxMana: 0, mana: 0}})


        const enemiesJson = await fetch('http://localhost:8080/batalha-random/', {
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

        return actualEntity
    }

    function gameManager(id: string, writeWithDelay: Function, setDialogText: Function, handleClickOpen: Function, lastTarget: number){
        if(actualAction == actions.start){
            (async () => {
              actualAction = actions.wait
              await initBattle(id)
              await writeWithDelay("A batalha esta começando", 0.05)
              await timeout(3)
              await writeWithDelay("3 2 1", 1)
              await timeout(2)
              actualAction = actions.turnConstruction
              setDialogText(".")
            })()
          }
          else if(actualAction == actions.turnConstruction){
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
            setDialogText("Escolha um inimigo")
          }
          else if(actualAction == actions.waitChooseEnemy){
            mock.enemies.forEach((item,index) => {
              if(item.id == lastTarget){
                mock.enemies[index].vida -= 20
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

    return [gameManager, updateAction, mock, actualEntity] 
}