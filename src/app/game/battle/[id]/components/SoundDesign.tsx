//@ts-ignore
import Sound from "react-sound-dkadrios";

const sounds = {
    background: {
        loop: true,
        url: "/rude_buster.mp3",
        playStatus: "PLAYING"
    },
    backgroundOff: {
        loop: true,
        url: "/rude_buster.mp3",
        playStatus: "STOPPED"
    },
    victory: {
        loop: false,
        url: "/victory.mp3",
        playStatus: "PLAYING"
    },
    defeat: {
        loop: false,
        url: "/defeat.mp3",
        playStatus: "PLAYING"
    }
}

let actualSound = sounds.backgroundOff

export function changeSound(sound: "background" | "backgroundOff" | "victory" | "defeat"){
    actualSound = sounds[sound]
}

export function SoundControl(){
    return <Sound 
        loop={actualSound.loop} 
        autoLoad={true} 
        url= { actualSound.url}
        playStatus={ actualSound.playStatus}
        volume={10}
    />
}

