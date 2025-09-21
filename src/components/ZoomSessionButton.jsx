import React from 'react';
import { FaVideo } from 'react-icons/fa';

const ZoomSessionButton = ({ 
  onClick, 
  disabled = false, 
  children = 'بدء جلسة زووم' 
}) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={`
        flex items-center justify-center 
        px-4 py-2 
        bg-blue-600 text-white 
        rounded-lg 
        hover:bg-blue-700 
        transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <FaVideo className="ml-2" />
      {children}
    </button>
  );
};

export default ZoomSessionButton;