import React,{useState,useEffect} from 'react';
import { toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { backendApi } from '../common/api';
import { FaRegUserCircle } from "react-icons/fa";
import ImageToBase64 from '../helper/ImageToBase64.js';
import {FaCloudUploadAlt} from "react-icons/fa";
import { useSelector } from 'react-redux';


const Signup = () => {
  const user=useSelector(state=>state.user.user);
  const [data,setData]=useState({
    email:'',
    password:'',
    confirmPassword:'',
    phone:'',
    name:'',
    profileImage:''
  });
  const navigate=useNavigate();

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setData((preve)=>{
      return {...preve,[name]:value}
    })
  }

  const handleImage=async(e)=>{
    const file=e.target.files[0];
    const image=await ImageToBase64(file)
    setData((preve)=>{
      return {...preve,profileImage:image}
    })
    console.log(data);
  }

  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(data.password!==data.confirmPassword){
      alert('Passwords do not match');
    }
    else{
      const res=await fetch(backendApi.register.url, {
        method: backendApi.register.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const user=await res.json();
      if(user.success){
        toast.success(user.message);
        navigate('/login');
      }
      else{
        toast.error(user.message);
      }
    }  
  }

  useEffect(()=>{
    if(user){
      navigate('/dashboard');
    }
  },[user]);


  return (
    <div className='p-5 container mx-auto'>
      <div className=' flex justify-center items-center min-h-[calc(100vh-120px)]'>
        <div className='h-full w-full max-w-md py-4 bg-blue-800 rounded-lg opacity-70 '>
          <div className='w-full h-full px-5 py-2 flex justify-center '>
            <div className=' w-20 h-20 rounded-full flex jusify-center items-center '>
              <FaRegUserCircle className='text-6xl text-white mx-auto' />
            </div>
          </div>
          <p className='p-2 text-white text-center text-2xl font-semibold'>
                SignUp Here
          </p>
          <form className='flex-col justify-start gap-3 p-6' onSubmit={handleSubmit}>
            <div className='py-2'>
              <label className='text-white'>Name:</label>
              <input type='text' className='p-2 w-full border-2 border-white rounded-lg'
              placeholder='Enter Name'
              value={data.name}
              name="name"
              onChange={handleChange} 
              required/>
            </div>
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
              <label className='text-white'>Email:</label>
              <input type='tel' className='p-2 w-full border-2 border-white rounded-lg'
              placeholder='Enter Phone No.'
              value={data.phone}
              name="phone"
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
            <div className='py-2 pb-5'>
              <label className='text-white'>Confirm Password:</label>
              <input type='password' className='p-2 w-full border-2 border-white rounded-lg'
              placeholder="Confirm Password"
              value={data.confirmPassword}
              name="confirmPassword" 
              onChange={handleChange}
              required/>
            </div>
            <div className='mb-3 px-2 py-2'>
              <label className='block text-sm font-medium text-white pb-1'>Profile Image :</label>
                  <label htmlFor='uploadImageInput'>
                        <div className='block  w-full px-3 py-2 text-sm border border-dashed border-t-2 border-b-2 border-white rounded-md cursor-pointer'>
                            <span className='flex flex-col justify-center items-center p-2'>
                            <FaCloudUploadAlt className='text-2xl' />
                            <p>Upload the images here</p>
                            </span>
                            <input className='hidden' 
                            id='uploadImageInput' 
                            type='file' 
                            name='profileImage'
                            accept=".jpg, .jpeg, .png, .gif, .webp"
                            onChange={handleImage}
                            />    
                        </div> 
                    </label> 
                </div>
            <div className='py-6 px-4'>
              <button className='w-full p-2 bg-slate-300 rounded-lg hover:bg-gray-500 hover:text-white hover:scale-110 transition-all' type='submit'>Signup</button>
            </div> 
          </form>
          <div>
            <p className='text-white text-center text-sm pb-2'>
              Already have an account? <span className='cursor-pointer font-semibold hover:text-red-800' onClick={()=>navigate('/login')}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;