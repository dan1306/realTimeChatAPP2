"use client"
import { useState } from "react"
import "../styles/ChatOptions.css"
import ChatList from "./ChatList"


const ChatOptions = () => {
    const  [chatSelected, setChateSelected] = useState<string>("chats");
    // const [groupChatSelected, setGr]

    const handleChatTypeClick = (val: string) => {
        setChateSelected(val);
        // e.preventDefault();
        
    }

    return(
        <div className="chat-options-main-div">
            <div className="individualChats-groups-whoIsOnline">
                <div onClick = {() => handleChatTypeClick('chats')}>Chats</div>
                {/* <div>Groups</div> */}
                <div onClick ={() => handleChatTypeClick('online')}>Online</div>
            </div>
            {       
                chatSelected === "chats" ? (<ChatList />) : <></>
            }
        </div>          
    )


}

export default ChatOptions