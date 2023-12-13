"use client"
//@ts-ignore
import Stomp from 'stompjs';
//@ts-ignore
import SockJS from 'sockjs-client';
import { useEffect, useState } from 'react';

let stompClient: any = null;
let username = "Jose";
let connected = false
let loading = false
export default function Chat(){
    const [messages, setMessages] = useState<any[]>([])
    const [count, setCount] = useState<number>(0)

    function updateCount() {
        setCount(count + 1)
    }

    function updateMessages(message: any) {
        loading = true
        updateCount()
        messages.push(message)
        loading = false
        updateCount()

    }
    function connect() {
        var socket = new SockJS('https://ads-dungeons-api.onrender.com/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }

    function onConnected() {
        connected = true
        // Subscribe to the Public Topic
        stompClient.subscribe('/topic/public', onMessageReceived);
    
        // Tell your username to the server
        stompClient.send("/app/chat.addUser",
            {},
            JSON.stringify({sender: username, type: 'JOIN'})
        )

        stompClient.send("/app/chat.sendMessage",{}, JSON.stringify({sender: username, type: 'CHAT', content: "Iai"}))
    }

    function onError(error: any) {
        console.log(error);
    }
    
    
    function sendMessage() {
        var chatMessage = {
            sender: username,
            content: "Iai",
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    }
    
    
    function onMessageReceived(payload:any) {
        var message = JSON.parse(payload.body);
    
        if(message.type === 'JOIN') {
            console.log("Um usuario entrou")
        } else if (message.type === 'LEAVE') {
            console.log("Um usuario saiu")
        } else {
            updateMessages(message)         
        }
    }
    let started = false
    useEffect(() => {
        if(!connected) {
            connect()
            connected = true
        }
        if(!started){
            setInterval(() => {
                updateCount()
            }, 1000)
            started = true
        }
    })
    
    return <div>
        <button onClick={() => {
            sendMessage()
        }}>Message</button>
        {!loading && messages.map((message, index) => {
            return <p key={index + 1 }>
                {message.content}
            </p>
        })}
    </div>
}