import React,{useState} from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import Avatar from './Avatar';
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const SearchCard = ({data,onClose}) => {
  const navigate=useNavigate();
  const{pathname}=useLocation(); 
  const handleSearch=()=>{
    onClose();
    if(pathname!=='/dashboard'){
      navigate(`/dashboard/${data._id}`,{replace: true});
    }
    else{
      navigate(`/dashboard/${data._id}`);
    } 
  }
  return (
    <div className='h-20 rounded-lg bg-white opacity-80 cursor-pointer hover:border hover:border-gray-600' onClick={handleSearch}>
        <div className='h-full w-full px-3 flex flex-row justify-between items-center '>
            <Avatar hi={14} wi={14} userId={data?._id} imageUrl={data?.profileImage}/>
            <div className='px-6 py-1 flex-1 flex-col justify-center items-center '>
                <p className='text-md text-ellipsis line-clamp-1 text-start text-black font-semibold'>{data.name}</p>
                <p className='text-sm text-ellipsis line-clamp-1 text-start text-black font-semibold'>{data.email}</p> 
            </div>
        </div>
    </div>
  )
}

export default SearchCard;