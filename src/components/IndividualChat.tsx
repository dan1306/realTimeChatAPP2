"use client"


import { useEffect, useState } from "react";
import "../styles/IndividualChat.css"
import { socket } from "../socket";

let UserId: string | undefined


socket.on('connect', () => {
    UserId = socket.id
    console.log("UserId: ", UserId)
})




const IndividualChat = () => {
    const [message, setMessage] = useState<string>('')
    const [messageEmpty, setMessageEmpty] = useState<boolean>(false)
    const sendMessage = () => {
        const tempMessage: string = message.trim()
        if (tempMessage.length !== 0) socket.emit("send_message", { message });
        setMessageEmpty(true )
    }

    useEffect(() => {
        // console.log("h1")
        socket.on("recieve_message", (data: {message: string, id: string }) => {
        console.log(data.id , data.message)
        } )
    }, [socket]);


    return (
        <>
            <div className="chat-user-selected">
                  <img  className="user-chat-img"></img>
                  <div className="user-chat-name">
                        placehofer
                  </div>
            </div>
            <div className="chat-field">
                <div className="chat-display">
                    <div>
                        asda
                    </div>
                    <div>
                        aaff
                    </div>
                </div>
                <div className="chat-interaction">
                    <div className="chat-interaction-image-field">
                        div 1
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
                        <div className="add-img-field"></div>
                        <div className="send-message" onClick={()=> sendMessage()}></div>

                    </div>
                </div>
            </div>
        </>


    )


}

export default IndividualChat;