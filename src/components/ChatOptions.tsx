"use client"
import { useEffect, useState } from "react"
import "../styles/ChatOptions.css"
import ChatList from "./ChatList"
import IndividualChat from "./IndividualChat"
import CloseModalUserChat from "./CloseModalUserChat"

interface User {
    image?: string,
    email?: string,
    id?: string,
    name?: string 
}
const ChatOptions = () => {
    const  [chatSelected, setChateSelected] = useState<string>("chats");
    // const [userSelectedConvo, setUserSelectedConvo] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // const [recipientId, setRecipientId] = useState<string>("");
    // const [recipientImage, setRecipientImage] = useState<string>("");
    // const [recipientEmail, setRecipientEmail] = useState<string>("");
    // const [recipientName, setRecipientName] = useState<string>("");
    // const [groupChatSelected, setGr]

    const handleChatTypeClick = (val: string) => {
        setChateSelected(val);
        // e.preventDefault();
        
    }
    const handleSelectedUser = (user: User | null) =>{
        setSelectedUser(user);  
        // console.log(selectedUser);
    }

    useEffect(()=>{
        if(selectedUser){
             console.log("selected user changed: ",selectedUser);
        }
    }, [selectedUser])
    return(
        <div className="chat-options-main-div">
            <div className={ selectedUser?.name && selectedUser?.image ? "userCardSelected" : "individualChats-groups-whoIsOnline"}>
                {
                    selectedUser?.name && selectedUser?.image ? 
                        <>
                            <div className="userCardSelectedImg">
                                <img src={selectedUser.image} className="img" />
                                
                            </div>
                            {/* {selectedUser.name}               */}
                            <div className="selectedUserName"> 
                                {selectedUser.name}
                                
                                <CloseModalUserChat userSelected={setSelectedUser} />
                            </div>
                        </>
                        :
                        <div onClick = {() => handleChatTypeClick('chats')}>Messages</div>
                }
               
                {/* <div>Groups</div> */}
            {/* <div onClick ={() => handleChatTypeClick('online')}>Online</div> */}
            </div>
            { 
                selectedUser?.image && selectedUser?.name ?
                <div className="chat-container">
                    <IndividualChat />
                </div>
                :
                <ChatList userSelected={handleSelectedUser} />
            }
        </div>          
    )


}

export default ChatOptions