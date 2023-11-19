export default async function handleSubmit(userName: string,characters:{name: string, class: string}[]) {
    characters.forEach(async (item) => {
      
    })   
}

/*fetch(`http://localhost:8080/${item.class.toLowerCase()}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({ nome: item.name })
})*/