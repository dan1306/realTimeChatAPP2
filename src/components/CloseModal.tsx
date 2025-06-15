"use client"
import { X } from 'lucide-react';
import "../styles/CloseModal.css"
import { useRouter } from 'next/navigation'

const CloseModal = () => {
  const router = useRouter()
    return (
        <span className='X-parent-span' onClick={() => router.back()}>
                <X className='X-icon'/>
        </span>


    )
}
 
export default CloseModal;