import React, { useState } from "react";
import { Link } from 'react-router-dom';
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSubmenu = menuKey => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };
  return <header className="fixed top-0 left-0 w-full bg-[#1a1a1a] z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">منصة التعلم</div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-zinc-400 hover:text-white">الرئيسية</Link>
          <Link to="/courses" className="text-zinc-400 hover:text-white">الدورات</Link>
          <Link to="/about" className="text-zinc-400 hover:text-white">عنا</Link>
          <Link to="/contact" className="text-zinc-400 hover:text-white">اتصل</Link>
        </nav>
        <button onClick={toggleMenu} className="md:hidden text-white">
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>
      {isOpen && <div className="md:hidden bg-[#1a1a1a] py-2">
          <Link to="/" className="block px-4 py-2 text-zinc-400 hover:text-white">الرئيسية</Link>
          <Link to="/courses" className="block px-4 py-2 text-zinc-400 hover:text-white">الدورات</Link>
          <Link to="/about" className="block px-4 py-2 text-zinc-400 hover:text-white">عنا</Link>
          <Link to="/contact" className="block px-4 py-2 text-zinc-400 hover:text-white">اتصل</Link>
        </div>}
    </header>;
}
export default Header;
export { Header };