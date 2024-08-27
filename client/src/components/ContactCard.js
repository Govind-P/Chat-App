import React,{useState} from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import Avatar from './Avatar';
import {  useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaImage } from 'react-icons/fa6';
import { FaVideo } from 'react-icons/fa6';
import moment from 'moment';

const ContactCard = ({user}) => {
    const [unreadMessages, setUnreadMessages] = useState(5);
    const navigate=useNavigate();
    const {pathname} = useLocation();
    const handleClick=()=>{
        if(pathname!=='/dashboard'){
            navigate(`/dashboard/${user.userDetails._id}`,{replace: true});
        }
        else{
            navigate(`/dashboard/${user.userDetails._id}`);
        } 
    }
  return (
    <div className='h-20 w-full rounded-lg bg-black opacity-45 cursor-pointer' onClick={handleClick}>
            <div className='h-full w-full px-3 flex flex-row justify-between items-center '>     
            <Avatar hi={14} wi={14} imageUrl={user?.userDetails?.profileImage}  userId={user?.userDetails?._id}/>
                <div className='px-6 py-1 w-3/5 flex-1 flex-col justify-center items-center '>
                    <p className='text-md text-ellipsis line-clamp-1 text-slate-200 font-semibold'>{user?.userDetails?.name}</p>
                        <div className='flex items-center gap-1'>
                            {
                                user?.lastMsg?.imageUrl && (
                                <div className=' text-slate-300 flex items-center gap-1'>
                                    <span><FaImage className='text-slate-300'/></span>
                                           {!user?.lastMsg?.text && <span>Image</span>  } 
                                    </div>
                                )
                            }
                            {
                                user?.lastMsg?.videoUrl && (
                                <div className='text-slate-300 flex items-center gap-1'>
                                    <span><FaVideo className='text-slate-300'/></span>
                                        {!user?.lastMsg?.text && <span>Video</span>}
                                </div>
                                )
                            }
                        </div>
                    <p className='text-sm text-ellipsis line-clamp-1 text-slate-300 font-semibold'>{user?.lastMsg?.text}</p>
                    
                </div>
                <div className='flex-col justify-center items-center'>
                    <div className='h-full w-full  flex justify-center items-center pb-3'>
                        {
                            user?.unseenMsg>0 &&
                            (
                                <div className='px-1 min-w-6 h-full rounded-full text-sm text-center bg-blue-600'>
                                    {user?.unseenMsg}
                                </div>

                            )
                        }
                        
                    </div>
                    <p className='text-white text-sm'>{moment(user?.lastMsg?.updatedAt).format("hh:mm A")}</p>
                    
                </div>    
        </div>
    </div>
  )
}

export default ContactCard;