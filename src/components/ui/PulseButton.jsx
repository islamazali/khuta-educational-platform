import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaCheck, FaDownload, FaSignInAlt, FaShoppingCart } from 'react-icons/fa';

// Pulse animation variants
const pulseVariants = {
  initial: {
    scale: 1,
    boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.4)' // Tailwind blue-500 with opacity
  },
  pulse: {
    scale: [1, 1.05, 1],
    boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 10px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Button color schemes
const colorSchemes = {
  primary: {
    bg: 'bg-blue-600 hover:bg-blue-700',
    text: 'text-white',
    pulse: 'rgba(59, 130, 246, 0.4)' // Blue
  },
  success: {
    bg: 'bg-green-600 hover:bg-green-700',
    text: 'text-white',
    pulse: 'rgba(34, 197, 94, 0.4)' // Green
  },
  danger: {
    bg: 'bg-red-600 hover:bg-red-700',
    text: 'text-white',
    pulse: 'rgba(239, 68, 68, 0.4)' // Red
  },
  secondary: {
    bg: 'bg-gray-600 hover:bg-gray-700',
    text: 'text-white',
    pulse: 'rgba(107, 114, 128, 0.4)' // Gray
  }
};

// Icon mapping
const iconMap = {
  spinner: FaSpinner,
  check: FaCheck,
  download: FaDownload,
  signIn: FaSignInAlt,
  cart: FaShoppingCart
};
const PulseButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  // Determine color scheme
  const scheme = colorSchemes[variant] || colorSchemes.primary;

  // Determine icon
  const Icon = icon ? iconMap[icon] : null;

  // Size variations
  const sizeVariants = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  return <motion.button variants={pulseVariants} initial="initial" animate="pulse" whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }} disabled={disabled || loading} type={type} onClick={onClick} className={`
        ${scheme.bg} ${scheme.text}
        ${sizeVariants[size]}
        rounded-lg font-bold
        flex items-center justify-center
        space-x-2 rtl:space-x-reverse
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
        ${className}
      `} {...props}>
      {loading ? <FaSpinner className="animate-spin ml-2" /> : Icon && <Icon className="ml-2" />}
      
      <span>{children}</span>
    </motion.button>;
};
export default PulseButton;
export { PulseButton };