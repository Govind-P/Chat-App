import React,{useEffect, useState} from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import {backendApi} from '../common/api.js';
import { useNavigate } from'react-router-dom';
import {useContext} from'react';
import Context from '../context/index.js';
import { toast } from'react-toastify';
import { useSelector } from'react-redux';

const Login = () => {
  const [data,setData]=useState({email:'',password:''});
  const navigate=useNavigate();
  const user=useSelector(state=>state.user.user);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setData((preve)=>{
      return {...preve,[name]:value}
    })
  }

  const {fetchUserData} = useContext(Context);
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const res=await fetch(backendApi.login.url, {
      method: backendApi.login.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const user=await res.json();
    if(user.success){
      navigate('/dashboard');
      toast.success('Welcome '+user.user.name);
      fetchUserData();
    }
    else{
      toast.error(user.message);
    } 
  }

  useEffect(()=>{
    if(user){
      navigate('/dashboard');
    }
  },[user]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className='p-2 container mx-auto'>
      <div className=' flex justify-center items-center min-h-[calc(100vh-120px)]'>
        <div className='h-full w-full py-4 max-w-md bg-blue-800 rounded-lg opacity-70 '>
          <div className='w-full h-full px-5 py-2 flex justify-center '>
            <div className=' w-20 h-20 rounded-full flex jusify-center items-center '>
              <FaRegUserCircle className='text-6xl text-white mx-auto' />
            </div>
          </div>
          <p className='p-2 text-white text-center text-2xl font-semibold'>
                Login Here
          </p>
          <form className='flex-col justify-start gap-3 p-6' onSubmit={handleSubmit}>
            <div className='py-2'>
              <label className='text-white'>Email:</label>
              <input type='email' className='p-2 w-full border-2 border-white rounded-lg'
              placeholder='Enter Email'
              value={data.email}
              name="email"
              onChange={handleChange} 
              required/>
            </div>
            <div className='py-2'>
              <label className='text-white'>Password:</label>
              <input type='password' className='p-2 w-full border-2 border-white rounded-lg'
              placeholder="Enter Password"
              value={data.password}
              name="password" 
              onChange={handleChange}
              required/>
            </div>
            <div className='py-6 px-4'>
              <button className='w-full p-2 bg-slate-300 rounded-lg hover:bg-gray-500 hover:text-white hover:scale-110 transition-all' type='submit'>Login</button>
            </div> 
          </form>
          <div>
            <p className='text-white text-center text-sm pb-3'>Don't have an account? <span className='cursor-pointer font-semibold hover:text-red-800' onClick={()=>navigate('/signup')}>Register</span></p>
            <p className='text-white text-center text-sm pb-3'>Forgot Password? <span className='cursor-pointer font-semibold hover:text-red-800' onClick={()=>navigate('/forgot-password')}>Reset Password</span></p>  
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login