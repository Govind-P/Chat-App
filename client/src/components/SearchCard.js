import React,{useState} from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import Avatar from './Avatar';

const SearchCard = () => {
  return (
    <div className='h-20 rounded-lg bg-white opacity-80 cursor-pointer hover:border hover:border-gray-600'>
        <div className='h-full w-full px-3 flex flex-row justify-between items-center '>
            <Avatar hi={14} wi={14}/>
            <div className='px-6 py-1 flex-1 flex-col justify-center items-center '>
                <p className='text-md text-ellipsis line-clamp-1 text-start text-black font-semibold'>Sarath Raghu</p>
                <p className='text-sm text-ellipsis line-clamp-1 text-start text-black font-semibold'>Hii how are you?How was your job today?can we meet tommorrow? </p> 
            </div>
        </div>
    </div>
  )
}

export default SearchCard;