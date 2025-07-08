import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mt-[130px] lg:mt-[70px] py-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
