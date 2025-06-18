"use client"

// import { useState } from "react";
import {FC, useState} from "react"
import { User } from 'next-auth'
import "../styles/Navbar.css"
import { MessagesSquare, Search } from 'lucide-react';
// import SearchBar from './SearchBar'
import {Button} from 'react-native';
import Link from "next/link"
import { getAuthSession } from "@/app/lib/auth";
import { signOut } from "next-auth/react";


interface UserAccountNavProps {
    user: Pick<User, 'name' | 'image' | 'email'>
}

const UserNav: FC<UserAccountNavProps> =  ({user}) => {


    // const [dropUserOption, SetdropUserOption] = useState<boolean>(false)
    // const [signedIn, SetSignedIn] = useState<boolean>(true)
    const [dropDown, SetDropDown] = useState<boolean>(false)



    return (
        <div className="signed-in-dropdown" onClick={() => SetDropDown(!dropDown)}> 
            <img  src={user.image ? user.image : 'https://media.geeksforgeeks.org/wp-content/uploads/geeksforgeeks-25.png'}
            alt="'https://media.geeksforgeeks.org/wp-content/uploads/geeksforgeeks-25.png" className="profile-img"></img>
            {/* <div className="drop-down">  Edit Profile</div>
            <div className="drop-down"> Notifications</div> */}
            {
                dropDown == false ?
                <>
                </> :
                <div className="drop-down">
                    <div className="user_name_field">  
                        <p >{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                    <hr/>
                    <div>Create A Chat</div>
                    <hr/>
                    <div>Notifications
                        <span className="num-of-notis">9+</span>
                    </div>
                    <hr/>
                    <div>Settings</div>
                    <hr/>
                    <div onClick={(e) =>{
                        e.preventDefault()
                        signOut({
                            callbackUrl: `${window.location.origin}/sign-in`
                        })

                    }}>Log Out</div> 
                </div>
            }

    
        </div>
    );
}
 
export default UserNav;