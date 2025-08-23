"use client"
import { X } from 'lucide-react';
import "../styles/CloseModal.css"
import { useRouter } from 'next/navigation'
import { FC } from 'react';


interface CloseModalUserChat {
 userSelected: (user: User | null)=> void
}

interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string; // optional
}

const CloseModalUserChat: FC<CloseModalUserChat>= ({userSelected}) => {
  const router = useRouter()
    return (
        <span className='userSelectedCloseModal' onClick={() => userSelected(null)}>
                <X className='X-icon'/>
        </span>


    )
}
 
export default CloseModalUserChat;