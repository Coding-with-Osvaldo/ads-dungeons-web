export default async function handleSubmit(userName: string,characters:{nome: string, type: string}[]) {
  const resultJson = await fetch(`http://localhost:8080/usuario`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify({ nome: userName, personagens: characters })
  })
  const result = await resultJson.json()
  console.log(result)
  return result.id
}