import React, { useState } from 'react'
import ContactCard from './ContactCard';
import { MdArrowBack } from "react-icons/md";

const Contact = ({allUser}) => {
    const [search, setSearch] = useState('');
    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    const [receiver,setReceiver]=useState([]);
  return (
    <div className='min-h-full px-2 py-1 container mx-auto flex flex-col'>
        <div className='px-2 py-1 h-16 w-full  flex justify-start items-center '>
            <div className='px-2 py-1 w-full'>
                <input type='text' className='py-2 px-3 w-full text-slate-500 bg-gray-800 opacity-80  border-2 border-gray-600 focus:outline-none rounded-lg'
                name="search"
                value={search}
                onChange={handleChange}
                placeholder='Search'/>
            </div>
        </div>
        <div className='flex-1 px-1 w-full'>
            <div className='px-1 py-1 flex flex-col gap-0 w-full '>
            {allUser.length>0 ? 
            (allUser.map((user,index)=>(
                <div key={index} className='px-1 py-1 w-full '>
                    <ContactCard user={user}/>
                </div>
            ))):
            (<div className='pt-4 p-3 flex flex-col jusify-center items-center opacity-70'>
                <MdArrowBack size={30} className='text-slate-400'/>
                <p className='text-center text-lg text-slate-300'>No Contacts Found</p>
                <p className='text-center text-lg text-slate-300'>Add people to chat</p>
            </div>)}
            </div>
        </div>
        
    </div>
  )
}

export default Contact