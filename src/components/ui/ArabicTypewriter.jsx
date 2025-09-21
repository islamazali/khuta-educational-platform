import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const ArabicTypewriter = ({
  text = 'مرحبا بالعالم',
  speed = 50,
  className = '',
  variant = 'primary',
  size = 'xl',
  delay = 0,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Gradient styles
  const gradientStyles = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600',
    success: 'bg-gradient-to-r from-green-600 to-teal-500',
    danger: 'bg-gradient-to-r from-red-600 to-pink-500',
    info: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    warning: 'bg-gradient-to-r from-yellow-600 to-orange-500'
  };

  // Size variations
  const sizeVariants = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  };

  // Determine gradient style
  const gradientClass = gradientStyles[variant] || gradientStyles.primary;
  useEffect(() => {
    // Reverse the text for RTL animation
    const reversedText = text.split('').reverse();

    // If text is already complete, reset
    if (displayedText === text) {
      return;
    }

    // Set up typewriter effect
    const timer = setTimeout(() => {
      if (displayedText.length < text.length) {
        // Add one character at a time (from the end)
        setDisplayedText(reversedText.slice(0, displayedText.length + 1).reverse().join(''));
      } else {
        setIsComplete(true);
      }
    }, speed);

    // Cleanup
    return () => clearTimeout(timer);
  }, [displayedText, text, speed]);
  return <motion.span initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    delay: delay,
    duration: 0.5
  }} className={`
        ${gradientClass} 
        bg-clip-text text-transparent 
        font-bold 
        ${sizeVariants[size]}
        inline-block
        ${className}
      `} {...props}>
      {displayedText}
      {!isComplete && <motion.span animate={{
      opacity: [0, 1, 0]
    }} transition={{
      duration: 0.8,
      repeat: Infinity
    }} className="inline-block ml-1 text-gray-500">
          |
        </motion.span>}
    </motion.span>;
};
export default ArabicTypewriter;
export { ArabicTypewriter };