export function timeout(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

export function generateRandom(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}