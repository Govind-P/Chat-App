import React from 'react';
import { IoIosChatboxes } from "react-icons/io";
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from'react-redux';
import { useLocation } from'react-router-dom';

const Header = () => {
  const navigate=useNavigate();
  const location=useLocation();

  const handleClick=()=>{
    if(location.pathname !== '/login'){
      navigate('/login');
    }
  }

  return (
    <header className='h-16 shadow-md bg-slate-500'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
        <Link to='/'>
          <div className='flex flex-row gap-1 items-center cursor-pointer'> 
            <IoIosChatboxes className='text-4xl text-blue-700' />
            <h1 className='text-lg text-black'>ChatApp</h1>
           </div>
        </Link>
        <div>
          <button className='px-4 py-1 text-white bg-blue-400 rounded' onClick={handleClick}>Login</button>
        </div>
      </div>
    </header>
  )
}

export default Header;