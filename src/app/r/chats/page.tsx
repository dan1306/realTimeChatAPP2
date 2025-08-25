import IndividualChat from "@/components/IndividualChat";
import "../../../styles/chats.css"
import ChatOptions from "@/components/ChatOptions";
import { getAuthSession } from "@/lib/auth";



const Chat = async () => {

    
    const session = await getAuthSession();
    let email : string;
    
    if(session?.user.email != null && session?.user.email != undefined){
        email = session?.user.email;
    } else {
        email = "...";
    }

    return (
        // <div className="chat-container">
        //     <IndividualChat />
        // </div>
        <div className="chat-container"> 
            <ChatOptions email={email}/>
        </div>

    )


}

export default Chat;