import React from 'react';
import { motion } from 'framer-motion';

// Word animation variants
const wordVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// Gradient styles
const gradientStyles = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600',
  success: 'bg-gradient-to-r from-green-600 to-teal-500',
  danger: 'bg-gradient-to-r from-red-600 to-pink-500',
  info: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  warning: 'bg-gradient-to-r from-yellow-600 to-orange-500'
};
const StaggeredGradientText = ({
  children,
  variant = 'primary',
  size = 'xl',
  className = '',
  staggerDelay = 0.2,
  ...props
}) => {
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

  // Split the text into words
  const words = children.toString().split(' ');
  return <motion.div initial="hidden" animate="visible" variants={{
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: staggerDelay
      }
    }
  }} className={`flex flex-wrap justify-center items-center space-x-2 rtl:space-x-reverse ${className}`} {...props}>
      {words.map((word, index) => <motion.span key={index} variants={wordVariants} className={`
            ${gradientClass} 
            bg-clip-text text-transparent 
            font-bold 
            ${sizeVariants[size]}
            inline-block
          `}>
          {word}
        </motion.span>)}
    </motion.div>;
};
export default StaggeredGradientText;
export { StaggeredGradientText };