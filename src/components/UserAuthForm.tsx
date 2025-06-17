"use client"

// import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {signIn} from 'next-auth/react'
import { Icons } from "./Icons";
// import { useToast } from "@/hooks/use-toast";
import "../styles/UserAuthForm.css"

const UserAuthForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const { toast } = useToast()
    
    useEffect(() => {
                console.log(isLoading)

        if (isLoading) {
            loginWithGoogle_2()
        }
    }, [isLoading])  // pass `value` as a dependency
    

    const loginWithGoogle_1 = () => {
        setIsLoading(true) 
        // console.log(isLoading)
    }

    const loginWithGoogle_2 = async () => {
        try {
            // throw new Error()
            await signIn('google')
        } catch (error) {
            // toast notification
            // toast({
            //     title: "There was a problem.",
            //     description: "There was an error logging in with google.",
            //     variant: "destructive"
            // })

            console.log("There was an error logging in with google.")

        } finally {
            setIsLoading(false)
            console.log(isLoading)

        }
    }

    return (
        <>
            <button
                onClick={loginWithGoogle_1}
                // isLoading={isLoading}
                // size='sm'
                className="google-btn"
            >
                {isLoading ? <span className="loader"></span> : <Icons.google  className="google-icon"/>}
                <span className="google-txt">Google</span>
            </button>
        </>


    )
}
 
export default UserAuthForm;