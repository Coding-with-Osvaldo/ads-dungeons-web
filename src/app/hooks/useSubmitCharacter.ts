export default async function handleSubmit(userName: string,characters:{name: string, type: string}[]) {
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

/*fetch(`http://localhost:8080/${item.class.toLowerCase()}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({ nome: item.name })
})*/