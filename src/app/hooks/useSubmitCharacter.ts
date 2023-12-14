import { clearMock } from "../utils"

export async function handleSubmit(userName: string,characters:{nome: string, type: string}[]) {
  const resultJson = await fetch(`http://localhost:8080/usuario`, {
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
  await fetch("http://localhost:8080/update-party", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "put",
      body: JSON.stringify(clearMock(mock)),
      cache: "no-cache"
  })
}

export async function handleUpdateScore(id: string){
  await fetch("http://localhost:8080/update-score/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "put",
      cache: "no-cache"
  })
}

