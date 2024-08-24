import React,{useState} from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import Avatar from './Avatar';
import { IoMdCamera } from 'react-icons/io';
import ImageToBase64 from '../helper/ImageToBase64';

const UserUpdate = ({onClose,data}) => {
  const [user,setUser]=useState(data);
  const handleImage=async(e)=>{
    const file = e.target.files[0];
    const image=await ImageToBase64(file);
    console.log(image);
    setUser((preve)=>{
      return {...preve,profileImage:image}
    })
    console.log(user);
  }
  return (
    <div className='fixed  h-screen w-full top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 z-10'>
        <div className='h-full w-full flex flex-col items-center justify-center '>
            <div className='p-4 md:w-[40%] h-fit w-full flex flex-col items-center justify-center opacity-95 bg-white rounded-lg'>
              <div className='relative flex justify-end items-end  '>
                {
                    user && (<div>
                        <Avatar imageUrl={user.profileImage} userId={user?._id} hi={32} wi={32} show={true}></Avatar>
                    </div>)
                }
                <div className='absolute bottom-0 right-0 h-8 w-8'>
                <label htmlFor='uploadImageInput'>
                  <div className='cursor-pointer h-full w-full rounded-full bg-black p-1 opacity-50'>
                    <IoMdCamera className='text-2xl text-white'/>
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
              </div>
              <div className='p-2 pt-5 flex justify-between items-center gap-8'>
                <button className='bg-black opacity-70 text-white py-2 px-4 rounded-lg hover:scale-125 transition-all hover:opacity-80' onClick={onClose}>Cancel</button>
                <button className='bg-black opacity-70 text-white py-2 px-4 rounded-lg hover:scale-125 transition-all hover:opacity-80'>Update</button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default UserUpdate;