import React from 'react';
import { LuMoreVertical } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";

const Message = () => {
  return (
    <div className='h-full w-full'>
        <div className='h-full w-full flex flex-col justify-between items-center gap-1'>
            <div className='px-4 py-2 w-full h-20 bg-gray-700 rounded-lg'>
                <div className='w-full h-full flex justify-between items-center'>
                    <div className='h-14 w-14 rounded-full bg-blue-400 flex justify-center items-center'>
                        <FaRegUserCircle className='text-3xl text-white'/>
                    </div>
                    <div className='h-full px-6 py-1 pb-2 flex-1 '>
                        <p className='text-lg text-ellipsis line-clamp-1 text-slate-200 font-semibold'>Sarath Raghu</p>
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
            <div className='w-full h-20 bg-gray-700 rounded-lg'>
                d
            </div>

        </div>
    </div>
  )
}

export default Message;