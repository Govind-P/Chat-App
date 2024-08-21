import React from 'react';
import { IoIosChatboxes } from "react-icons/io";
import logo from '../assets/logo.png'
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { backendApi } from '../common/api';
import { useDispatch } from'react-redux';
import { setUserDetails } from '../store/userSlice';
import { toast } from'react-toastify';

const Header = () => {
  const user=useSelector(state=>state.user.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleLogout=async()=>{
    const res=await fetch(backendApi.logout.url, {
      method:backendApi.logout.method,
      credentials: 'include',
    });
    const data=await res.json();
    if(data.success){
      toast.success(data.message);
      navigate('/login');
      dispatch(setUserDetails(null));
    }
    else{
      toast.error(data.message);
    }
  }

  const handleClick=()=>{
    navigate('/login');
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
          {
            user?
            (<div className='flex jusify-between items-center gap-6'>
                <div>
                  {
                  user?.profileImage ? (<img className='rounded-full h-8 w-8' src={user.profileImage} alt='User Profile' />):
                  (<FaRegUserCircle className='text-3xl cursor-pointer'/>)
                  }
                </div>
                <IoIosLogOut className='cursor-pointer text-3xl' onClick={handleLogout}/>
              </div>
            )
            :
            (<div>
              <button className='px-4 py-1 text-white bg-blue-400 rounded' onClick={handleClick}>Login</button>
            </div>)
          }
        </div>
      </div>
    </header>
  )
}

export default Header;