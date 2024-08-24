import React,{useState} from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { backendApi } from '../common/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../store/userSlice';
import { setUserDetails } from '../store/userSlice';
import { useSelector } from 'react-redux';
import { RiMessage2Fill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import AddPerson from './AddPerson';
import UserUpdate from './UserUpdate';
import { IoMdCloseCircle } from "react-icons/io";
import Avatar from './Avatar';

const  Sidebar= () => {
    const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user.user);
  const [messageSelected, setMessageSelected] = useState(true);
  const [addUserSelected, setAddUserSelected] = useState(false);
  const [accountSelected, setAccountSelected] = useState(false);

  const addPerson=()=>{
    setMessageSelected(false);
    setAddUserSelected(true);
  }
  const userAccount=()=>{
    setMessageSelected(false);
    setAccountSelected(true);
  }

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
      dispatch(setToken(''));
      localStorage.removeItem('token');
    }
    else{
      toast.error(data.message);
    }
  }
  return (
    <div className='h-screen min-w-14 bg-gray-700'>
        <div className='py-2 p-1 flex w-full min-h-screen flex-col justify-between items-center gap-3'>
            <div className='px-1 h-full w-full flex justify-between items-center py-3 gap-0 rounded-full cursor-pointer' >
                {
                    messageSelected && (
                        <div className='h-6 w-1 rounded-full bg-blue-500'/>
                    )
                }
                <RiMessage2Fill size={25} className='text-white '/>
            </div>
            <div className='px-1 h-full w-full flex justify-between items-center py-3 gap-0 rounded-full cursor-pointer' onClick={addPerson}>
                {
                    addUserSelected && (
                        <div className='h-6 w-1 rounded-full bg-blue-500'/>
                    )
                }
                <IoMdPersonAdd size={25} className='text-white'/>
            </div>
            <div className='flex-1'>
            </div>
            <div className=' h-full w-full flex justify-between items-center  py-2 cursor-pointer' onClick={userAccount}>
                {
                    accountSelected && (
                        <div className='h-6 w-1 rounded-full bg-blue-500'/>
                    )
                }
                {
                    user && (<div>
                        <Avatar imageUrl={user.profileImage} userId={user?._id} hi={10} wi={10}></Avatar>    
                    </div>)
                }   
            </div>
            <div className='h-full w-full flex justify-center items-center py-2'>
                <IoIosLogOut className='text-2xl text-white cursor-pointer' onClick={handleLogout}/>
            </div>
        </div>
        <div>
            {
                addUserSelected && (
                    <AddPerson onClose={()=>{
                        setMessageSelected(true);
                        setAddUserSelected(false);
                    }
                    }/>

                )
            }
        </div>
        <div>
            {
                accountSelected && (
                    <UserUpdate onClose={()=>{
                        setMessageSelected(true);
                        setAccountSelected(false);
                    }
                    }
                    data={user}/>
                )
            }
        </div>
    </div>
  )
}

export default Sidebar;