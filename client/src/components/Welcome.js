import React from 'react'
import { IoIosChatboxes } from 'react-icons/io';

const Welcome = () => {
  return (
    <div className=' h-screen w-full flex flex-col justify-center items-center bg-gary-700 opacity-40'>
      <div className='flex flex-row gap-1 items-center cursor-pointer animate-pulse'> 
        <IoIosChatboxes className='text-8xl text-blue-700' />
        <h1 className='text-2xl text-black'>ChatApp</h1>
      </div>
      <div className='text-center text-md animate-pulse'>Welcome to a world of connections...</div>
    </div>
  )
}

export default Welcome;