import React, { useEffect,useState } from 'react';
import { LuMoreVertical } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";
import Avatar from './Avatar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { backendApi } from '../common/api';

const Message = () => {
    const socketConnection=useSelector((state)=>state.user.socketConnection)
    const [receiver, setReceiver] = useState(null);
    const {id}=useParams();
    const [message, setMessage] = useState('');
    const handleMessage = (e) => {
        setMessage(e.target.value);
    }
    const fetchReceiver=async()=>{
        const res=await fetch(backendApi.users.url+`/${id}`,{
            method: backendApi.users.method,
            credentials: 'include'
        })
        const data=await res.json();
        if(data.success){
            setReceiver(data.data);
        }
        else{
            console.log(data.message);
        }
    };

    useEffect(()=>{
        fetchReceiver();
    },[]);

  return (
    <div className='h-full w-full'>
        <div className='h-full w-full flex flex-col justify-between items-center gap-1'>
            <div className='px-4 py-2 w-full h-20 bg-gray-700 rounded-lg'>
                <div className='w-full h-full flex justify-between items-center'>
                    <Avatar hi={14} wi={14} imageUrl={receiver?.profileImage} userId={receiver?._id}/>
                    <div className='h-full px-6 py-1 pb-2 flex-1 '>
                        <p className='text-lg text-ellipsis line-clamp-1 text-slate-200 font-semibold'>{receiver?.name}</p>
                        <p className='text-sm text-ellipsis line-clamp-1 text-slate-300 font-semibold'>Last seen 13:00 </p>
                    </div>
                    <div >
                        <LuMoreVertical className='text-white text-2xl cursor-pointer'/>
                    </div>
                
                </div>
                
            </div>
            <div className='w-full flex-1 bg-gray-800 overflow-hidden overflow-y-scroll scrollbar-none rounded-lg '>
                Hii

            </div>
            <div className='w-full min-h-18 max-h-30  bg-transparent rounded-lg py-3 '>
                <div className='px-2 py-2 h-full w-full flex justify-between items-center bg-black opacity-40 rounded-lg gap-2'>
                    <div className=' '>
                        <MdOutlineAttachFile className='text-slate-100 text-3xl cursor-pointer'/>
                    </div>
                    <div className='flex-1 h-full py-1 px-2  '>
                        <textarea className=' w-full resize-none text-mg px-2 py-1 overflow-hidden overflow-y-scroll scrollbar-none rounded-lg bg-inherit border-none focus:outline-none text-slate-200 font-semibold' 
                        type='text' 
                        rows="1"
                        name="message"
                        value={message}
                        onChange={handleMessage}
                        placeholder='Type a message...'/>
                    </div>
                    <div className=''>
                        <IoSend className=' text-slate-100 text-3xl cursor-pointer'/>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Message;