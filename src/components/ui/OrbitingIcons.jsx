import React from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaGraduationCap, FaLaptopCode, FaBrain, FaChalkboardTeacher } from 'react-icons/fa';

// Ensure react-icons is installed
// npm install react-icons

const OrbitingIcons = ({
  radius = 200,
  iconSize = 32,
  className = ''
}) => {
  // Arabic icons representing different educational aspects
  const icons = [{
    Icon: FaBook,
    color: 'text-blue-500',
    label: 'كتاب'
  }, {
    Icon: FaGraduationCap,
    color: 'text-green-500',
    label: 'تخرج'
  }, {
    Icon: FaLaptopCode,
    color: 'text-purple-500',
    label: 'برمجة'
  }, {
    Icon: FaBrain,
    color: 'text-red-500',
    label: 'تفكير'
  }, {
    Icon: FaChalkboardTeacher,
    color: 'text-yellow-500',
    label: 'تعليم'
  }];
  return <div className={`relative flex items-center justify-center ${className}`} style={{
    width: radius * 2,
    height: radius * 2
  }}>
      {/* Central Khuta Logo */}
      <div className="absolute z-10 flex items-center justify-center">
        <div className="text-3xl font-bold text-white">
          خطى
        </div>
      </div>

      {/* Orbiting Icons */}
      {icons.map((item, index) => {
      const {
        Icon,
        color,
        label
      } = item;
      const angle = index / icons.length * 2 * Math.PI;
      return <motion.div key={label} className={`absolute ${color}`} animate={{
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        rotate: 360
      }} transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop'
      }} style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: iconSize,
        height: iconSize
      }}>
            <Icon size={iconSize} />
          </motion.div>;
    })}
    </div>;
};
export default OrbitingIcons;
export { OrbitingIcons };