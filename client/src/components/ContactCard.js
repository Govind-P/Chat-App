import React,{useState} from 'react';
import { FaRegUserCircle } from "react-icons/fa";

const ContactCard = () => {
    const [unreadMessages, setUnreadMessages] = useState(5);
  return (
    <div className='h-20 rounded-lg bg-black opacity-45'>
        <div className='h-full w-full px-3 flex flex-row justify-between items-center '>
            <div className='h-14 w-14 flex justify-center items-center bg-blue-400 rounded-full'>
                <FaRegUserCircle className='text-3xl text-white'/>
            </div>
            <div className='px-6 py-1 w-3/5 flex-1 flex-col jusify-center items-center '>
                <p className='text-md text-ellipsis line-clamp-1 text-slate-200 font-semibold'>Sarath Raghu</p>
                <p className='text-sm text-ellipsis line-clamp-1 text-slate-300 font-semibold'>Hii how are you?How was your job today?can we meet tommorrow? </p>
                
            </div>
            <div className='flex-col jusify-center items-center'>
                <p className='text-white text-sm pb-3'>7:20 pm</p>
                <div className='h-full w-full  flex justify-center items-center'>
                    <div className='px-1 min-w-6 h-full rounded-full text-sm text-center bg-blue-600'>
                    {unreadMessages}
                    </div>
               
                </div>
            </div>

        </div>
    </div>
  )
}

export default ContactCard;