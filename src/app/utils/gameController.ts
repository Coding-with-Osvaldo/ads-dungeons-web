import { mock } from "@/data/mock"
import { generateTurns } from "."

export function gameController(){

    let type = 0

    const playerIds = [...mock.players.map(item => item.id)]
    const enemyIds = [...mock.enemies.map(item => item.id)]

    const [turns, isPlayable] = generateTurns(playerIds, enemyIds)

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

    return [type, actualEntity, updateTurn]
}