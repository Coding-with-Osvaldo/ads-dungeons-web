export default function handleSubmit(...characters:string[]) {
    characters.forEach(async (nome) => {
      fetch(`http://localhost:8080/${nome.toLowerCase()}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({ nome })
      })
    })
    
  }