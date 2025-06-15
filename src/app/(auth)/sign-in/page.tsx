
import { FC } from "react";
import "../../../styles/Sign-in-up.css"
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SignIn from "@/components/SignIn";


const Page = () => {

    return (
        <div className="sign-in-parent-div">
            <div className="sign-in-div">
                <Link href='/' className="link-back">
                        <ChevronLeft className="link-back-icon" size={16} />
                </Link>
                <div className="buffer-div"> </div>
                <div className="sign-in-component">
                    <SignIn />
                </div>

            </div>
            
        </div>

    )


}

export default Page;


            // <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
            //     <Link href='/' className={cn(buttonVariants({ variant: 'ghost' }),
            //     'self-start -mt-20'
            //     )}
            //     >
            //         <ChevronLeft className="mr-2 h-4 w-4" />
            //     </Link>

            //     {/* sign in component  */}
            //     <SignIn />
            // </div>