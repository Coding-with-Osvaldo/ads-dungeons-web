export const mock: { players: { id: number, name: string, mana: number, vida: number, side: "P" }[], enemies: { id: number, type: "Skeleton" | "Zombie" | "Orc" | "Slime", vida: number, side: "E" }[] } = {
    players: [
      {
        id: 1,
        name: "Jose",
        mana: 100,
        vida: 100,
        side: "P"
      },
      {
        id: 2,
        name: "Jv",
        mana: 0,
        vida: 100,
        side: "P"
      },
      {
        id: 3,
        name: "Gabriel",
        vida: 100,
        mana: 100,
        side: "P"
      }
    ],
    enemies: [
      {
        id: 4,
        type: "Skeleton",
        vida: 100,
        side: "E"
      },
      {
        id: 5,
        type: "Zombie",
        vida: 100,
        side: "E"
      },
      {
        id: 6,
        type: "Orc",
        vida: 100,
        side: "E"
      }
    ]
  }