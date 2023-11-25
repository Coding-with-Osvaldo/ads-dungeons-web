export function timeout(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

export function generateRandom(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateTurns(list1: any[], list2: any[]) {
    const interval = Math.ceil(list1.length / (list2.length + 1));
    list2.forEach((r, i) => list1.splice(interval * (i + 1) + i, 0, r))

    let turns = list1
    let isPlayable = turns.map((item:any,index:number) => index == 0 ? true : false)

    return [turns, isPlayable]
}