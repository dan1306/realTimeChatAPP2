"use client"
import { FC, useEffect, useState } from "react"
import "../styles/ChatOptions.css"
import ChatList from "./ChatList"
import IndividualChat from "./IndividualChat"
import CloseModalUserChat from "./CloseModalUserChat"
import { io } from "socket.io-client"

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000");

//
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
const ChatOptions: FC<chatOptionProp> = ({ email }) => {
    const [chatSelected, setChateSelected] = useState<string>("chats");
    // const [userSelectedConvo, setUserSelectedConvo] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // const [recipientId, setRecipientId] = useState<string>("");
    // const [recipientImage, setRecipientImage] = useState<string>("");
    // const [recipientEmail, setRecipientEmail] = useState<string>("");
    // const [recipientName, setRecipientName] = useState<string>("");
    // const [groupChatSelected, setGr]
    // const userSession: User = user;



    useEffect(() => {
        if (email && socketId) {
            // conncectedUsers.set(email, socketId);
            socket.emit("register_user",
                {
                    "user_email": email,
                    "socket_id": socketId
                }
            );
        }
    }, [email, socketId])


    useEffect(() => {
        socket.on("new_conn", (data) => {
            console.log("new connection", data);
        })

        socket.on("updated_database", (data) => {
            console.log("update: ", data);
        })
    }, [socket])

    useEffect(() => {
        if (selectedUser?.email) {
            socket.emit("user_convo_clicked", (selectedUser.email));
        } else {
            socket.emit('user_convo_Clicked', (null))
        }
    }, [selectedUser])

    const handleChatTypeClick = (val: string) => {
        setChateSelected(val);
        // e.preventDefault();

    }
    const handleSelectedUser = (user: User | null) => {
        setSelectedUser(user);
        // console.log(selectedUser);
    }

    useEffect(() => {
        if (selectedUser) {
            console.log("selected user changed: ", selectedUser);
        }
    }, [selectedUser])
    return (
        <div className="chat-options-main-div">
            <div className={selectedUser?.name && selectedUser?.image ? "userCardSelected" : "individualChats-groups-whoIsOnline"}>
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
                        <div onClick={() => handleChatTypeClick('chats')}>Messages</div>
                }

                {/* <div>Groups</div> */}
                {/* <div onClick ={() => handleChatTypeClick('online')}>Online</div> */}
            </div>
            {
                selectedUser?.image && selectedUser?.name && selectedUser?.email ?
                    <div className="chat-container">
                        <IndividualChat recipient={selectedUser?.email} owner={email} />
                    </div>
                    :
                    <ChatList userSelected={handleSelectedUser} />
            }
        </div>
    )


}

export default ChatOptions