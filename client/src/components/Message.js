import React, { useEffect,useState } from 'react';
import { LuMoreVertical } from "react-icons/lu";
import { FaVideo } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";
import Avatar from './Avatar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import uploadFile from '../helper/uploadFile.js';
import Loading from '../components/Loading.js';
import { IoMdCloseCircle } from "react-icons/io";
import moment from "moment";
import { useRef } from 'react';

const Message = () => {
    const socketConnection=useSelector((state)=>state.user.socketConnection)
    const [openFileSection,setOpenFileSection] = useState(false);
    const user=useSelector(state=>state?.user?.user);
    const [loading,setLoading] = useState(false);
    const [receiver, setReceiver] = useState({
        name:"",
        email:"",
        profileImage:"",
        online:false,
        _id:""
    });
    const [message,setMessage] = useState({
        text:"",
        videoUrl:"",
        imageUrl:""

    });
    const [allMessages,setAllMessages] = useState([]);
    const {id}=useParams();
    const currentMessage = useRef(null)

    useEffect(()=>{
        if(currentMessage.current){
            currentMessage.current.scrollIntoView({behavior : 'smooth', block : 'end'})
        }
    },[allMessages])

    const handleMessage = (e) => {
        e.preventDefault();
        setMessage((prev)=>{
            return {...prev,text:e.target.value}
        });
    }

    const handleImageUpload = async(e) => {
        const file=e.target.files[0];
        setOpenFileSection(false)
        setLoading(true);
        const imageUrl=await uploadFile(file)
        setMessage((prev)=>{
            return {...prev,imageUrl:imageUrl.url}
        });
        setLoading(false);
    }
    const handleVideoUpload =async (e) => {
        const file=e.target.files[0];
        setOpenFileSection(false)
        setLoading(true);
        const videoUrl=await uploadFile(file)
        setMessage((prev)=>{
            return {...prev,videoUrl:videoUrl.url}
        });
        setLoading(false);
        
    }

    const handleClearUploadImage = () => {
        setMessage((prev)=>{
            return {...prev,imageUrl:""}
        });
    }
    const handleClearUploadVideo = () => {
        setMessage((prev)=>{
            return {...prev,videoUrl:""}
        });
    }

    const handleMessageSend=(e) => {
        e.preventDefault();
        if(message.text.trim() || message.imageUrl || message.videoUrl){
            if(socketConnection){
                socketConnection.emit('send-message',{
                    sender:user._id,
                    receiver:id,
                    text:message.text,
                    videoUrl:message.videoUrl,
                    imageUrl:message.imageUrl,  
                }
            );
            setMessage({text:"",videoUrl:"", imageUrl:""})
            }
        }
    }



    useEffect(()=>{
        if(socketConnection){
            socketConnection.emit('message-page',id);
            socketConnection.on('receiverDetails',(data)=>{
                setReceiver(data);
            });
            socketConnection.emit('seen',id)
            socketConnection.on('messages',(data)=>{
                setAllMessages(data);
            });
        }
    },[socketConnection,id,user])



  return (
    <div className='h-full w-full'>
        <div className='h-full w-full flex flex-col justify-between items-center gap-1'>
            <div className='px-4 py-2 w-full h-20 bg-gray-700 rounded-lg'>
                <div className='w-full h-full flex justify-between items-center'>
                    <Avatar hi={14} wi={14} imageUrl={receiver?.profileImage} userId={receiver?._id}/>
                    <div className='h-full px-6 py-1 pb-2 flex-1 '>
                        <p className='text-lg text-ellipsis line-clamp-1 text-slate-200 font-semibold'>{receiver?.name}</p>
                        <div className='transition-all'>
                        {
                            receiver?.online==true ?(<p className='text-sm text-ellipsis line-clamp-1 text-slate-300 font-semibold '>Online</p>) : 
                            (<p className='text-sm text-ellipsis line-clamp-1 text-slate-300 font-semibold '>Last 13:00 </p>)
                        } 
                        </div>  
                    </div>
                    <div >
                        <LuMoreVertical className='text-white text-2xl cursor-pointer'/>
                    </div>
                
                </div>
                
            </div>
            <div className='w-full flex-1 bg-gray-800 overflow-hidden overflow-y-scroll scrollbar-none rounded-lg relative '>
                <div ref={currentMessage}>
                {
                    allMessages.map((message,index)=>(
                        <div>
                        {
                            message?.sender===user._id ?(
                                <div className='flex flex-col justify-center items-end  gap-3 p-3'>
                                    <div className='flex flex-col justify-center rounded-lg p-1 bg-blue-900 opacity-80 max-w-[280px] md:max-w-sm lg:max-w-md w-fit  h-full'>
                                        {
                                            message.imageUrl && (
                                                <img src={message.imageUrl} className='bg-blue-800 opacity-70 rounded-lg w-fit h-fit object-scale-down cursor-pointer'/>
                                            )
                                        }
                                        {
                                            message.videoUrl && (
                                                <video src={message.videoUrl} className='w-fit h-fit rounded-lg object-scale-down' controls/>
                                            )
                                        }
                                        <p className='break-all text-slate-300 p-2 pr-8'>{message.text}</p>
                                        <p className='break-all text-slate-400 text-xs text-end'>{moment(message.updatedAt).format('hh:mm A')}</p>
                                    </div>   
                                </div>
                            ):
                            (   
                                <div className='flex flex-col justify-center items-start  gap-3 p-3'>
                                    <div className='flex flex-col justify-center rounded-md p-1 bg-gray-900 opacity-70 max-w-[280px] md:max-w-sm lg:max-w-md w-fit  h-full'>
                                        {
                                            message.imageUrl && (
                                                <img src={message.imageUrl} className='bg-gray-800 opacity-60 rounded-lg w-fit h-fit object-scale-down'/>
                                            )
                                        }
                                        {
                                            message.videoUrl && (
                                                <video src={message.videoUrl} className='w-fit h-fit rounded-lg object-scale-down' controls/>
                                            )
                                        }
                                        <p className='break-all text-slate-300 font-semibold p-1 pr-8'>{message.text}</p>
                                        <p className='break-all text-slate-400 text-xs text-end whitespace-normal'>{moment(message.updatedAt).format('hh:mm A')}</p>
                                    </div>   
                                </div>

                            )
                        }
                        </div>
                        
                    ))
                }
                </div>

                {/* for image */}
                {
                    message?.imageUrl && (
                    <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-40 flex justify-center items-center rounded overflow-hidden'>
                        <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer text-slate-100 hover:text-slate-400' onClick={handleClearUploadImage}>
                            < IoMdCloseCircle size={30}/>
                        </div>
                        <div className=' p-3'>
                            <img
                              src={message.imageUrl}
                              alt='uploadImage'
                              className='aspect-square w-full h-full max-w-sm m-2 object-scale-down '
                            />
                        </div>
                      </div>
                    )
                }

                {/* for video */}
                {
                    message?.videoUrl && (
                    <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-40 flex justify-center items-center rounded overflow-hidden'>
                        <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer text-slate-100 hover:text-slate-400' onClick={handleClearUploadVideo}>
                            < IoMdCloseCircle size={30}/>
                        </div>
                        <div className=' p-3'>
                            <video
                              src={message.videoUrl}
                              className='aspect-square w-full h-full max-w-sm m-2 object-scale-down '
                              controls
                              muted
                              autoPlay
                            />
                        </div>
                      </div>
                    )
                }

                {
                    loading && <div className='w-full sticky bottom-0 min-h-full max-h-full flex  justify-center items-center'><Loading /></div>
                }
                

            </div>
            <div className='w-full min-h-18 max-h-30  bg-transparent rounded-lg py-3 '>
                <div className='px-2 py-2 h-full w-full flex justify-between items-center bg-black opacity-40 rounded-lg gap-2'>
                    <div className=' relative'>
                        <MdOutlineAttachFile className='text-slate-100 text-3xl cursor-pointer' 
                        onClick={()=>{setOpenFileSection(prev=>!prev)}}/>
                        {
                            openFileSection && (
                            <div className='bg-black absolute w-36 bottom-12 grid grid-cols-2 h-fit rounded-lg p-4'>
                                <label htmlFor='imageFile'>
                                    <div className='px-4 py-3 hover:bg-slate-700 rounded-md cursor-pointer' title='Upload Image'>
                                    <FaImage className='text-center text-2xl text-white ' />
                                    </div>
                                    <input type="file" id="imageFile" accept="image/*" hidden
                                    onChange={handleImageUpload}/>
                                </label>
                                <label htmlFor='videoFile'>
                                    <div className='px-4 py-3 hover:bg-slate-700 rounded-md cursor-pointer' title='Upload Video'>
                                    <FaVideo className='text-2xl text-white' />
                                    </div>
                                    <input type="file" id="videoFile" accept="video/*" hidden
                                    onChange={handleVideoUpload}/>
                                </label>
                                <label htmlFor='pdfFile'>
                                    <div className='px-4 py-3 hover:bg-slate-700 rounded-md cursor-pointer' title='Upload PDF'>
                                    <FaFilePdf className='text-2xl text-white' />
                                    </div>
                                    <input type="file" id="pdfFile" accept=".pdf" hidden/>
                                </label>
                            </div>
                            )
                        }
                        
                    </div>
                    <div className='flex-1 h-full py-1 px-2  '>
                        <textarea className=' w-full resize-none text-mg px-2 py-1 overflow-hidden overflow-y-scroll scrollbar-none rounded-lg bg-inherit border-none focus:outline-none text-slate-200 font-semibold' 
                        type='text' 
                        rows="1"
                        name="message"
                        value={message.text}
                        onChange={handleMessage}
                        placeholder='Type a message...'/>
                    </div>
                    <div className=''>
                        <IoSend className=' text-slate-100 text-3xl cursor-pointer' onClick={handleMessageSend}/>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Message;