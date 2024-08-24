import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className='text-black text-center'>
      <Header></Header>
      <main className='min-h-[calc(100vh-104px)] bg-gray-600 shadow-xl'>
        <Outlet/>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Home;