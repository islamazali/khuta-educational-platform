import React from 'react';
import { motion } from 'framer-motion';

// Gradient text variants
const textVariants = {
  hidden: {
    opacity: 0,
    y: -50 // Start slightly above the final position
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

// Predefined gradient styles
const gradientStyles = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600',
  success: 'bg-gradient-to-r from-green-600 to-teal-500',
  danger: 'bg-gradient-to-r from-red-600 to-pink-500',
  info: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  warning: 'bg-gradient-to-r from-yellow-600 to-orange-500'
};
const GradientText = ({
  children,
  variant = 'primary',
  size = 'xl',
  className = '',
  delay = 0,
  staggerChildren = false,
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

  // Prepare motion props
  const motionProps = staggerChildren ? {
    initial: 'hidden',
    animate: 'visible',
    variants: {
      hidden: {
        opacity: 0,
        y: -50
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
          delayChildren: delay,
          staggerChildren: 0.2
        }
      }
    }
  } : {
    initial: 'hidden',
    animate: 'visible',
    variants: textVariants,
    transition: {
      delay: delay
    }
  };
  return <motion.span {...motionProps} className={`
        ${gradientClass} 
        bg-clip-text text-transparent 
        font-bold 
        ${sizeVariants[size]}
        ${className}
      `} {...props}>
      {children}
    </motion.span>;
};
export default GradientText;
export { GradientText };