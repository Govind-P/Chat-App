import React from 'react'
import Message from '../components/Message';
import Contact from '../components/Contact';

const Dashboard = () => {
  return (
    <div className='p-2 mx-auto'>
      <div className='p-2  h-[calc(100vh-120px)] flex gap-3 jusify-between items-center'>
        <div className='p-1 md:w-1/3 w-full h-full bg-gray-900 rounded-lg overflow-hidden overflow-y-scroll scrollbar-none'>
          <Contact />
        </div>
        <div className='hidden md:flex w-2/3 h-full rounded-lg overflow-hidden overflow-y-scroll scrollbar-none'>
          <Message/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;