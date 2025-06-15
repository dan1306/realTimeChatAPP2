import SignIn from "@/components/SignIn";
import { FC } from "react";
import "../../../styles/parrallel-route-sign-in-up.css"
import CloseModal from "@/components/CloseModal";

interface Props {
    
}
 
const Page: FC<Props> = () => {
    return (
    <div className="parrallel-route-sign-in-parent-div">
            <div className="parrallel-route-sign-in-child-div">
                <div className="close-parrellel-route">
                    <CloseModal />
                </div>
                <div className="buffer-div-parrelel-route"></div>
                <SignIn />
            </div>
    </div>
    );
}
 
export default Page;





        // <div className='fixed inset-0 bg-zinc-900/20 z-10'>
        //     <div className="container flex items-center h-full max-w-lg mx-auto">
        //         <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
        //             <div className="absolute top-4 right-4">
        //             </div>

        //             <SignIn />
        //         </div>
        //     </div>
        // </div>