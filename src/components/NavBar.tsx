"use client"

// import { useState } from "react";
import {useState} from "react"
import "../styles/Navbar.css"
import { MessagesSquare, Search } from 'lucide-react';
// import SearchBar from './SearchBar'
import {Button} from 'react-native';
 
const NavBar = () => {

    const [dropUserOption, SetdropUserOption] = useState<boolean>(false)
    const [signedIn, SetSignedIn] = useState<boolean>(true)
    const [dropDown, SetDropDown] = useState<boolean>(false)



    return (
        <div className="navbar-styling">
            <div className="nav-content">
                <div className="navbar-icon">
                    <MessagesSquare className="messages-square-icon" />
                    {/* <p className="nav-titile">
                        ChatMeUp
                    </p> */}
                </div>
                <div className="navbar-search-field">
                    <div className="search-icon-and-bar">
                        <div className="search-icon">
                            <Search className="luicde-search-icon" />
                        </div>
                        <div className="search-field"> 
                            <input
                                className="search-input"
                                placeholder="Search Chats..."
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="navbar-signIn-signOut">
                    {
                        signedIn == false ?
                        <button className="sign-in-button">Sign-In</button>
                        :
                        <div className="signed-in-dropdown" onClick={() => SetDropDown(!dropDown)}> 
                                <img src="https://media.geeksforgeeks.org/wp-content/uploads/geeksforgeeks-25.png"
                                alt="Sample Image" className="profile-img"></img>
                                {/* <div className="drop-down">  Edit Profile</div>
                                <div className="drop-down"> Notifications</div> */}
                                {
                                    dropDown == false ?
                                    <>
                                    </> :
                                    <div className="drop-down">
                                        <div className="user_name_field">  
                                            <p >dummy</p>
                                            <p>dummy@gmail.com</p>
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
                                        <div>Log Out</div> 
                                    </div>
                                }

                        
                        </div>
                    }
                </div>
            </div>




       {/* <div className="navbar-elements">
                <div className="nav-logo">
                    <MessagesSquare className="nav-messages-square" />
                    <p className="nav-titile">
                        ChatMeUp
                    </p>
                </div>
                <div className="nav-searchbar">
                    <SearchBar />
                </div>
                <div className="nav-user-dropdown-and-settings">
                    <div className="nav-user-avatar" onClick={()=> SetdropUserOption(!dropUserOption)}>

                    </div>
                    <div className={`nav-user-dropdown ${dropUserOption ? '' : 'hide-user-dropdown'}`}>
                        <div className="nav-user-name-and-email">
                            <p className="username">
                                username
                            </p>
                            <p className="email">
                                email
                            </p>
                        </div>
                        <hr className="line" />
                        <div>
                            <p className="nav-feed">
                                Feed
                            </p>
                            <p className="nav-create-a-chat">
                                Create A Chat
                            </p>
                            <p className="nav-settings">
                                Settings
                            </p>
                        </div>
                        <hr className="line" />
                        <div className="signIn-signOut">
                            SignIn / Sign Out
                        </div>
                    </div>
                </div>
            </div>
 */}



        </div>
     );
}
 
export default NavBar;