import React, { useRef, useState } from 'react';
const MagneticButton = ({
  children = 'اضغط هنا',
  onClick,
  className = ''
}) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const buttonRef = useRef(null);
  const handleMouseMove = e => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Limit the movement to create a subtle magnetic effect
    const moveX = x * 0.2;
    const moveY = y * 0.2;
    setPosition({
      x: moveX,
      y: moveY
    });
  };
  const handleMouseLeave = () => {
    setPosition({
      x: 0,
      y: 0
    });
  };
  return <button ref={buttonRef} onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'transform 0.1s ease-out'
  }} className={`
        px-6 py-3 
        bg-blue-600 
        text-white 
        rounded-lg 
        shadow-lg 
        hover:bg-blue-700 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        focus:ring-opacity-50 
        transition-all 
        duration-300 
        ease-in-out
        ${className}
      `}>
      {children}
    </button>;
};
export default MagneticButton;
export { MagneticButton };