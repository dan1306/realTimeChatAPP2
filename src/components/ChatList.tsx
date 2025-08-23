"use client"
import { FC, useState } from "react"
import "../styles/ChatOptions.css"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserChatCard from "./UserChatCard";
import { useEffect } from "react";

interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string; // optional
}

interface ChatListProp {
    userSelected: (user: User| null) => void
}
const ChatList: FC<ChatListProp> = ({userSelected}) => {
    // const  [chatSelected, setChateSelected] = useState<boolean>(false)
    // const [groupChatSelected, setGr]

    const {data, isLoading, error, refetch} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const {data} = await axios.get("/api/allUsers");
            return data;
        }
    })

    useEffect(()=> {
        refetch();
    }, [])

    console.log("data", data);
    return(
        <div className="selected-chat-option">
            {
                data ? 
                data.map((user: User) =>(
                    <UserChatCard key={user.id} {...user} userSelected={userSelected}/>
                )) : <></>
            }
        </div>
    )


}

export default ChatList 