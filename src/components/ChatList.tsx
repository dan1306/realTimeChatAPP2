"use client"
import { useState } from "react"
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

const ChatList = () => {
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
                    <UserChatCard {...user}/>
                )) : <></>
            }
        </div>
    )


}

export default ChatList 