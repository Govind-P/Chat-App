import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Context from './context/index.js';
import { useEffect } from'react';
import { useDispatch } from'react-redux';
import { backendApi } from './common/api.js';
import { setUserDetails } from './store/userSlice.js';
import { ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const fetchUserData = async () => {
    const res = await fetch(backendApi.userData.url, {
      method: backendApi.userData.method,
      credentials: 'include'
    });
    const data = await res.json();
    if(data.success){
      dispatch(setUserDetails(data.data));
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
    <Context.Provider value={{
      fetchUserData
      }}>
      <ToastContainer />
      <Header/>
      <main className='min-h-[calc(100vh-110px)] bg-gray-600 shadow-xl'>
        <Outlet/>
      </main>
      <Footer/>
    </Context.Provider>
    </>
  );
}

export default App;
