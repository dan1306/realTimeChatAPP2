"use client"
import { FC, useEffect, useState } from "react"
import "../styles/ChatOptions.css"
import ChatList from "./ChatList"
import IndividualChat from "./IndividualChat"
import CloseModalUserChat from "./CloseModalUserChat"
import { io } from "socket.io-client"

export const socket = io("http://localhost:3000");


let socketId: string | undefined


socket.on('connect', () => {
    socketId = socket.id
    console.log("UserId: ", socketId)
})




interface User {
    image?: string,
    email?: string,
    id?: string,
    name?: string 
}

interface chatOptionProp {
    email: string
}
const ChatOptions: FC<chatOptionProp> = ({email} ) => {
    const  [chatSelected, setChateSelected] = useState<string>("chats");
    // const [userSelectedConvo, setUserSelectedConvo] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // const [recipientId, setRecipientId] = useState<string>("");
    // const [recipientImage, setRecipientImage] = useState<string>("");
    // const [recipientEmail, setRecipientEmail] = useState<string>("");
    // const [recipientName, setRecipientName] = useState<string>("");
    // const [groupChatSelected, setGr]
    // const userSession: User = user;
    const conncectedUsers = new Map<string, string>();
/*
    useEffect(()=>{
        if(email && socketId){
            // conncectedUsers.set(email, socketId);
            socket.emit("register_user", 
                {
                    "user_email": email,
                    "socket_id": socketId
                }
            );
            console.log("synced: ",{
                    "user_email": email,
                    "socket_id": socketId
                })
        }
    }, [])
*/

    useEffect(()=>{
        if(email && socketId){
            // conncectedUsers.set(email, socketId);
            socket.emit("register_user", 
                {
                    "user_email": email,
                    "socket_id": socketId
                }
            );
            console.log("synced: ",{
                    "user_email": email,
                    "socket_id": socketId
                })
        }
    }, [email, socketId])


    useEffect(()=>{
        socket.on("hey_register_new_user", (data) => {
                // console.log("recvdata: ", data)
                console.log("new connection: ", data);
                socket.emit("registering_foreign_user", data);
            } 
        )

        socket.on("registered_you_so_register_me", (data)=>{
            socket.emit("fine_you_will_be_registered", data);
            
        })

        socket.on('done', (data)=>{
            console.log("tasks done: ", data);
        })
        
        
        socket.on('placed', (data)=>{
            console.log("placed: ", data);
        })

        socket.on("a_user_disconnected", (data)=>{
            console.log("a user disconnected: ", data)
            socket.emit("remove_user_connection", data)            
        })

        socket.on('removed_a_user_connection', (data)=>{
            console.log("removeed user connection", data);
        })
/*
        socket.on("good", (data)=>{
            console.log("good: ", data);
        })
*/
        // console.log("conncectedUsers: ", conncectedUsers);
    }, [socket])

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