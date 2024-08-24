import React from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import {useSelector} from "react-redux";

const Avatar = ({hi,wi,imageUrl,userId,show}) => {
  const online=useSelector((state)=>state.user.onlineUser);

  const isUserOnline = online.includes(userId);
  return (
    <div className={`h-${hi} w-${wi} flex justify-center items-center bg-blue-400 rounded-full relative`}>
    {
      imageUrl ?(
        <img className={`h-${hi} w-${wi} rounded-full border-none`} src={imageUrl} alt={userId} />
      ):
      (<FaRegUserCircle className='text-3xl text-white'/>)

    }
     {
      isUserOnline && !show && (
        <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-700 rounded-full'></div>
      )
    }
    </div>
   
    
  )
}

export default Avatar