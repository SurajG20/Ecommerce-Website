import React from 'react';
import Announcements from './Announcement';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className='h-screen flex flex-col'>
      <Announcements />
      <Navbar />
      <main className='grow '>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
