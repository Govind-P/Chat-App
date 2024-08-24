import React,{useState} from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import Avatar from './Avatar';
import { replace, useNavigate } from 'react-router-dom';

const ContactCard = () => {
    const [unreadMessages, setUnreadMessages] = useState(5);
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate('/dashboard/66c4a4e6e55f6258f0e1a574',{replace: true});
    }
  return (
    <div className='h-20 w-full rounded-lg bg-black opacity-45 cursor-pointer' onClick={handleClick}>
        <div className='h-full w-full px-3 flex flex-row justify-between items-center '>
            <Avatar hi={14} wi={14}/>
            <div className='px-6 py-1 w-3/5 flex-1 flex-col justify-center items-center '>
                <p className='text-md text-ellipsis line-clamp-1 text-slate-200 font-semibold'>Sarath Raghu</p>
                <p className='text-sm text-ellipsis line-clamp-1 text-slate-300 font-semibold'>Hii how are you?How was your job today?can we meet tommorrow? </p>
                
            </div>
            <div className='flex-col justify-center items-center'>
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