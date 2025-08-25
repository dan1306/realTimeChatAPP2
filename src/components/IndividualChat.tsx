"use client"


import { FC, useEffect, useState } from "react";
import "../styles/IndividualChat.css"
import {socket} from "../components/ChatOptions"
// import { Send } from 'lucide-react';
import { BsSendFill } from 'react-icons/bs';
import { MdPhoto } from "react-icons/md";

// let UserId: string | undefined


// socket.on('connect', () => {
    // UserId = socket.id
    // console.log("UserId: ", UserId)
// })

interface MyMessage {
  messge: String;
  fromMe: boolean;
  id: number
}


interface interaction {
    recipient: string,
    owner: string
}


const IndividualChat : FC<interaction> = ({recipient, owner}) => {
    const [message, setMessage] = useState<string>('')
    const [messageEmpty, setMessageEmpty] = useState<boolean>(false)
    const [myMessage, setMessages] = useState<MyMessage[]>([]); 
    const [mesageId, setMessageId] = useState<number>(0)
    
    
    const sendMessage = () => {
        const tempMessage: string = message.trim()
        let data = {
            sender: owner,
            recipient,
            message
        }
        if (tempMessage.length !== 0) socket.emit("send_message", ({message, recipient}));
        setMessageEmpty(true)
        setMessageId(prevId => prevId + 1);
        const newMessage: MyMessage = {
            id: mesageId,
            fromMe: true,
            
            messge: tempMessage

        };

        // Use the spread operator to create a new array with the existing messages and the new one

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        
    }

    useEffect(() => {
        // console.log("h1")
        setMessageId(prevId => prevId + 1);

        socket.on("recieve_message", (data) => {
        
            console.log("dadas", data)
            const newMessage: MyMessage = {
            id: mesageId,
            fromMe: false,

            messge: data
        };

        // Use the spread operator to create a new array with the existing messages and the new one
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        } )
    }, [socket]);


    return (
        <>
            {/* <div className="chat-user-selected"> */}
                  {/* <img  className="user-chat-img"></img> */}
                  {/* <div className="user-chat-name"> */}
                        {/* placehofer */}
                  {/* </div> */}
            {/* </div> */}
            <div className="chat-field">
                <div className="chat-display-parent">
                    <div className="chat-display">

                            {myMessage.map(msg => (
                                msg.fromMe ? 
                                    <p className="from-me" key={msg.id}>
                                        {msg.messge}
                                    </p>
                                    :
                                    <p className="from-them" key={msg.id}>
                                        {msg.messge}
                                    </p>
                            ))}
                        </div>
                </div>
    
                <div className="chat-interaction">
                    <div className="chat-interaction-image-field">
                        image here
                    </div>
                    <div className="chat-interacting-message-parent-field">
                        <input 
                            type="text"  
                            className="message-input" 
                            placeholder="Enter A Message.."
                            onChange={(e) => {
                                const { value } = e.target
                                setMessage(value)
                            }}
                            value={message}

                        />
                        <div className="add-img-field">
                            < MdPhoto className="send-photo-icon" size={"1.3rem"} /> 
                        </div>
                        <div className="send-message" onClick={()=> sendMessage()}>
                            <BsSendFill className="send-message-icon"  size={'1.3rem'}/>
                        </div>

                        

                    </div>
                </div>
            </div>
        </>


    )


}

export default IndividualChat;