import React from "react";
import { Link } from 'react-router-dom';

// Footer component that provides site-wide navigation and information
function Footer() {
  return <footer className="bg-[#1a1a1a] py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/" className="text-zinc-400 hover:text-white">الرئيسية</Link>
          <Link to="/about" className="text-zinc-400 hover:text-white">عن الموقع</Link>
          <Link to="/contact" className="text-zinc-400 hover:text-white">اتصل بنا</Link>
        </div>
        <p className="text-zinc-400">&copy; 2023 Learning Platform. All rights reserved.</p>
      </div>
    </footer>;
}
export default Footer;
export { Footer };