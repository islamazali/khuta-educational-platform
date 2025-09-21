import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
const Layout = () => {
  return <div className="flex flex-col min-h-screen bg-background text-white">
      {/* Navbar - Fixed at the top */}
      <Navbar />

      {/* Main Content Area - Grows to fill available space */}
      <main className="flex-grow pt-16">
        {/* Outlet will render the current route's component */}
        <Outlet />
      </main>

      {/* Footer - Always at the bottom */}
      <Footer />
    </div>;
};
export default Layout;
export { Layout };