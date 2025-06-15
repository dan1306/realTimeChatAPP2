import { FC } from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";
import "../styles/sign-in-component.css"
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


//  <div className="flex flex-col space-y-2 text-center ">
//                 <Icons.logo className="mx-auto h-6 w-6" />
//                 <h1 className="text-2xl font-semibold tracking-light">
//                     Welcome Back
//                 </h1>
//                 <p className="text-sm max-w-xs mx-auto">
//                     By continuing, you are setting up a Breadit account and agree to our 
//                     User Agreement and Privacy Policy.
//                 </p>

//                 {/* sign in form */}
//                 <UserAuthForm />

//                 <p className="px-8 text-center text-sm text-zinc-700">
//                     New to ChatMeUp?{' '}
//                     <Link href='/sign-up ' className="hover:text-zine-800 text-sm underline underline-offset-4">
//                         Sign Up
//                     </Link>
//                 </p>
//             </div>