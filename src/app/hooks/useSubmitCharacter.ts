import { clearMock } from "../utils"

export async function handleSubmit(userName: string,characters:{nome: string, type: string}[]) {
  const resultJson = await fetch(`https://ads-dungeons-api.onrender.com/usuario`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify({ nome: userName, personagens: characters })
  })
  const result = await resultJson.json()
  return result.id
}

export async function handleUpdateParty(mock: {players: any[], enemies: any[]}){
  await fetch("https://ads-dungeons-api.onrender.com/update-party", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "put",
      body: JSON.stringify(clearMock(mock))
  })
}

export async function handleUpdateScore(id: string){
  await fetch("https://ads-dungeons-api.onrender.com/update-score/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "put"
  })
}

