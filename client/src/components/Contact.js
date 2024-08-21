import React from 'react'
import ContactCard from './ContactCard';

const Contact = () => {
    const [search, setSearch] = React.useState('');
    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    const card=new Array(10).fill(null);
  return (
    <div className='min-h-full px-2 py-1 container mx-auto flex flex-col'>
        <div className='px-2 py-1 h-16 w-full  flex justify-center items-center '>
            <div className='px-2 py-1 w-full'>
                <input type='text' className='py-2 px-3 w-full text-slate-500 bg-gray-800 opacity-80  border-2 border-gray-600 focus:border-gray-600 rounded-lg'
                name="search"
                value={search}
                onChange={handleChange}
                placeholder='Search'/>
            </div>
        </div>
        <div className='flex-1 px-2 w-full'>
            <div className='px-2 py-1 flex flex-col gap-0 w-full'>
            {card.map((data,index)=>(
                <div className='px-2 py-1 w-full '>
                    <ContactCard key={index}/>
                </div>
            ))}
            </div>
        </div>
        
    </div>
  )
}

export default Contact