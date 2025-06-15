import { FC } from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";
import "../styles/sign-in-up-component.css"
import { MessagesSquare } from "lucide-react";

 
const SignIn = () => {
    return ( 
        <div className="sign-in-component-parent-div">
            <div className="app-icon-div">
                <MessagesSquare className="messages-square-icon" />
            </div>
            <div className="welcome-message">
                Welcome Back
            </div>
            <div className="continuation-message">
                <p className="continuation-message-p">
                    By continuing, you are setting up a ChatMeUp account and agree to our User Agreement and Privacy Policy.
                </p>
            </div>
            <div className="google-btn-parent-div">
                <UserAuthForm />
            </div>
            <div className="sign-up">
                <p>
                    New to ChatMeUp?
                    <Link className="sign-up-link" href={"/sign-up"}>Sign Up</Link>
                </p>
            </div>
        
           
        </div>
     );
}
 
export default SignIn;

