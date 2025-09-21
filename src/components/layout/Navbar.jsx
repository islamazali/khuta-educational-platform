import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Logo Component
const Logo = () => <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl hover:text-primary transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.25 4.533a9.707 9.707 0 00-3.053 3.636l4.097 2.27 3.737-3.367c-1.399-1.766-3.475-3.031-5.781-2.539zM12 2a8.477 8.477 0 00-7.843 5.154l3.107 1.719a6.225 6.225 0 013.599-2.821L12 2zm-7.032 7.655L2.257 9.47A8.456 8.456 0 002 12c0 4.664 3.781 8.455 8.445 8.455 1.654 0 3.203-.475 4.536-1.305l-2.857-1.583a6.219 6.219 0 01-1.68.237c-3.386 0-6.131-2.745-6.131-6.131 0-.399.041-.788.122-1.169z" />
    </svg>
    <span>Learning Platform</span>
  </Link>;

// Navigation Links
const NavLinks = ({
  isMobile,
  closeMenu
}) => {
  const links = [{
    to: '/',
    label: 'Home'
  }, {
    to: '/about',
    label: 'About'
  }, {
    to: '/courses',
    label: 'Courses'
  }, {
    to: '/fellowship',
    label: 'Fellowship'
  }, {
    to: '/leadership',
    label: 'Leadership'
  }, {
    to: '/progress',
    label: 'Progress'
  }];
  const linkStyle = isMobile ? "block py-2 px-4 text-white hover:bg-primary/20 transition-colors" : "text-white hover:text-primary transition-colors px-3 py-2 rounded-md";
  return <>
      {links.map(link => <Link key={link.to} to={link.to} className={linkStyle} onClick={isMobile ? closeMenu : undefined}>
          {link.label}
        </Link>)}
    </>;
};

// Authentication Links
const AuthLinks = ({
  isMobile,
  closeMenu
}) => {
  const linkStyle = isMobile ? "block py-2 px-4 text-white hover:bg-primary/20 transition-colors" : "text-white hover:text-primary transition-colors";
  return <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-4'}`}>
      <Link to="/login" className={linkStyle} onClick={isMobile ? closeMenu : undefined}>
        Login
      </Link>
      <Link to="/signup" className={`${linkStyle} bg-primary px-4 py-2 rounded-md hover:bg-primary-dark transition-colors`} onClick={isMobile ? closeMenu : undefined}>
        Sign Up
      </Link>
    </div>;
};

// Main Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return <nav className="bg-background-light shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            <div className="flex space-x-4">
              <NavLinks isMobile={false} />
            </div>
            <AuthLinks isMobile={false} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Toggle mobile menu">
              {isMenuOpen ? <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg> : <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="md:hidden absolute left-0 right-0 top-16 bg-background-light shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLinks isMobile={true} closeMenu={closeMenu} />
              <div className="border-t border-gray-700 pt-4">
                <AuthLinks isMobile={true} closeMenu={closeMenu} />
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;
export { Navbar };