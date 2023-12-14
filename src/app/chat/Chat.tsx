"use client"
import { useEffect, useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';

//@ts-ignore
import Stomp from 'stompjs';
//@ts-ignore
import SockJS from 'sockjs-client';

let stompClient: any = null;
let username = "Jose";
let connected = false

export default function Chat({username}: {username: string}){
    const [messages, setMessages] = useState<any[]>([])

    function updateMessages(message: any) {
        let backup = messages
        backup.push(message)
        setMessages([...backup])
    }
    function connect() {
        var socket = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }

    function onConnected() {
        connected = true
        stompClient.subscribe('/topic/public', onMessageReceived);
        stompClient.send("/app/chat.addUser",
            {},
            JSON.stringify({sender: username, type: 'JOIN'})
        )
    }

    function onError(error: any) {
        console.log(error);
    }
    
    
    function sendMessage(text: string) {
        let chatMessage = {
            sender: username,
            content: text,
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

    function PaperComponent(props: PaperProps) {
        return (
          <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
          >
            <Paper {...props} />
          </Draggable>
        );
      }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        if(!connected) {
            connect()
            connected = true
        }
    })

    const [text, setText] = useState<string>("")
    
    return <>
      <Button variant="outlined" onClick={handleClickOpen} style={{ position: "absolute", right: 0, bottom: 0 }}>
        Abrir chat
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Global Chat
        </DialogTitle>
        <DialogContent style={{ width: "40vw" }}>
            <div>
                {messages.map((item, index) => {
                    return <div key={index}>
                        <p style={{color: "blue",textAlign: username == item.sender ? "right" : "left", marginBottom: "10px"}}>user: {item.sender.split("-")[0]}</p>
                        <p style={{ textAlign: username == item.sender ? "right" : "left", marginBottom: "10px"}} >{item.content}</p>
                        <p></p>
                    </div>
                })}
            </div>
        </DialogContent>
        <DialogActions>
            <TextField autoFocus value={text} onChange={(event) => {
                setText(event.target.value)
            }}/>
            <Button onClick={() => {
                sendMessage(text)
                setText("")
            }}>
                Enviar
            </Button>
        </DialogActions>
      </Dialog>
    </>
}