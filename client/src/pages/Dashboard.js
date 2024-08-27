import React,{useState,useEffect} from 'react'
import Message from '../components/Message';
import Contact from '../components/Contact';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Welcome from '../components/Welcome';
import { useSelector } from'react-redux';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setOnlineUser, setSocketConnection } from '../store/userSlice';


const Dashboard = () => {
  const user=useSelector(state=>state.user.user);
  const socketConnection=useSelector(state=>state.user.socketConnection);
  const location=useLocation();
  const [show,setShow]=useState(false)
  const {pathname} = location;
  const dispatch=useDispatch();
  const [allUser,setAllUser] = useState([])
  useEffect(() => {
    if(pathname!=='/dashboard'){
      setShow(true)
    }
    else{
      setShow(false)
    }
  },[pathname]);


  useEffect(() => {
    const socketConnection=io("http://localhost:8090",{
      auth:{
        token:localStorage.getItem('token')
      }
    })
    
    socketConnection.on('onlineUser',(data)=>{
      dispatch(setOnlineUser(data));
    });
    
    dispatch(setSocketConnection(socketConnection));
    return ()=>{
      socketConnection.disconnect();
    }
  },[])

  useEffect(()=>{
    if(socketConnection){
        socketConnection.emit('sidebar',user?._id)
        
        socketConnection.on('conversation',(data)=>{
            console.log('conversation',data)
            
            const conversationUserData = data.map((conversationUser,index)=>{
                if(conversationUser?.sender?._id === conversationUser?.receiver?._id){
                    return{
                        ...conversationUser,
                        userDetails : conversationUser?.sender
                    }
                }
                else if(conversationUser?.receiver?._id !== user?._id){
                    return{
                        ...conversationUser,
                        userDetails : conversationUser.receiver
                    }
                }else{
                    return{
                        ...conversationUser,
                        userDetails : conversationUser.sender
                    }
                }
            })

            setAllUser(conversationUserData)
        })
    }

  },[socketConnection,user]);

  return (
    <div className=' h-screen mx-auto'>
      <div className='w-screen h-screen flex gap-0 jusify-between items-center'>
        <div className={`bg-gray-500 ${show && 'hidden md:flex'}`}>
          <Sidebar/>
        </div>
        <div className={`${show ? 'hidden md:flex w-1/3 ' : 'md:w-1/3 w-full'}  h-full bg-gray-900 rounded-r-lg overflow-hidden overflow-y-scroll scrollbar-none`}>
          <Contact allUser={allUser}/>
        </div>
        <div className={`p-2 ${show ? 'md:flex md:w-2/3 w-full' : ' hidden md:flex md:w-2/3'}  h-full rounded-lg overflow-hidden overflow-y-scroll scrollbar-none`}>
        {
          pathname==="/dashboard" ? 
          (<Welcome className='flex'/>):
          (<Message />)
        }
        </div>
      </div>
    </div>
  )
}

export default Dashboard;