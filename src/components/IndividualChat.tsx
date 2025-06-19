"use client"

import { useState } from "react";


const IndividualChat = () => {

    const [user, setUser] = useState<String | null>(null)


    return (
        <div className="chat-container">

            {
                user ?
                    <div >

                    </div>
                :

                <></>
            }
        </div>

    )


}

export default IndividualChat;