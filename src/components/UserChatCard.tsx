"use client"
import { FC, useState } from "react"
import "../styles/ChatOptions.css"
import "../styles/UserCard.css"

interface CardProps {
    image?: string,
    email?: string,
    id: string,
    name?: string

}

const UserChatCard: FC<CardProps> = ({image, email, name, id}) => {
    // const  [chatSelected, setChateSelected] = useState<boolean>(false)
    // const [groupChatSelected, setGr]


    return(
        <div className="userChatCard">
            <div className="userChatCardchildDiv">
                <div className="userCardImage">
                    <img className="userCardImageImgField" src={image}></img>                    
                </div>
                <div className="userCardNameEmail">
                    <div>{name}</div>
                    <div>{email}</div>
                </div>
            </div>
        </div>
    )


}

export default UserChatCard;